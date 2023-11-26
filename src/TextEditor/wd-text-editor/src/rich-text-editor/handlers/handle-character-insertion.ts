import { AstNode, AstUpdate, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNode, createNodeWithTypeAndKey, findHigherlevelIndex, findNodeByGuid, nestedSplitNode, splitAndUpdateHigherLevelNodes, splitNode, updateHigherLevelNodes } from "../node-operations";
import { replaceText } from "../text-manipulation";

// Handle character insertion
const handleCharacterInsertion = (historyManager: IHistoryManager, container: Node, children: AstNode[], higherLevelChildren: AstNode[], updateData: UpdateData, key: string, editorState: string, startOffset: number): AstUpdate | null => {
    if (container && container.nodeName === '#text')
    {
        let {parent, child, astParent, higherLevelIndex, immediateChild, rootChildId, containerIndex} = updateData;
        if (parent) {
            const grandParent = parent.parentElement;
            if (child) {
                let grandChild = null;
                if (child.Children.length) {
                    grandChild = child.Children[containerIndex];
                }
                if (astParent && parent.parentElement?.nodeName === 'STRONG' && parent.nodeName === 'EM' && editorState === 'normal')
                {
                    if (startOffset === 0) {
                        // TODO
                    }
                    else if (startOffset < (container.textContent || '').length)
                    {
                        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, astParent, startOffset, containerIndex, children.indexOf(astParent), 'Text', key, children, higherLevelChildren, true);
                        if (nodes !== null)
                            return { type: 'higherLevelSplit', nodes };
                    } else {
                        const newText = createNodeWithTypeAndKey('Text', key);
                        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, [newText], 'end');
                        if (nodes !== null)
                            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                    }
                }
                else if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && editorState === 'normal')
                {
                    if (startOffset === 0) {
                        // TODO
                    }
                    else if (startOffset < (container.textContent || '').length)
                    {
                        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, child, startOffset, containerIndex, children.indexOf(child), 'Text', key, children, higherLevelChildren, false);
                        if (nodes !== null)
                            return { type: 'higherLevelSplit', nodes };
                    } else {
                        const newText = createNodeWithTypeAndKey('Text', key);
                        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, [newText], 'end');
                        if (nodes !== null)
                            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                    }
                } else if ((parent.nodeName === 'STRONG' && editorState === 'em') || (parent.nodeName === 'EM' && editorState === 'strong') )
                {
                    if (astParent && parent.parentElement?.nodeName === 'STRONG')
                    {
                        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, astParent, startOffset, containerIndex, children.indexOf(astParent), 'Strong', key, children, higherLevelChildren, true);
                        if (nodes !== null)
                            return { type: 'higherLevelSplit', nodes };
                    } else {
                        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
                        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, [newContainer], 'end');
                        if (nodes !== null) 
                            return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
                    }
                } else if ((parent.nodeName === 'STRONG' || parent.nodeName === 'EM') && parent.parentElement?.nodeName !== 'STRONG' && Array.isArray(editorState)) {
                    const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
                    const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, [newContainer], 'end');
                    if (nodes !== null) 
                        return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
                } else if (grandParent && (grandParent.nodeName === 'CODE' || grandParent.nodeName === 'DIV')) {
                    
                    const oldText = '' + child.TextContent;
                    let additionalOffset = 0;
                    if (child.TextContent === '\n')
                    {
                        child.TextContent = '';
                        additionalOffset = 1;
                    }
                    replaceText(container, child, startOffset, key);
                    historyManager.recordChildTextUpdate(oldText, startOffset + additionalOffset, child, null, rootChildId);
                    let higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === children[0].Guid);
                    if (higherLevelIndex === -1) {
                        higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren) || 0;
                        const childIndex = children.findIndex(c => c === child);
                        higherLevelChildren[higherLevelIndex].Children[childIndex] = child;
                    } else {
                        higherLevelChildren[higherLevelIndex] = child;
                    }
                    return { type: 'higherLevelInsert', rootChildId, nodes: higherLevelChildren };
                
                } else if (grandParent && grandChild && astParent && grandParent.nodeName === 'LI') {
                    
                    const oldText = '' + grandChild.TextContent;
                    let additionalOffset = 0;
                    if (grandChild.TextContent === '\n')
                    {
                        grandChild.TextContent = '';
                        additionalOffset = 1;
                    }
                    replaceText(container, grandChild, startOffset, key);
                    historyManager.recordChildTextUpdate(oldText, startOffset + additionalOffset, child, grandChild, rootChildId);
                    return { type: 'insert', rootChildId, nodes: astParent?.Children };
                
                } else if (grandChild !== null) {
                    const oldText = '' + grandChild.TextContent;
                    let additionalOffset = 0;
                    if (grandChild.TextContent === '\n')
                    {
                        grandChild.TextContent = '';
                        additionalOffset = 1;
                    }
                    replaceText(container, grandChild, startOffset, key);
                    historyManager.recordChildTextUpdate(oldText, startOffset + additionalOffset, child, grandChild, rootChildId);
                    return { type: 'insert', rootChildId, nodes: children.map((c) => {
                        return Object.assign({}, c)
                    }) };
                } else if (astParent !== null && child !== null) {
                    const oldText = '' + child.TextContent;
                    replaceText(container, child, startOffset, key);
                    historyManager.recordChildTextUpdate(oldText, startOffset, astParent, child, rootChildId);
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
                    } else if (astParent) {
                        const oldText = '' + child.TextContent;
                        if (child.TextContent === '\n')
                        {
                            child.TextContent = '';
                        }
                        replaceText(container, child, startOffset, key);
                        historyManager.recordChildTextUpdate(oldText, startOffset, astParent, child, rootChildId);
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