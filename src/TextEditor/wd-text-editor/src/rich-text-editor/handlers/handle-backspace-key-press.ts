import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { processArray, reverse } from "../array-processing";
import { removeText } from "../text-manipulation";

// Handle Backspace key press
const handleBackspaceKeyPress = (historyManager: IHistoryManager, container: Node, endContainer: Node, children: AstNode[], range: Range, startOffset: number, endOffset: number): AstUpdate | null => {
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
                removeText(container, child, startOffset, endOffset);
                return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                    return ind === childIndex ? Object.assign({}, c) : c
                }) };
            } else {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                child = children[index];
                if (child) {
                    removeText(container, child, startOffset, endOffset);
                    return { type: endOffset > startOffset ? 'removeSelected' : 'remove', nodes: children.map((c, ind) => {
                        return ind === index ? Object.assign({}, c) : c
                    }) };
                }
            }
        }
    }

    return null;
};

export default handleBackspaceKeyPress;