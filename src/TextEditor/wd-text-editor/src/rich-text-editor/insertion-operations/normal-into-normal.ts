import { AstNode, AstUpdate, IHistoryManagerRecorder, IdableNode } from "../../components/wysiwyg/interface";
import { replaceText } from "../text-manipulation";

const insertNormalTextIntoOtherNormalText = (grandChild: AstNode, container: IdableNode, startOffset: number, historyManager: IHistoryManagerRecorder, child: AstNode, rootChildId: string, children: AstNode[], key: string): AstUpdate => {
    const oldText = '' + grandChild.TextContent;
    let additionalOffset = 0;
    if (grandChild.TextContent === '\n')
    {
        grandChild.TextContent = '';
        additionalOffset = 1;
    }
    replaceText(container, grandChild, startOffset, key);
    historyManager.recordChildTextUpdate(oldText, startOffset + additionalOffset, child.NodeName !== 'Text' ? child : {...child, NodeName: 'ParagraphBlock'}, grandChild, rootChildId);
    return { type: 'insert', rootChildId, nodes: children.map((c) => {
        return Object.assign({}, c)
    }) };
}

export default insertNormalTextIntoOtherNormalText;