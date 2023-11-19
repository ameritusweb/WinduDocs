import { ITextBlock } from "../../components/wysiwyg/interface";
import { EditorDataType } from "../../hooks/editor-data";

const getCursorOffset = (previousBlocks: ITextBlock[], offset: number) => {
    return previousBlocks.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.textContent.length;
    }, offset);
}

const findTextBlockWithOffset = (blocks: ITextBlock[], totalOffset: number): { block: ITextBlock, blockOffset: number, reduction: number } => {
    let cumulativeLength = 0;

    for (const block of blocks) {
      const textLength = block.textContent.length;
      if (cumulativeLength + textLength >= totalOffset) {
        const blockOffset = totalOffset - cumulativeLength;
        return { block, blockOffset, reduction: 0 };
      }
      cumulativeLength += textLength;
    }
  
    const lastBlock = blocks[blocks.length - 1];
    if (lastBlock.textContent === '\n')
    {
        return { block: lastBlock, blockOffset: 0, reduction: totalOffset - 0 };
    }
    return { block: lastBlock, blockOffset: lastBlock.textContent.length, reduction: totalOffset - cumulativeLength };
  }

const findOffset = (editorData: EditorDataType, i: number, j: number, key: string, processAst: ITextBlock[][], startOffset: number): ITextBlock | null => {
    const startRow = processAst[i];
    const cursorOffset = getCursorOffset(startRow.slice(0, j), startOffset + editorData.cursorOffsetReduction);
    editorData.cursorOffset = cursorOffset;
    
    if (key === 'ArrowUp')
    {
        const arr = processAst[i - 1];
        if (!arr)
        {
            return null;
        }
        const textBlockWithOffset = findTextBlockWithOffset(arr, cursorOffset);
        if (textBlockWithOffset) {
            editorData.cursorOffsetReduction = textBlockWithOffset.reduction;
            return Object.assign({ offset: textBlockWithOffset.blockOffset }, textBlockWithOffset.block);
        } 
    } else if (key === 'ArrowDown')
    {
        const arr = processAst[i + 1];
        if (!arr)
        {
            return null;
        }
        const textBlockWithOffset = findTextBlockWithOffset(arr, cursorOffset);
        if (textBlockWithOffset) {
            editorData.cursorOffsetReduction = textBlockWithOffset.reduction;
            return Object.assign({ offset: textBlockWithOffset.blockOffset }, textBlockWithOffset.block);
        }
    }

    return null;
}

const findTextBlockByGuid = (editorData: EditorDataType, processedAst: ITextBlock[][], processedAstMap: Map<string, number[]>, key: string, guid: string, textNodeIndex: number, startOffset: number): ITextBlock | null => {

        // Validate the startRow
    if (editorData.cursorLine < 0 || editorData.cursorLine >= processedAst.length) {
        throw new Error('Invalid start row number');
    }

    const res = processedAstMap.get(`${guid} ${textNodeIndex}`);
    if (res)
    {
        const [i, j] = res;
        return findOffset(editorData, i, j, key, processedAst, startOffset);
    }

    // If not found in either loop, return null
    return null;

}

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
        if (currentNode?.nodeName === 'CODE')
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
    let start =(element.nodeName === 'CODE' || element.nodeName.startsWith('H') || element.nodeName.startsWith('A')) ? element.childNodes[0].childNodes[textBlock.index] : element.childNodes[textBlock.index];

    if (!start)
        return;

    if (start.nodeName === 'CODE')
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