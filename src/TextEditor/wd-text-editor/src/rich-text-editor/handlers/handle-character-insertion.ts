import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { createNewAstNode, findClosestAncestorId, findHigherlevelIndex, findNodeByGuid, splitNode } from "../node-operations";
import { replaceText } from "../text-manipulation";

const createNodeWithTypeAndKey = (type: string, key: string) => {
    let newNode: AstNode = {} as AstNode;

    switch (type) {
        case 'Text':
            newNode = createNewAstNode('Text', 0, 0, key);
            break;
        case 'Strong':
            newNode = createNewAstNode('Strong', 0, 0, null);
            newNode.Children = key ? [createNodeWithTypeAndKey('Text', key)] : [];
            break;
        case 'Emphasis':
            newNode = createNewAstNode('Emphasis', 0, 0, null);
            newNode.Children = key ? [createNodeWithTypeAndKey('Text', key)] : [];
            break;
        case 'Strong + Emphasis':
            newNode = createNewAstNode('Strong', 0, 0, null);
            newNode.Children = [createNodeWithTypeAndKey('Emphasis', key)];
            break;
        // Add cases for other types as needed
        default:
            // Optionally handle unknown types or throw an error
            break;
    }

    return newNode;
};

const updateHigherLevelNodes = (higherLevelChildren: AstNode[], children: AstNode[], newNodes: AstNode[] | null, insertAt?: string) => {
    
    const childIndex = findHigherlevelIndex(children, higherLevelChildren);

    // If no valid index is found, you might want to handle this case differently
    if (childIndex === -1 || childIndex === null) {
        console.error("No valid insertion index found for higher level nodes.");
        return null;
    }

    const higherLevelChild = higherLevelChildren[childIndex];
    higherLevelChild.Children = [... children];

    if (newNodes === null)
        return higherLevelChildren;

    let insertionIndex = 0;
    if (insertAt === 'end')
    {
        insertionIndex = higherLevelChild.Children.length;
    }

    // Insert the newNodes into the higherLevelChild Children array at the found index
    higherLevelChild.Children.splice(insertionIndex, 0, ...newNodes);

    // Return the updated array
    return higherLevelChildren;
};

const splitAndUpdateHigherLevelNodes = (child: AstNode, startOffset: number, indexToSplit: number, indexToRemoveAndAdd: number, type: string, key: string, children: AstNode[], higherLevelChildren: AstNode[]) => {

    const [node1, node2] = splitNode(child, startOffset, indexToSplit);
    const newContainer = createNodeWithTypeAndKey(type, key);
    const childIndex = findHigherlevelIndex(children, higherLevelChildren);
    if (childIndex !== null) {
        children.splice(indexToRemoveAndAdd, 1, node1, newContainer, node2);
        const higherLevelChild = higherLevelChildren[childIndex];
        higherLevelChild.Children = [... children];
    }
    return higherLevelChildren;
}

// Handle character insertion
const handleCharacterInsertion = (historyManager: IHistoryManager, container: Node, children: AstNode[], higherLevelChildren: AstNode[], key: string, editorState: string, startOffset: number): AstUpdate | null => {
    if (container.nodeName !== '#text')
    {
        container = container.firstChild!;
    }
    if (container.nodeName !== '#text')
    {
        container = container.firstChild!;
    }
    if (container && container.nodeName === '#text')
    {
        const parent = container.parentElement;
        if (parent) {
            const rootChildId = findClosestAncestorId(parent, 'richTextEditor');
            const parentId = parent.id;
            let child = findNodeByGuid(children, parentId);
            if (child) {
                let grandChild = null;
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                if (child.Children.length) {
                    grandChild = child.Children[index];
                }
                if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && editorState === 'normal')
                {
                    if (startOffset === 0) {
                        // TODO
                    }
                    else if (startOffset < (container.textContent || '').length)
                    {
                        const nodes = splitAndUpdateHigherLevelNodes(child, startOffset, index, children.indexOf(child), 'Text', key, children, higherLevelChildren);
                        if (nodes !== null)
                            return { type: 'higherLevelSplit', nodes };
                    } else {
                        const newText = createNodeWithTypeAndKey('Text', key);
                        const nodes = updateHigherLevelNodes(higherLevelChildren, children, [newText], 'end');
                        if (nodes !== null)
                            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                    }
                } else if ((parent.nodeName === 'STRONG' && editorState === 'em') || (parent.nodeName === 'EM' && editorState === 'strong') )
                {
                    const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
                    const nodes = updateHigherLevelNodes(higherLevelChildren, children, [newContainer], 'end');
                    if (nodes !== null) 
                        return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
                } else if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && parent.parentElement?.nodeName !== 'STRONG' && Array.isArray(editorState)) {
                    const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
                    const nodes = updateHigherLevelNodes(higherLevelChildren, children, [newContainer], 'end');
                    if (nodes !== null) 
                        return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
                } else if (grandChild !== null) {
                    const oldText = '' + grandChild.TextContent;
                    replaceText(container, grandChild, startOffset, key);
                    historyManager.recordChildTextUpdate(oldText, startOffset, grandChild, rootChildId);
                    return { type: 'insert', rootChildId, nodes: children.map((c) => {
                        return Object.assign({}, c)
                    }) };
                }
            } else {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                child = children[index];
                if (child) {
                    if (parent.nodeName === 'P' && ((editorState === 'strong' || editorState === 'em') || Array.isArray(editorState)))
                    {
                        let higherLevelIndex = null;
                        let type = 'insertNew';
                        if (Array.isArray(editorState))
                        {
                            if (startOffset === 0)
                            {
                                // TODO
                            }
                            else if (startOffset < (container.textContent || '').length)
                            {
                                const [node1, node2] = splitNode(child, startOffset);
                                const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
                                children.splice(index, 1, node1, newContainer, node2);
                            } else {
                                const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
                                children.splice(children.length, 0, newContainer);
                            }
                        } else {
                            if (startOffset === 0)
                            {
                                const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
                                children.splice(index, 0, newContainer);
                            }
                            else if (startOffset < (container.textContent || '').length)
                            {
                                const [node1, node2] = splitNode(child, startOffset);
                                const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
                                children.splice(index, 1, node1, newContainer, node2);
                            } else
                            {
                                const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
                                children.splice(index + 1, 0, newContainer);
                            }
                        }
                        if (higherLevelIndex !== null) {
                            const higherLevelChild = higherLevelChildren[higherLevelIndex];
                            higherLevelChild.Children = [...children];
                        }
                        return { type, rootChildId, nodes: children.map((c) => {
                            return Object.assign({}, c)
                        }) };
                    } else {
                        const oldText = '' + child.TextContent;
                        replaceText(container, child, startOffset, key);
                        historyManager.recordChildTextUpdate(oldText, startOffset, child, rootChildId);
                        return { type: 'insert', rootChildId, nodes: children.map((c, ind) => {
                            return ind === index ? Object.assign({}, c) : c
                        }) };
                    }
                }
            }
        }
    }

    return null;
};

export default handleCharacterInsertion;