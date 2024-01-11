import { AstNode, AstUpdate, IHistoryBuilder, IHistoryManagerRecorder, IdableNode, UpdateData } from "../../components/wysiwyg/interface";
import { processArray, reverse } from "../array-processing";
import { createNewAstNode, findHigherlevelIndex, findNodeByGuid, findTextNodeByNode, splitTreeAndRemove } from "../node-operations";
import { removeText } from "../text-manipulation";
import { trimSpecial } from "../undo-redo-ot";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";


const handleBackspaceKeyPress = (historyManager: IHistoryManagerRecorder, container: Node, endContainer: Node, children: AstNode[], updateData: UpdateData, commonAncestorContainer: IdableNode, startOffset: number, endOffset: number): AstUpdate | null => {
    const commonAncestor = commonAncestorContainer;
    const higherLevelChildren = updateData.higherLevelChildren;
    if (commonAncestor.nodeName !== '#text') {
        const historyBuilder: IHistoryBuilder = new HistoryBuilder();
        const ancestorChildNodes = processArray(Array.from(commonAncestor.childNodes) as (Node | Text)[], (i) => i === container, (j) => j === endContainer);
        if (ancestorChildNodes.length === 0) {
            const higherLevelChildren = updateData.higherLevelChildren;
            const id = commonAncestor.id;
            const ancestorNode = findNodeByGuid(higherLevelChildren, id, null);
            if (ancestorNode[0]) {
                const startNode = findTextNodeByNode([ancestorNode[0]], container, null);
                const endNode = findTextNodeByNode([ancestorNode[0]], endContainer, null);
                if (startNode[0] && endNode[0]) {
                    const splitNode = splitTreeAndRemove([ancestorNode[0]], startNode[0], startOffset, endNode[0], endOffset);
                    if (splitNode) {
                        const parentStart = findNodeByGuid([ancestorNode[0]], container.parentElement?.id || '', null);
                        const parentEnd = findNodeByGuid([ancestorNode[0]], endContainer.parentElement?.id || '', null);
                        if (parentStart[0] && parentEnd[0]) {
                            const startIndex = parentStart[0].Children.indexOf(startNode[0]);
                            const endIndex = parentEnd[0].Children.indexOf(endNode[0]);
                            historyBuilder.addInitialCursorPosition(parentEnd[0], endIndex, endOffset)
                                .addFinalCursorPosition(parentStart[0], startIndex, startOffset)
                                .addReplaceCommand(ancestorNode[0], splitNode[0])
                                .applyTo(historyManager);
                        }
                    }
                }
            }
        }
        else {
            const reversed = reverse(ancestorChildNodes);
            for (const node of reversed)
            {
                const parent = node.parentElement;
                if (parent) {
                    const index = Array.from(parent.childNodes).findIndex((c) => c === node);
                    const childNode = children[index];
                    const isStartNode = node === container;
                    const isEndNode = node === endContainer;
                    if (!isStartNode && !isEndNode)
                    {
                        children.splice(index, 1);
                    }
                    else
                    {
                        const start = isStartNode ? startOffset : 0;
                        const end = isEndNode ? endOffset : (node.textContent || '').length;
                        if (start === 0 && end === (node.textContent || '').length)
                        {
                            children.splice(index, 1); 
                        } 
                        else 
                        {
                            removeText(node, childNode, start, end);
                        }
                    }
                }
            }
            return { 
                type: 'removeSelected', 
                nodes: children.map((c) => Object.assign({}, c)) 
            };
        }
    } else {
        const isMultiText = startOffset !== endOffset;
        const {parent, child, astParent, rootChildId } = updateData;
        if (parent) {
            
            const parentId = parent.id;
            const childIndex = children.findIndex((c) => c.Guid === parentId);
            if (childIndex === -1) {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                if (child && child.NodeName !== 'Text' && child.Guid === trimSpecial(parent.id, { startString: 'para_' }))
                {
                    const text = child.Children[index];
                    const oldText = '' + text.TextContent;
                    if (text.TextContent === '\n')
                    {
                        text.TextContent = '';
                    }
                    removeText(container, text, startOffset, endOffset);
                    historyManager.recordChildTextUpdate(oldText, isMultiText ? startOffset + (endOffset - startOffset) : startOffset, child, text, rootChildId);
                    return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children };
                }
                const text = children[index];
                if (text && astParent)
                {
                    const oldText = '' + text.TextContent;
                    if (text.TextContent === '\n')
                    {
                        text.TextContent = '';
                    }
                    removeText(container, text, startOffset, endOffset);
                    historyManager.recordChildTextUpdate(oldText, isMultiText ? startOffset + (endOffset - startOffset) : startOffset, astParent, text, rootChildId);
                    if (text.TextContent === '') {
                        const newLine = createNewAstNode('BlankLine', 0, 0, null);
                        const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                        if (higherLevelIndex !== null) {
                            const higherLevelChild = higherLevelChildren[higherLevelIndex];
                            if (rootChildId && higherLevelChild.Guid === rootChildId) {
                                higherLevelChildren.splice(higherLevelIndex, 1, newLine);
                                return { type: 'higherLevelRemove', nodes: higherLevelChildren };
                            } else {
                                higherLevelChildren.splice(higherLevelIndex, 1, newLine);
                                return { type: 'higherLevelRemove', nodes: higherLevelChildren };
                            }
                        }
                    }
                    return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                        return ind === index ? Object.assign({}, text) : c
                    }) };
                }
            }
            let bchild = children[childIndex];
            if (bchild) {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                let text = bchild.Children[index];
                if (!text) {
                    text = bchild;
                }
                const oldText = '' + text.TextContent;
                if (text.TextContent === '\n')
                {
                    text.TextContent = '';
                }
                removeText(container, text, startOffset, endOffset);
                historyManager.recordChildTextUpdate(oldText, isMultiText ? startOffset + (endOffset - startOffset) : startOffset, bchild, text, rootChildId);
                if (text.TextContent === '') {
                    const newLine = createNewAstNode('BlankLine', 0, 0, null);
                    bchild = Object.assign({}, newLine);
                    const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                    if (higherLevelIndex !== null) {
                        higherLevelChildren.splice(higherLevelIndex, 1, newLine);
                        return { type: 'higherLevelRemove', nodes: higherLevelChildren };
                    }
                }
                return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                    return ind === childIndex ? Object.assign({}, child) : c
                }) };
            } else {
                const [node] = findNodeByGuid(higherLevelChildren, parent.id, null);
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                bchild = children[index];
                if (bchild && node === bchild) {
                    const oldText = '' + bchild.TextContent;
                    if (bchild.TextContent === '\n')
                    {
                        bchild.TextContent = '';
                    }
                    removeText(container, bchild, startOffset, endOffset);
                    historyManager.recordChildTextUpdate(oldText, isMultiText ? startOffset + (endOffset - startOffset) : startOffset, bchild, null, rootChildId);
                    return { type: endOffset > startOffset ? 'higherLevelRemoveSelected' : 'higherLevelRemove', nodes: higherLevelChildren };
                } else if (node && child) {
                    const text = node.Children[index];
                    const oldText = '' + text.TextContent;
                    if (text.TextContent === '\n')
                    {
                        text.TextContent = '';
                    }
                    removeText(container, text, startOffset, endOffset);
                    historyManager.recordChildTextUpdate(oldText, isMultiText ? startOffset + (endOffset - startOffset) : startOffset, child, text, rootChildId);
                    if (text.TextContent === '') {
                        const newLine = createNewAstNode('BlankLine', 0, 0, null);
                        bchild = Object.assign({}, newLine);
                        const higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren);
                        if (higherLevelIndex !== null) {
                            higherLevelChildren.splice(higherLevelIndex, 1, newLine);
                            return { type: 'higherLevelRemove', nodes: higherLevelChildren };
                        }
                    }
                    return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children };
                }
            }
        }
    }

    return null;
};

export default handleBackspaceKeyPress;