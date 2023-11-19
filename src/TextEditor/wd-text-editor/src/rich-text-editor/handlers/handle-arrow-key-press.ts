import { ITextBlock } from "../../components/wysiwyg/interface";
import { EditorDataType } from "../../hooks/editor-data";

const addOffset = (block: ITextBlock, editorData: EditorDataType): ITextBlock => {
    let offset = 0;
    if (editorData.cursorPosition === 'end')
    {
        offset = block.textContent.length;
    }
    return Object.assign({ offset }, block);
}

const getCursorOffset = (previousBlocks: ITextBlock[], offset: number) => {
    return previousBlocks.reduce((accumulator, currentObject) => {
        return accumulator + currentObject.textContent.length;
    }, offset);
}

const findTextBlockWithOffset = (blocks: ITextBlock[], totalOffset: number): { block: ITextBlock, blockOffset: number } | null => {
    let cumulativeLength = 0;
  
    for (const block of blocks) {
      const textLength = block.textContent.length;
      if (cumulativeLength + textLength >= totalOffset) {
        const blockOffset = totalOffset - cumulativeLength;
        return { block, blockOffset };
      }
      cumulativeLength += textLength;
    }
  
    // Return null if total offset is beyond the total length of all text blocks
    return null;
  }

const findOffset = (editorData: EditorDataType, i: number, j: number, key: string, processAst: ITextBlock[][], startOffset: number): ITextBlock | null => {
    const startRow = processAst[i];
    //const cursorOffset = getCursorOffset(startRow.slice(0, j), startOffset);
    //editorData.cursorOffset = cursorOffset;
    const cursorOffset = editorData.cursorOffset;
    
    if (editorData.cursorPosition === 'end')
    {
        if (key === 'ArrowUp')
        {
            const arr = processAst[i - 1];
            if (!arr)
            {
                return null;
            }
            return addOffset(arr[arr.length - 1], editorData) || null;
        } else if (key === 'ArrowDown')
        {
            const arr = processAst[i + 1];
            if (!arr)
            {
                return null;
            }
            return addOffset(arr[arr.length - 1], editorData) || null;
        }
    } else if (editorData.cursorPosition === 'beginning')
    {
        if (key === 'ArrowUp')
        {
            const arr = processAst[i - 1];
            if (!arr)
            {
                return null;
            }
            const textBlockWithOffset = findTextBlockWithOffset(arr, cursorOffset);
            if (textBlockWithOffset) {
                return Object.assign({ offset: textBlockWithOffset.blockOffset }, textBlockWithOffset.block);
            } else {
                return Object.assign({ offset: arr[arr.length - 1].textContent.length }, arr[arr.length - 1]);
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
                return Object.assign({ offset: textBlockWithOffset.blockOffset }, textBlockWithOffset.block);
            } else {
                return Object.assign({ offset: arr[arr.length - 1].textContent.length }, arr[arr.length - 1]);
            }
        }
    }

    return null;
}

const findTextBlockByGuid = (editorData: EditorDataType, processedAst: ITextBlock[][], key: string, guid: string, textNodeIndex: number, startOffset: number): ITextBlock | null => {

        // Validate the startRow
    if (editorData.cursorLine < 0 || editorData.cursorLine >= processedAst.length) {
        throw new Error('Invalid start row number');
    }

    const startRow = editorData.cursorLine;
    const textBlocks = processedAst;

    // Search from startRow to the end of the array
    for (let i = startRow; i < textBlocks.length; i++) {
        let index = 0;
        for (const textBlock of textBlocks[i]) {
            if (textBlock.guid === guid && textBlock.index === textNodeIndex) {
                return findOffset(editorData, i, index, key, processedAst, startOffset);
            }
            index++;
        }
    }

    // If not found, search from the beginning up to startRow
    for (let i = 0; i < startRow; i++) {
        let index = 0;
        for (const textBlock of textBlocks[i]) {
            if (textBlock.guid === guid) {
                return findOffset(editorData, i, index, key, processedAst, startOffset);
            }
            index++;
        }
    }

    // If not found in either loop, return null
    return null;

}

const handleArrowKeyPress = (key: string, editorData: EditorDataType, processedAst: ITextBlock[][]) => {

    const selection = window.getSelection();
    if (!selection)
    {
        return;
    }

    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let currentNode: Node | null = range.startContainer;
    let textNodeIndex: number = 0;

    //let atEnd = currentNode.nodeType === Node.TEXT_NODE && currentNode.textContent && currentNode.textContent.length > 1 && range.startOffset === (currentNode.textContent || '').length;

    /*
    if (atEnd) {
        editorData.cursorPosition = 'end';
    } else if (currentNode.textContent && currentNode.textContent.length > 1) {
        editorData.cursorPosition = 'beginning';
    } else {
        atEnd = editorData.cursorPosition === 'end';
    }
    */
    if (currentNode.nodeType === Node.TEXT_NODE) {
        textNodeIndex = Array.from(currentNode.parentElement?.childNodes || []).findIndex((e) => e === currentNode);
        currentNode = currentNode.parentElement;
    }

    if (!currentNode) 
        return;

    let guid = (currentNode as Element).id;
    const gparent = currentNode.parentElement;
    if (gparent && (gparent.nodeName === 'CODE' || gparent.nodeName === 'H1' || gparent.nodeName === 'H2' || gparent.nodeName === 'H3' || gparent.nodeName === 'H4' || gparent.nodeName === 'H5' || gparent.nodeName === 'H6'))
    {
        guid = gparent.id;
    }
    const textBlock = findTextBlockByGuid(editorData, processedAst, key, guid, textNodeIndex, range.startOffset);

    if (!textBlock)
        return;

    const element = document.getElementById(textBlock.guid);

    if (!element)
        return;

    const newRange = document.createRange();
    const start = element.nodeName === 'CODE' ? element.childNodes[0].childNodes[textBlock.index] : element.childNodes[textBlock.index];

    if (!start)
        return;

    newRange.setStart(start, textBlock.offset || 0);
    newRange.setEnd(start, textBlock.offset || 0);

    selection.removeAllRanges();
    selection.addRange(newRange);

}

export default handleArrowKeyPress;