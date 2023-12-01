import { AstNode, IHistoryManager, IdableNode } from "../../components/wysiwyg/interface";
import { findHigherlevelIndex } from "../node-operations";
import { replaceText } from "../text-manipulation";

const insertTextIntoEitherACodeBlockOrAlertBlock = (child: AstNode, container: IdableNode, startOffset: number, rootChildId: string, historyManager: IHistoryManager, higherLevelChildren: AstNode[], children: AstNode[], key: string) => {
    const oldText = '' + child.TextContent;
    let additionalOffset = 0;
    if (child.TextContent === '\n')
    {
        child.TextContent = '';
        additionalOffset = 1;
    }
    replaceText(container, child, startOffset, key);
    historyManager.recordChildTextUpdate(oldText, startOffset + additionalOffset, child, null, rootChildId);
    let higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === children[0].Guid);
    if (higherLevelIndex === -1) {
        higherLevelIndex = findHigherlevelIndex(children, higherLevelChildren) || 0;
        const childIndex = children.findIndex(c => c === child);
        higherLevelChildren[higherLevelIndex].Children[childIndex] = child;
    } else {
        higherLevelChildren[higherLevelIndex] = child;
    }
    return { type: 'higherLevelInsert', rootChildId, nodes: higherLevelChildren };
}

export default insertTextIntoEitherACodeBlockOrAlertBlock;