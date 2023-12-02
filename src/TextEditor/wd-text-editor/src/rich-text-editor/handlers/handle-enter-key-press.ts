import { AstContext, AstNode, AstUpdate, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { enterAroundCodeOrAlertBlocks, enterAroundLists, enterAroundNormalText, enterAroundQuoteBlocks, enterAroundStrongOrEmphasisText } from "../enter-operations";

const handleEnterKeyPress = (historyManager: IHistoryManager, container: Node, children: AstNode[], higherLevelChildren: AstNode[], updateData: UpdateData, context: AstContext, range: Range, startOffset: number): AstUpdate | null => {
    const commonAncestor = range.commonAncestorContainer;
    if (commonAncestor.nodeName !== '#text') {

    } 
    else
    {
        const {parent} = updateData;
        if (parent) {
            const parentId = parent.id;
            if (context.isLink || updateData.lowerLevelChild?.NodeName === 'Link')
            {
                return null;
            }
            else if (context.types.length === 0 && parent.nodeName === 'P')
            {
                const res = enterAroundNormalText(updateData, historyManager, higherLevelChildren, children, container, startOffset);
                if (res)
                    return res;
            }
            else if (context.types.length === 0 && (parent.nodeName === 'STRONG' || parent.nodeName === 'EMPHASIS'))
            {
                const res = enterAroundStrongOrEmphasisText(updateData, historyManager, higherLevelChildren, container, startOffset);
                if (res)
                    return res;
            }
            else if (context.isCodeBlock || context.isAlertBlock)
            {
                const res = enterAroundCodeOrAlertBlocks(updateData, parentId, historyManager, higherLevelChildren, children, container, startOffset);
                if (res)
                    return res;
            }
            else if (context.isQuoteBlock)
            {
                const res = enterAroundQuoteBlocks(updateData, parentId, historyManager, higherLevelChildren, children, container, startOffset);
                if (res)
                    return res;
            }
            else if (context.isUnorderedList || context.isOrderedList)
            {
                const res = enterAroundLists(updateData, historyManager, higherLevelChildren, children, container, startOffset);
                if (res)
                    return res;
            }
        }
    }

    return null;
};

export default handleEnterKeyPress;