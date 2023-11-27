import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { replaceText } from "../text-manipulation";

const insertTextIntoAListItem = (grandChild: AstNode, startOffset: number, child: AstNode, rootChildId: string, historyManager: IHistoryManager, astParent: AstNode, container: Text, key: string): AstUpdate => {
    const oldText = '' + grandChild.TextContent;
    let additionalOffset = 0;
    if (grandChild.TextContent === '\n')
    {
        grandChild.TextContent = '';
        additionalOffset = 1;
    }
    replaceText(container, grandChild, startOffset, key);
    historyManager.recordChildTextUpdate(oldText, startOffset + additionalOffset, child, grandChild, rootChildId);
    return { type: 'insert', rootChildId, nodes: astParent?.Children };
}

export default insertTextIntoAListItem;