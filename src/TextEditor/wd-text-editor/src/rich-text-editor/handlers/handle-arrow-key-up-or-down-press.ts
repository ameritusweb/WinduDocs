import { ITextBlock } from "../../components/wysiwyg/interface";
import { EditorDataType } from "../../hooks/editor-data";
import { findTextBlockByGuid } from "../cursor-operations";

const handleArrowKeyUpOrDownPress = (key: string, editorData: EditorDataType, processedAst: ITextBlock[][], processedAstMap: Map<string, number[]>) => {

    const selection = window.getSelection();
    if (!selection)
    {
        return;
    }

    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let currentNode: Node | null = range.startContainer;
    let textNodeIndex: number = 0;

    if (currentNode.nodeType === Node.TEXT_NODE) {
        textNodeIndex = Array.from(currentNode.parentElement?.childNodes || []).findIndex((e) => e === currentNode);
        currentNode = currentNode.parentElement;
        if (currentNode && currentNode.parentElement?.nodeName === 'CODE')
        {
            textNodeIndex = Array.from(currentNode.parentElement?.childNodes || []).findIndex((e) => e === currentNode);
            currentNode = currentNode.parentElement;
        }
    }

    if (!currentNode) 
        return;

    let guid = (currentNode as Element).id;
    const gparent = currentNode.parentElement;
    if (gparent && (gparent.nodeName === 'CODE' || gparent.nodeName === 'A' || gparent.nodeName === 'H1' || gparent.nodeName === 'H2' || gparent.nodeName === 'H3' || gparent.nodeName === 'H4' || gparent.nodeName === 'H5' || gparent.nodeName === 'H6'))
    {
        guid = gparent.id;
    }
    const textBlock = findTextBlockByGuid(editorData, processedAst, processedAstMap, key, guid, textNodeIndex, range.startOffset);

    if (!textBlock)
        return;

    const element = document.getElementById(textBlock.guid);

    if (!element)
        return;

    const newRange = document.createRange();
    let start = null;
    if (element.nodeName.startsWith('H') || element.nodeName.startsWith('A')) {
         start = element.childNodes[0];
         if (!(start instanceof Text)) {
            start = start.childNodes[textBlock.index];
         }
     }
     else { 
        start = element.childNodes[textBlock.index];
     }

    if (!start)
        return;

    if (element && element.nodeName === 'CODE' && start.nodeName !== '#text')
    {
        start = start.childNodes[0];
    }

    if (!(start instanceof Text))
        return;

    newRange.setStart(start, textBlock.offset || 0);
    newRange.setEnd(start, textBlock.offset || 0);

    selection.removeAllRanges();
    selection.addRange(newRange);

}

export default handleArrowKeyUpOrDownPress;