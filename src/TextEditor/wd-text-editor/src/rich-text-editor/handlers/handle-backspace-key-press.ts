import { AstNode, AstUpdate, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { processArray, reverse } from "../array-processing";
import { createNewAstNode, findClosestAncestor, findHigherlevelIndex, findNodeByGuid } from "../node-operations";
import { removeText } from "../text-manipulation";
import { trimSpecial } from "../undo-redo-ot";

// Handle Backspace key press
const handleBackspaceKeyPress = (historyManager: IHistoryManager, container: Node, endContainer: Node, children: AstNode[], higherLevelChildren: AstNode[], updateData: UpdateData, range: Range, startOffset: number, endOffset: number): AstUpdate | null => {
    const commonAncestor = range.commonAncestorContainer;
    if (commonAncestor.nodeName !== '#text') {
        const ancestorChildNodes = processArray(Array.from(commonAncestor.childNodes) as (Node | Text)[], (i) => i === container, (j) => j === endContainer);
        if (ancestorChildNodes.length > 0) {
            const reversed = reverse(ancestorChildNodes);
            for (const node of reversed)
            {
                const parent = node.parentElement;
                if (parent) {
                    const index = Array.from(parent.childNodes).findIndex((c) => c === node);
                    const child = children[index];
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
                        removeText(node, child, start, end);
                    }
                }
            }
            return { 
                type: 'removeSelected', 
                nodes: children.map((c) => Object.assign({}, c)) 
            };
        }
    } else {
        let {parent, child, astParent, higherLevelIndex, immediateChild, rootChildId, containerIndex} = updateData;
        if (parent) {
            // const rootChild = findClosestAncestor(parent, 'richTextEditor');
            const parentId = parent.id;
            const childIndex = children.findIndex((c) => c.Guid === parentId);
            if (childIndex === -1) {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                if (child && child.Guid === trimSpecial(parent.id, { startString: 'para_' }))
                {
                    const text = child.Children[index];
                    const oldText = '' + text.TextContent;
                    if (text.TextContent === '\n')
                    {
                        text.TextContent = '';
                    }
                    removeText(container, text, startOffset, endOffset);
                    historyManager.recordChildTextUpdate(oldText, startOffset, child, text, rootChildId);
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
                    historyManager.recordChildTextUpdate(oldText, startOffset, astParent, text, rootChildId);
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
                removeText(container, text, startOffset, endOffset);
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
                    historyManager.recordChildTextUpdate(oldText, startOffset, bchild, null, rootChildId);
                    return { type: endOffset > startOffset ? 'higherLevelRemoveSelected' : 'higherLevelRemove', nodes: higherLevelChildren };
                } else if (node && child) {
                    const text = node.Children[index];
                    const oldText = '' + text.TextContent;
                    if (text.TextContent === '\n')
                    {
                        text.TextContent = '';
                    }
                    removeText(container, text, startOffset, endOffset);
                    historyManager.recordChildTextUpdate(oldText, startOffset, child, text, rootChildId);
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