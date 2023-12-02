import { EditorDataType } from "../../hooks/editor-data";
import { ITextBlock } from "../../components/wysiwyg/interface";

const handleArrowKeyLeftOrRightPress = (event: React.KeyboardEvent<HTMLElement>, editorData: EditorDataType, processedAst: ITextBlock[][], processedAstMap: Map<string, number[]>, direction: 'left' | 'right') => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) {
        return;
    }

    const range = selection.getRangeAt(0);
    const isAtBoundary = (range.startContainer.textContent && 
                          range.startContainer.textContent === '\n' && 
                          (range.startOffset === 0 || range.startOffset === 1 )) 
                        || 
                        (direction === 'left' 
                            ? range.startOffset === 0 
                            : range.startContainer.textContent && 
                            range.startOffset === range.startContainer.textContent.length);

    if (isAtBoundary) {
        let currentNode: Node | null = range.startContainer;
        let textNodeIndex: number = 0;

        if (currentNode.nodeType === Node.TEXT_NODE) {
            textNodeIndex = Array.from(currentNode.parentElement?.childNodes || []).findIndex((e) => e === currentNode);
            currentNode = currentNode.parentElement;
        }

        if (!currentNode) return;

        let guid = (currentNode as Element).id;
        const gparent = currentNode.parentElement;
        if (gparent && (gparent.nodeName === 'CODE' || gparent.nodeName.match(/^H[1-6]$/))) {
            guid = gparent.id;
            if (gparent.nodeName === 'CODE') {
                textNodeIndex = Array.from(currentNode.parentElement?.childNodes || []).findIndex((e) => e === currentNode);
            }
        }

        const textBlocks = processedAst;
        const res = processedAstMap.get(`${guid} ${textNodeIndex}`);
        if (!res) 
            return;

        const [i, j] = res;

        const row = textBlocks[direction === 'left' ? i - 1 : i + 1];
        if (!row) 
            return;

        if (direction === 'left' && j > 0)
            return;

        if (direction === 'right' && j < textBlocks[i].length - 1)
            return;

        const textBlock = direction === 'left' ? row[row.length - 1] : row[0];
        const element = document.getElementById(textBlock.guid);
        if (!element) return;

        const newRange = document.createRange();
        let start = null;
        if (element.nodeName.match(/^(H[1-6])$/)) {
            start = element.childNodes[0];
            if (!(start instanceof Text)) {
                start = start.childNodes[textBlock.index];
            }
        } else {
            start = element.childNodes[textBlock.index];
        }

        if (element.nodeName.match(/^(CODE)$/)) {
            start = start.childNodes[0];
        }

        if (!start || !(start instanceof Text)) 
            return;

        event.preventDefault();
        newRange.setStart(start, direction === 'left' ? (start.textContent?.length || 0) : ((start.textContent === '\n') ? 1 : 0));
        newRange.setEnd(start, direction === 'left' ? (start.textContent?.length || 0) : ((start.textContent === '\n') ? 1 : 0));

        selection.removeAllRanges();
        selection.addRange(newRange);
    }
};

export default handleArrowKeyLeftOrRightPress;