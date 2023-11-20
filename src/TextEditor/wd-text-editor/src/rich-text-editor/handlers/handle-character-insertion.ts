import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { createNewAstNode, findClosestAncestorId, findHigherlevelIndex, findNodeByGuid } from "../node-operations";
import { replaceText } from "../text-manipulation";

// Handle character insertion
const handleCharacterInsertion = (historyManager: IHistoryManager, container: Node, children: AstNode[], higherLevelChildren: AstNode[], key: string, editorState: string, startOffset: number): AstUpdate | null => {
    if (container.nodeName === '#text')
    {
        const parent = container.parentElement;
        if (parent) {
            const rootChildId = findClosestAncestorId(parent, 'richTextEditor');
            const parentId = parent.id;
            let child = findNodeByGuid(children, parentId);
            if (child) {
                if (child.Children.length) {
                    const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                    child = child.Children[index];
                }
                if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && editorState === 'normal')
                {
                    const newText = createNewAstNode('Text', 0, 0, key);
                    const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                    if (higherLevelIndex !== null) {
                        const higherLevelChild = higherLevelChildren[higherLevelIndex];
                        higherLevelChild.Children = children.map((c) => Object.assign({}, c));
                        higherLevelChild.Children.splice(higherLevelChild.Children.length, 0, newText);
                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                    }
                } else if ((parent.nodeName === 'STRONG' && editorState === 'em') || (parent.nodeName === 'EM' && editorState === 'strong') )
                {
                    const newContainer = createNewAstNode(editorState === 'strong' ? 'Strong' : 'Emphasis', 0, 0, null);
                        const newText = createNewAstNode('Text', 0, 0, key);
                        newContainer.Children.push(newText);
                        const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                        if (higherLevelIndex !== null) {
                            const higherLevelChild = higherLevelChildren[higherLevelIndex];
                            higherLevelChild.Children = children.map((c) => Object.assign({}, c));
                            higherLevelChild.Children.splice(higherLevelChild.Children.length, 0, newContainer);
                            return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
                        }
                } else {
                    const oldText = '' + child.TextContent;
                    replaceText(container, child, startOffset, key);
                    historyManager.recordChildTextUpdate(oldText, startOffset, child, rootChildId);
                    return { type: 'insert', rootChildId, nodes: children.map((c) => {
                        return Object.assign({}, c)
                    }) };
                }
            } else {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                child = children[index];
                if (child) {
                    if (parent.nodeName === 'P' && (editorState === 'strong' || editorState === 'em'))
                    {
                        const newContainer = createNewAstNode(editorState === 'strong' ? 'Strong' : 'Emphasis', 0, 0, null);
                        const newText = createNewAstNode('Text', 0, 0, key);
                        newContainer.Children.push(newText);
                        const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                        children.splice(children.length, 0, newContainer);
                        if (higherLevelIndex !== null) {
                            const higherLevelChild = higherLevelChildren[higherLevelIndex];
                            higherLevelChild.Children = children.map((c) => Object.assign({}, c));
                        }
                        return { type: 'insertNew', rootChildId, nodes: children.map((c) => {
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