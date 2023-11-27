import { findOffset } from ".";
import { ITextBlock } from "../../components/wysiwyg/interface";
import { EditorDataType } from "../../hooks/editor-data";

const findTextBlockByGuid = (editorData: EditorDataType, processedAst: ITextBlock[][], processedAstMap: Map<string, number[]>, key: string, guid: string, textNodeIndex: number, startOffset: number): ITextBlock | null => {

    // Validate the startRow
if (editorData.cursorLine < 0 || editorData.cursorLine >= processedAst.length) {
    console.warn(`Invalid start row number: ${editorData.cursorLine} < 0 or >= ${processedAst.length} `);
    return null;
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

export default findTextBlockByGuid;