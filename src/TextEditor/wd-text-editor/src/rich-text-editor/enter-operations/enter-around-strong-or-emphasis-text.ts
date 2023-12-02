import { AstNode, IHistoryManagerRecorder, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNode, deepCopyAstNode, findNodeByGuid, generateKey, splitTree } from "../node-operations";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const enterAroundStrongOrEmphasisText = (updateData: UpdateData, historyManager: IHistoryManagerRecorder, container: Node, startOffset: number) => {

    const { higherLevelIndex, child, grandChild, higherLevelChildren } = updateData;

    if (startOffset === 0)
    {
        const newBlank = createNewAstNode('BlankLine', 0, 0, null);
        console.log(higherLevelIndex);
        const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
        higherLevelChildren.splice(higherLevelIndex, 0, newBlank);
        const historyBuilder = new HistoryBuilder();
        historyBuilder.addInitialCursorPosition(oldNode, 0, startOffset);
        historyBuilder.addFinalCursorPosition(oldNode, 0, 0);
        historyBuilder.addInsertBeforeCommand(higherLevelChildren[higherLevelIndex], newBlank);
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
        historyBuilder.addInsertAfterCommand(higherLevelChildren[higherLevelIndex], newBlank);
        historyBuilder.applyTo(historyManager);
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


            const historyBuilder = new HistoryBuilder();
            historyBuilder.addInitialCursorPosition(oldNode, 0, startOffset);
            historyBuilder.addReplaceCommand(oldNode, split[0]);
            higherLevelChildren.splice(higherLevelIndex + 1, 0, split[1]);
            const [newChild, newParent] = findNodeByGuid(higherLevelChildren, guid, null);
            const newChildIndex = newParent?.Children.findIndex(c => c.Guid === newChild?.Guid);
            if (newParent && newChildIndex !== undefined && newChildIndex !== null) {
                historyBuilder.addInsertAfterCommand(higherLevelChildren[higherLevelIndex], split[1]);
                historyBuilder.addFinalCursorPosition(newParent, newChildIndex, 0);
                historyBuilder.applyTo(historyManager);
            }
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }

    return null;
}

export default enterAroundStrongOrEmphasisText;