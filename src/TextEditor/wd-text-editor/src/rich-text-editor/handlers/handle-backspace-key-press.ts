import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { processArray, reverse } from "../array-processing";
import { createNewAstNode, findHigherlevelIndex } from "../node-operations";
import { removeText } from "../text-manipulation";

// Handle Backspace key press
const handleBackspaceKeyPress = (historyManager: IHistoryManager, container: Node, endContainer: Node, children: AstNode[], higherLevelChildren: AstNode[], range: Range, startOffset: number, endOffset: number): AstUpdate | null => {
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
        const parent = container.parentElement;
        if (parent) {
            const parentId = parent.id;
            const childIndex = children.findIndex((c) => c.Guid === parentId);
            let child = children[childIndex];
            if (child) {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                const text = child.Children[index];
                removeText(container, text, startOffset, endOffset);
                if (text.TextContent === '') {
                    const newLine = createNewAstNode('BlankLine', 0, 0, null);
                    child = Object.assign({}, newLine);
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
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                child = children[index];
                if (child) {
                    removeText(container, child, startOffset, endOffset);
                    return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                        return ind === index ? Object.assign({}, child) : c
                    }) };
                }
            }
        }
    }

    return null;
};

export default handleBackspaceKeyPress;