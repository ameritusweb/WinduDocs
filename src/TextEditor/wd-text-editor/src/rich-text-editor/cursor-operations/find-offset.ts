import { findTextBlockWithOffset, getCursorOffset } from ".";
import { ITextBlock } from "../../components/wysiwyg/interface";
import { EditorDataType } from "../../hooks/editor-data";

const findOffset = (editorData: EditorDataType, i: number, j: number, key: string, processAst: ITextBlock[][], startOffset: number): ITextBlock | null => {
    const startRow = processAst[i];

    if (!startRow)
        return null;

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

export default findOffset;