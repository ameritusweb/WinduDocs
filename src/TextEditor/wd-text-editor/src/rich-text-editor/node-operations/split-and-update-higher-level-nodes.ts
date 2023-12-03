import { createNodeWithTypeAndKey, deepCopyAstNode, nestedSplitNode, splitNode, splitTreeDeux } from ".";
import { AstNode, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const splitAndUpdateHigherLevelNodes = (childIndex: number, child: AstNode, startOffset: number, historyManager: IHistoryManagerRecorder, indexToSplit: number | undefined, indexToRemoveAndAdd: number, type: string, key: string, children: AstNode[], higherLevelChildren: AstNode[], containerIndex: number, useNestedSplit: boolean, splitTreeChild?: AstNode) => {

    let node1: AstNode = {} as AstNode;
    let node2: AstNode = {} as AstNode;
    if (splitTreeChild) {
        const [n1, n2] = splitTreeDeux(child, splitTreeChild, startOffset);
        if (!n1 || !n2)
            throw new Error('Split tree failed.');
        node1 = n1;
        node2 = n2;
    } else {
        [node1, node2] = useNestedSplit ? nestedSplitNode(child, startOffset) : splitNode(child, startOffset, indexToSplit);
    }
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