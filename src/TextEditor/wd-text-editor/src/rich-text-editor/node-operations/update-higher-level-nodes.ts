import { deepCopyAstNode } from ".";
import { AstNode, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const updateHigherLevelNodes = (higherLevelChildIndex: number, higherLevelChildren: AstNode[], children: AstNode[], historyManager: IHistoryManagerRecorder, newNodes: AstNode[] | null, startOffset: number, childIndex: number, insertAt?: string) => {

    
    if (higherLevelChildIndex === -1 || higherLevelChildIndex === null) {
        console.error("No valid insertion index found for higher level nodes.");
        return null;
    }

    const higherLevelChild = higherLevelChildren[higherLevelChildIndex];
    higherLevelChild.Children = [... children];

    if (newNodes === null)
        return higherLevelChildren;

    let insertionIndex = childIndex;
    if (insertAt === 'end')
    {
        insertionIndex = childIndex + 1;
    }

    const oldIndex = insertionIndex === 0 ? 0 : insertionIndex - 1;
    const oldNode = deepCopyAstNode(higherLevelChild.Children[oldIndex]);
    higherLevelChild.Children.splice(insertionIndex, 0, ...newNodes);
    const historyBuilder = new HistoryBuilder();
    historyBuilder.addInitialCursorPosition(oldNode, 0, startOffset);
    if (insertAt === 'end') {
        historyBuilder.addFinalCursorPosition(higherLevelChild, oldIndex + newNodes.length, 1);
    } else {
        historyBuilder.addFinalCursorPosition(higherLevelChild, oldIndex, 1);
    }
    let prev = oldNode;
    for (const node of newNodes) {
        if (insertAt === 'end') {
            historyBuilder.addInsertAfterCommand(prev, node);
            prev = node;
        } else {
            historyBuilder.addInsertBeforeCommand(oldNode, node!);
        }
    }
    historyBuilder.applyTo(historyManager);

    
    return higherLevelChildren;
};

export default updateHigherLevelNodes;