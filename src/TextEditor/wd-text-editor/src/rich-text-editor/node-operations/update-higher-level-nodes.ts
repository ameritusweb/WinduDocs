import { deepCopyAstNode } from ".";
import { AstNode, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const updateHigherLevelNodes = (childIndex: number, higherLevelChildren: AstNode[], children: AstNode[], historyManager: IHistoryManagerRecorder, newNodes: AstNode[] | null, startOffset: number, insertAt?: string) => {

    // If no valid index is found, you might want to handle this case differently
    if (childIndex === -1 || childIndex === null) {
        console.error("No valid insertion index found for higher level nodes.");
        return null;
    }

    const higherLevelChild = higherLevelChildren[childIndex];
    higherLevelChild.Children = [... children];

    if (newNodes === null)
        return higherLevelChildren;

    let insertionIndex = 0;
    if (insertAt === 'end')
    {
        insertionIndex = higherLevelChild.Children.length;
    }

    const oldIndex = insertionIndex === 0 ? 0 : insertionIndex - 1;
    const oldNode = deepCopyAstNode(higherLevelChild.Children[oldIndex]);
    // Insert the newNodes into the higherLevelChild Children array at the found index
    higherLevelChild.Children.splice(insertionIndex, 0, ...newNodes);
    const historyBuilder = new HistoryBuilder();
    historyBuilder.addInitialCursorPosition(oldNode, 0, startOffset);
    historyBuilder.addFinalCursorPosition(higherLevelChild, oldIndex + newNodes.length, 1);
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

    // Return the updated array
    return higherLevelChildren;
};

export default updateHigherLevelNodes;