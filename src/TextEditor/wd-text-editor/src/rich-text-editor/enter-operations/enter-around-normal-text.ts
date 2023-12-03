import { AstNode, IHistoryManagerRecorder, UpdateData } from "../../components/wysiwyg/interface";
import { moveArray } from "../array-processing";
import { createNewAstNode, deepCopyAstNode, generateKey, splitNode } from "../node-operations";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const enterAroundNormalText = (updateData: UpdateData, historyManager: IHistoryManagerRecorder, children: AstNode[], container: Node, startOffset: number) => {

    const { higherLevelIndex, child, grandChild, containerIndex, higherLevelChildren } = updateData;

    if (startOffset === 0)
    {
        const newBlank = createNewAstNode('BlankLine', 0, 0, null);
        const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
        higherLevelChildren.splice(higherLevelIndex, 0, newBlank);
        const historyBuilder = new HistoryBuilder();
        historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
        historyBuilder.addFinalCursorPosition(oldNode, 0, 0);
        historyBuilder.addInsertBeforeCommand(oldNode, newBlank);
        historyBuilder.applyTo(historyManager);
        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    else if (startOffset === container.textContent?.length)
    {
        const newBlank = createNewAstNode('BlankLine', 0, 0, null);
        higherLevelChildren.splice(higherLevelIndex + 1, 0, newBlank);
        const historyBuilder = new HistoryBuilder();
        historyBuilder.addInitialCursorPosition(higherLevelChildren[higherLevelIndex], 0, startOffset);
        historyBuilder.addFinalCursorPosition(newBlank, 0, 0);
        historyBuilder.addInsertBeforeCommand(higherLevelChildren[higherLevelIndex], newBlank);
        historyBuilder.applyTo(historyManager);
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

        const historyBuilder = new HistoryBuilder();
        historyBuilder.addInitialCursorPosition(oldNode, 0, startOffset);
        historyBuilder.addReplaceCommand(oldNode, newNode);
        higherLevelChildren.splice(higherLevelIndex + 1, 0, newPara);
        historyBuilder.addInsertAfterCommand(higherLevelChildren[higherLevelIndex], newPara);
        historyBuilder.addFinalCursorPosition(higherLevelChildren[higherLevelIndex + 1], 0, 0);
        historyBuilder.applyTo(historyManager);
        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }

    return null;
}

export default enterAroundNormalText;