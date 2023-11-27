import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { replaceText } from "../text-manipulation";

const insertTextIntoHeading = (child: AstNode, container: Text, historyManager: IHistoryManager, startOffset: number, astParent: AstNode, rootChildId: string, children: AstNode[], key: string): AstUpdate => {
    const oldText = '' + child.TextContent;
    replaceText(container, child, startOffset, key);
    historyManager.recordChildTextUpdate(oldText, startOffset, astParent, child, rootChildId);
    return { type: 'insert', rootChildId, nodes: children.map((c) => {
        return Object.assign({}, c)
    }) };
}

export default insertTextIntoHeading;