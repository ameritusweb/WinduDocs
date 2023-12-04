import { findOffset } from ".";
import { ITextBlock } from "../../components/wysiwyg/interface";
import { EditorDataType } from "../../hooks/editor-data";

const findTextBlockByGuid = (editorData: EditorDataType, processedAst: ITextBlock[][], processedAstMap: Map<string, number[]>, key: string, guid: string, textNodeIndex: number, startOffset: number): ITextBlock | null => {

const res = processedAstMap.get(`${guid} ${textNodeIndex}`);
if (res)
{
    const [i, j] = res;
    return findOffset(editorData, i, j, key, processedAst, startOffset);
}


return null;

}

export default findTextBlockByGuid;