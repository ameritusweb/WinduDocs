import { AstNode, AstUpdate, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { moveArray } from "../array-processing";
import { createNewAstNode, createNewAstNodeFromFormat, deepCopyAstNode, findHigherlevelIndex, 
    findNodeByGuid, generateKey, replaceKeys, splitNode, splitTree } from "../node-operations";
import { trimSpecial } from "../undo-redo-ot";

const handleEnterKeyPress = (historyManager: IHistoryManager, container: Node, children: AstNode[], higherLevelChildren: AstNode[], updateData: UpdateData, range: Range, startOffset: number, higherLevelId?: string): AstUpdate | null => {
    const commonAncestor = range.commonAncestorContainer;
    if (commonAncestor.nodeName !== '#text') {

    } 
    else
    {
        let {parent, child, astParent, higherLevelIndex, immediateChild, rootChildId, containerIndex} = updateData;
        if (parent) {
            const parentId = parent.id;
            if (startOffset === 0)
            {
                if (parent.nodeName === 'SPAN' || parent.nodeName === 'P' || parent.nodeName === 'EM' || parent.nodeName === 'STRONG') {
                    const gparent = parent.parentElement;
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        const child = children[childIndex];
                        if (child) {
                            let higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (higherLevelIndex !== null) {
                                if (child.TextContent === '\n')
                                {
                                    const newLine = createNewAstNode('Text', 0, 0, '\n');
                                    children.splice(childIndex + 1, 0, newLine);
                                    higherLevelChildren[higherLevelIndex].Children = children;
                                    historyManager.recordChildAdd(null, children[childIndex], startOffset, newLine, higherLevelChildren[higherLevelIndex], childIndex + 1, 0);
                                }
                                else if (childIndex > 0)
                                {
                                    const newPara = createNewAstNode('ParagraphBlock', 0, 0, null);
                                    moveArray(children, childIndex, newPara.Children, 0);
                                    higherLevelChildren[higherLevelIndex].Children = children;
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank, newPara);
                                } else {
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex, 0, newBlank);
                                }
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            } else if (container.textContent === '\n') {
                                higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === children[0].Guid);
                                if (higherLevelIndex) {
                                    const newLine = createNewAstNode('Text', 0, 0, '\n');
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newLine);
                                    historyManager.recordChildAdd(null, { ...higherLevelChildren[higherLevelIndex], NodeName: 'ParagraphBlock' }, startOffset, newLine, { ...newLine, NodeName: 'ParagraphBlock' }, 0, 0);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                }
                            }
                        }
                    }
                }
            } 
            else if (startOffset === container.textContent?.length)
            {
                const gparent = parent.parentElement;
                if (gparent && gparent.nodeName === 'BLOCKQUOTE')
                {
                    const childNodes = Array.from(parent.childNodes);
                    const childIndex = childNodes.findIndex((c) => c === container);
                    const child = children[childIndex];
                    const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
                    if (child && higherLevelIndex !== -1) {
                        const newNode = createNewAstNodeFromFormat('p', '\n');
                        higherLevelChildren.splice(higherLevelIndex + 1, 0, newNode);
                        historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, newNode, newNode, 0, 0);
                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                    }
                }
                else if (gparent && (gparent.nodeName === 'CODE' || gparent.nodeName === 'DIV'))
                {
                    const childNodes = Array.from(parent.childNodes);
                    const childIndex = childNodes.findIndex((c) => c === container);
                    const child = children[childIndex];
                    const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
                    if (child && higherLevelIndex !== -1) {
                        const newNode = createNewAstNode('Text', 0, 0, '\n');
                        higherLevelChildren.splice(higherLevelIndex + 1, 0, newNode);
                        historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, newNode, { ...newNode, NodeName: 'ParagraphBlock' }, 0, 0);
                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                    }
                }
                else if (gparent && gparent?.nodeName === 'LI') {
                    const ggparent = gparent.parentElement;
                    if (ggparent)
                    {
                        if (ggparent.nodeName === 'UL') {
                            const childNodes = Array.from(parent.childNodes);
                            const childIndex = childNodes.findIndex((c) => c === container);
                            const child = children[childIndex];
                            if (child && higherLevelId) {
                                const [node] = findNodeByGuid(higherLevelChildren, higherLevelId, null);
                                const newNode = replaceKeys(node!);
                                newNode.Guid = generateKey();
                                newNode.Children = [ createNewAstNodeFromFormat('p', '\n') ];
                                const index = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                higherLevelChildren.splice(index + 1, 0, newNode);
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                        } else if (ggparent.nodeName === 'OL') {
                            const childNodes = Array.from(parent.childNodes);
                            const childIndex = childNodes.findIndex((c) => c === container);
                            const child = children[childIndex];
                            if (child && higherLevelId) {
                                const [node] = findNodeByGuid(higherLevelChildren, higherLevelId, null);
                                const newNode = replaceKeys(node!);
                                const index = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                higherLevelChildren.splice(index + 1, 0, newNode);
                                return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                            }
                        }
                    }
                }
                else if (parent.nodeName === 'SPAN' || parent.nodeName === 'P' || parent.nodeName === 'EM' || parent.nodeName === 'STRONG') {
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        if (child) {
                            const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (rootChildId && higherLevelIndex !== null) {
                                const astChild = child.Children[childIndex];
                                if (childIndex === child.Children.length - 1 && startOffset === astChild.TextContent?.length)
                                {
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                    historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, newBlank, newBlank, 0, 0);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                } else {
                                    const nextSibling = child.Children[childIndex + 1];
                                    if (nextSibling && nextSibling.TextContent === '\n')
                                    {
                                        const newLine = createNewAstNode('Text', 0, 0, '\n');
                                        child.Children.splice(childIndex + 1, 0, newLine);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    } else {
                                        const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                        higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                        historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, newBlank, higherLevelChildren[higherLevelIndex + 1], 0, 0, true);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    }
                                }
                            }
                            else if (higherLevelId) {
                                const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === higherLevelId);
                                if (higherLevelIndex) {
                                    const newBlank = createNewAstNode('BlankLine', 0, 0, null);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                if (parent.nodeName === 'SPAN' || parent.nodeName === 'P' || parent.nodeName === 'EM' || parent.nodeName === 'STRONG') {
                    const gparent = parent.parentElement;
                    if (gparent) {
                        const childNodes = Array.from(parent.childNodes);
                        const childIndex = childNodes.findIndex((c) => c === container);
                        const [lowerLevelParent] = findNodeByGuid(higherLevelChildren, parent.id, null);
                        let child = lowerLevelParent?.Children[childIndex];
                        if (!child)
                        {
                            child = lowerLevelParent as AstNode;
                        }
                        if (child) {
                            let higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                            if (higherLevelIndex === null)
                            {
                                higherLevelIndex = higherLevelChildren.findIndex(c => c.Guid === children[0].Guid);
                            }
                            else
                            {
                                higherLevelChildren[higherLevelIndex].Children = children;
                            }
                            if (higherLevelIndex !== null && higherLevelIndex !== -1) { 
                                if (gparent.nodeName === 'BLOCKQUOTE')
                                {
                                    const higherLevelChild = higherLevelChildren[higherLevelIndex];
                                    if (lowerLevelParent) {
                                        const lowerLevelChild = lowerLevelParent.Children[childIndex];
                                        const [node1, node2] = splitTree(higherLevelChild, lowerLevelChild, startOffset);
                                        const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
                                        higherLevelChildren.splice(higherLevelIndex, 1, node1);
                                        historyManager.recordChildReplace(null, oldNode, node1, node1, 0, startOffset);
                                        higherLevelChildren.splice(higherLevelIndex + 1, 0, node2);
                                        historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, node2, node2, 0, 0, true);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    }
                                }
                                else if (gparent.nodeName === 'CODE')
                                {
                                    const [node1, node2] = splitNode(child, startOffset);
                                    const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
                                    higherLevelChildren.splice(higherLevelIndex, 1, node1);
                                    historyManager.recordChildReplace(null, oldNode, node1, { ...node1, NodeName: 'ParagraphBlock' }, 0, startOffset);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, node2);
                                    historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, node2, { ...node2, NodeName: 'ParagraphBlock' }, 0, 0, true);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                }
                                else if (parent.nodeName === 'P')
                                {
                                    const [node1, node2] = splitNode(child, startOffset);
                                    const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
                                    const oldLowerLevelParent = deepCopyAstNode(lowerLevelParent!);
                                    children.splice(childIndex, 1, node1, node2);
                                    const newPara = createNewAstNode('ParagraphBlock', 0, 0, null);
                                    moveArray(children, childIndex + 1, newPara.Children, 0);
                                    higherLevelChildren[higherLevelIndex].Guid = generateKey();
                                    const newNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
                                    historyManager.recordChildReplace(null, oldNode, newNode, oldLowerLevelParent!, childIndex, startOffset);
                                    higherLevelChildren.splice(higherLevelIndex + 1, 0, newPara);
                                    historyManager.recordChildAdd(null, newNode, startOffset, higherLevelChildren[higherLevelIndex + 1], higherLevelChildren[higherLevelIndex + 1], 0, 0, true);
                                    return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                } else {
                                    const higherLevelChild = higherLevelChildren[higherLevelIndex];
                                    const [lowerLevelParent] = findNodeByGuid(children, parent.id, null);
                                    if (lowerLevelParent) {
                                        const lowerLevelChild = lowerLevelParent.Children[childIndex];
                                        const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
                                        const guid = generateKey();
                                        const split = splitTree(higherLevelChild, lowerLevelChild, startOffset, guid);
                                        higherLevelChildren.splice(higherLevelIndex, 1, split[0]);
                                        historyManager.recordChildReplace(null, oldNode, split[0], lowerLevelParent, 0, startOffset);
                                        higherLevelChildren.splice(higherLevelIndex + 1, 0, split[1]);
                                        const [newChild, newParent] = findNodeByGuid(higherLevelChildren, guid, null);
                                        const newChildIndex = newParent?.Children.findIndex(c => c.Guid === newChild?.Guid);
                                        if (newParent && newChildIndex !== undefined && newChildIndex !== null)
                                            historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, higherLevelChildren[higherLevelIndex + 1], newParent, newChildIndex, 0, true);
                                        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    return null;
};

export default handleEnterKeyPress;