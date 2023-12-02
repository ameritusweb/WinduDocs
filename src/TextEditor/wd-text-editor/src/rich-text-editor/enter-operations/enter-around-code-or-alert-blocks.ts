import { AstNode, IHistoryManagerRecorder, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNode, deepCopyAstNode, splitNode } from "../node-operations";
import { trimSpecial } from "../undo-redo-ot";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const enterAroundCodeOrAlertBlocks = (updateData: UpdateData, parentId: string, historyManager: IHistoryManagerRecorder, children: AstNode[], container: Node, startOffset: number) => {

    const { higherLevelIndex, child, containerIndex, higherLevelChildren } = updateData;

    if (startOffset === 0)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNode('Text', 0, 0, '\n');
            const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
            higherLevelChildren.splice(higherLevelIndex, 0, newNode);
            const historyBuilder = new HistoryBuilder();
            historyBuilder.addInitialCursorPosition({ ...higherLevelChildren[higherLevelIndex], NodeName: 'ParagraphBlock' }, 0, 0);
            historyBuilder.addFinalCursorPosition({ ...higherLevelChildren[higherLevelIndex + 1], NodeName: 'ParagraphBlock' }, containerIndex, 0);
            historyBuilder.addInsertBeforeCommand(oldNode, newNode);
            historyBuilder.applyTo(historyManager);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }   
    }
    else if (startOffset === container.textContent?.length)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNode('Text', 0, 0, '\n');
            higherLevelChildren.splice(higherLevelIndex + 1, 0, newNode);
            const historyBuilder = new HistoryBuilder();
            historyBuilder.addInitialCursorPosition({ ...higherLevelChildren[higherLevelIndex], NodeName: 'ParagraphBlock' }, 0, startOffset);
            historyBuilder.addFinalCursorPosition({ ...higherLevelChildren[higherLevelIndex + 1], NodeName: 'ParagraphBlock' }, 0, 0);
            historyBuilder.addInsertAfterCommand(higherLevelChildren[higherLevelIndex], newNode);
            historyBuilder.applyTo(historyManager);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }   
    }
    else
    {
        const [node1, node2] = splitNode(child!, startOffset);
        const oldNode = deepCopyAstNode(higherLevelChildren[containerIndex]);
        higherLevelChildren.splice(higherLevelIndex, 1, node1);
        const historyBuilder = new HistoryBuilder();
        historyBuilder.addInitialCursorPosition(oldNode, 0, startOffset);
        historyBuilder.addReplaceCommand(oldNode, node1);
        higherLevelChildren.splice(higherLevelIndex + 1, 0, node2);
        historyBuilder.addInsertAfterCommand(higherLevelChildren[higherLevelIndex], node2);
        historyBuilder.addFinalCursorPosition({ ...node2, NodeName: 'ParagraphBlock' }, 0, 0);
        historyBuilder.applyTo(historyManager);
        return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }

    return null;
}

export default enterAroundCodeOrAlertBlocks;