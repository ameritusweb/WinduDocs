import { createNodeWithTypeAndKey, deepCopyAstNode, nestedSplitNode, splitNode } from ".";
import { AstNode, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const splitAndUpdateHigherLevelNodes = (childIndex: number, child: AstNode, startOffset: number, historyManager: IHistoryManagerRecorder, indexToSplit: number | undefined, indexToRemoveAndAdd: number, type: string, key: string, children: AstNode[], higherLevelChildren: AstNode[], containerIndex: number, useNestedSplit: boolean) => {

    const [node1, node2] = useNestedSplit ? nestedSplitNode(child, startOffset) : splitNode(child, startOffset, indexToSplit);
    const newContainer = createNodeWithTypeAndKey(type, key);
    if (childIndex !== null) {
        const oldNode = deepCopyAstNode(children[indexToRemoveAndAdd]);
        children.splice(indexToRemoveAndAdd, 1, node1, newContainer, node2);
        const higherLevelChild = higherLevelChildren[childIndex];
        higherLevelChild.Children = [... children];
        const historyBuilder = new HistoryBuilder();
        historyBuilder.addInitialCursorPosition(child, containerIndex, startOffset);
        historyBuilder.addFinalCursorPosition({ ...higherLevelChild, NodeName: 'ParagraphBlock' }, indexToRemoveAndAdd + 1, 1);
        historyBuilder.addReplaceCommand(oldNode, node1);
        historyBuilder.addInsertAfterCommand(node1, newContainer);
        historyBuilder.addInsertAfterCommand(newContainer, node2);
        historyBuilder.applyTo(historyManager);
    }
    return higherLevelChildren;
}

export default splitAndUpdateHigherLevelNodes;