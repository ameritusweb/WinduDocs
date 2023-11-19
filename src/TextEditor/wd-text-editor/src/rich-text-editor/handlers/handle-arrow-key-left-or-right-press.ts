import { EditorDataType } from "../../hooks/editor-data";
import { ITextBlock } from "../../components/wysiwyg/interface";

const handleArrowKeyLeftOrRightPress = (event: React.KeyboardEvent<HTMLElement>, editorData: EditorDataType, processedAst: ITextBlock[][], processedAstMap: Map<string, number[]>, direction: 'left' | 'right') => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
        return;
    }

    let range = selection.getRangeAt(0);
    let isAtBoundary = direction === 'left' ? range.startOffset === 0 : range.startContainer.textContent && range.startOffset === range.startContainer.textContent.length;

    if (isAtBoundary) {
        let currentNode: Node | null = range.startContainer;
        let textNodeIndex: number = 0;

        if (currentNode.nodeType === Node.TEXT_NODE) {
            textNodeIndex = Array.from(currentNode.parentElement?.childNodes || []).findIndex((e) => e === currentNode);
            if (textNodeIndex > 0) {
                return;
            }
            currentNode = currentNode.parentElement;
        }

        if (!currentNode) return;

        let guid = (currentNode as Element).id;
        const gparent = currentNode.parentElement;
        if (gparent && (gparent.nodeName === 'CODE' || gparent.nodeName.match(/^H[1-6]$/))) {
            guid = gparent.id;
        }

        if (editorData.cursorLine < 0 || editorData.cursorLine >= processedAst.length) {
            throw new Error('Invalid start row number');
        }

        const textBlocks = processedAst;
        const res = processedAstMap.get(`${guid} ${textNodeIndex}`);
        if (!res) return;

        const [i, j] = res;
        if (j !== 0) return;

        const row = textBlocks[direction === 'left' ? i - 1 : i + 1];
        if (!row) return;

        const textBlock = direction === 'left' ? row[row.length - 1] : row[0];
        const element = document.getElementById(textBlock.guid);
        if (!element) return;

        const newRange = document.createRange();
        let start = element.nodeName.match(/^(CODE|H[1-6])$/) ? element.childNodes[0].childNodes[textBlock.index] : element.childNodes[textBlock.index];

        if (!start || !(start instanceof Text)) return;

        event.preventDefault();
        newRange.setStart(start, direction === 'left' ? (start.textContent?.length || 0) : 0);
        newRange.setEnd(start, direction === 'left' ? (start.textContent?.length || 0) : 0);

        selection.removeAllRanges();
        selection.addRange(newRange);
    }
};

export default handleArrowKeyLeftOrRightPress;