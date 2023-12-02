import { AstNode, IHistoryManager, UpdateData } from "../../components/wysiwyg/interface";
import { createNewAstNodeFromFormat, deepCopyAstNode, splitTree } from "../node-operations";
import { trimSpecial } from "../undo-redo-ot";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const enterAroundQuoteBlocks = (updateData: UpdateData, parentId: string, historyManager: IHistoryManager, higherLevelChildren: AstNode[], children: AstNode[], container: Node, startOffset: number) => {

    const { higherLevelIndex, child, grandChild, containerIndex } = updateData;

    if (startOffset === 0)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNodeFromFormat('p', '\n');
            higherLevelChildren.splice(higherLevelIndex, 0, newNode);
            const historyBuilder = new HistoryBuilder();
            historyBuilder.addInitialCursorPosition(higherLevelChildren[higherLevelIndex + 1], 0, startOffset);
            historyBuilder.addFinalCursorPosition(newNode, 0, 0);
            historyBuilder.addInsertBeforeCommand(higherLevelChildren[higherLevelIndex + 1], newNode);
            historyBuilder.applyTo(historyManager);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }
    else if (startOffset === container.textContent?.length)
    {
        const child = children[containerIndex];
        const higherLevelIndex = higherLevelChildren.findIndex((c) => c.Guid === trimSpecial(parentId, { startString: 'para_' }));
        if (child && higherLevelIndex !== -1) {
            const newNode = createNewAstNodeFromFormat('p', '\n');
            higherLevelChildren.splice(higherLevelIndex + 1, 0, newNode);
            const historyBuilder = new HistoryBuilder();
            historyBuilder.addInitialCursorPosition(higherLevelChildren[higherLevelIndex], 0, startOffset);
            historyBuilder.addFinalCursorPosition(newNode, 0, 0);
            historyBuilder.addInsertAfterCommand(higherLevelChildren[higherLevelIndex], newNode);
            historyBuilder.applyTo(historyManager);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }
    else {
        const higherLevelChild = higherLevelChildren[higherLevelIndex];
        if (child) {
            const [node1, node2] = splitTree(higherLevelChild, grandChild!, startOffset);
            const oldNode = deepCopyAstNode(higherLevelChildren[higherLevelIndex]);
            higherLevelChildren.splice(higherLevelIndex, 1, node1);

            const historyBuilder = new HistoryBuilder();
            historyBuilder.addInitialCursorPosition(oldNode, 0, startOffset);
            historyBuilder.addReplaceCommand(oldNode, node1);
            higherLevelChildren.splice(higherLevelIndex + 1, 0, node2);
            historyBuilder.addInsertAfterCommand(higherLevelChildren[higherLevelIndex], node2);
            historyBuilder.addFinalCursorPosition(node2, 0, 0);
            historyBuilder.applyTo(historyManager);
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
        }
    }

    return null;
}

export default enterAroundQuoteBlocks;