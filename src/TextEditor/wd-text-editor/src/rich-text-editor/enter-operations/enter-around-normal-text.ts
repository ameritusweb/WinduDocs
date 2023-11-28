import { AstNode, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { moveArray } from "../array-processing";
import { createNewAstNode, deepCopyAstNode, generateKey, splitNode } from "../node-operations";

const enterAroundNormalText = (updateData: UpdateData, historyManager: IHistoryManager, higherLevelChildren: AstNode[], children: AstNode[], container: Node, startOffset: number) => {

    const { higherLevelIndex, child, grandChild, containerIndex } = updateData;

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
        const [node1, node2] = splitNode(grandChild!, startOffset);
        const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
        const oldLowerLevelParent = deepCopyAstNode(child!);
        children.splice(containerIndex, 1, node1, node2);
        const newPara = createNewAstNode('ParagraphBlock', 0, 0, null);
        moveArray(children, containerIndex + 1, newPara.Children, 0);
        higherLevelChildren[higherLevelIndex].Guid = generateKey();
        const newNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
        historyManager.recordChildReplace(null, oldNode, newNode, oldLowerLevelParent!, containerIndex, startOffset);
        higherLevelChildren.splice(higherLevelIndex + 1, 0, newPara);
        historyManager.recordChildAdd(null, newNode, startOffset, higherLevelChildren[higherLevelIndex + 1], higherLevelChildren[higherLevelIndex + 1], 0, 0, true);
        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }

    return null;
}

export default enterAroundNormalText;