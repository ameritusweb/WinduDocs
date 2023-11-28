import { AstNode, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNode, deepCopyAstNode, findNodeByGuid, generateKey, splitTree } from "../node-operations";

const enterAroundStrongOrEmphasisText = (updateData: UpdateData, historyManager: IHistoryManager, higherLevelChildren: AstNode[], container: Node, startOffset: number) => {

    const { higherLevelIndex, child, grandChild } = updateData;

    if (startOffset === 0)
    {
        const newBlank = createNewAstNode('BlankLine', 0, 0, null);
        const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
        higherLevelChildren.splice(higherLevelIndex, 0, newBlank);
        historyManager.recordChildAdd(null, oldNode, startOffset, newBlank, oldNode, 0, 0);
        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    else if (startOffset === container.textContent?.length)
    {
        const newBlank = createNewAstNode('BlankLine', 0, 0, null);
        higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
        historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, newBlank, newBlank, 0, 0);
        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    else
    {
        const higherLevelChild = higherLevelChildren[higherLevelIndex];
        if (child) {
            const lowerLevelChild = grandChild;
            const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
            const guid = generateKey();
            const split = splitTree(higherLevelChild, lowerLevelChild!, startOffset, guid);
            higherLevelChildren.splice(higherLevelIndex, 1, split[0]);
            historyManager.recordChildReplace(null, oldNode, split[0], child, 0, startOffset);
            higherLevelChildren.splice(higherLevelIndex + 1, 0, split[1]);
            const [newChild, newParent] = findNodeByGuid(higherLevelChildren, guid, null);
            const newChildIndex = newParent?.Children.findIndex(c => c.Guid === newChild?.Guid);
            if (newParent && newChildIndex !== undefined && newChildIndex !== null)
                historyManager.recordChildAdd(null, higherLevelChildren[higherLevelIndex], startOffset, higherLevelChildren[higherLevelIndex + 1], newParent, newChildIndex, 0, true);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }

    return null;
}

export default enterAroundStrongOrEmphasisText;