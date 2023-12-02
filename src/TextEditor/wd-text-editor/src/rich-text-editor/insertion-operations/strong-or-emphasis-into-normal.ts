import { AstNode, AstUpdate, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, deepCopyAstNode, splitNode } from "../node-operations";
import HistoryBuilder from "../undo-redo-ot/history/history-builder";

const insertEitherStrongOrEmphasisTextIntoNormalText = (startOffset: number, container: Node, child: AstNode, children: AstNode[], index: number, historyManager: IHistoryManagerRecorder, higherLevelIndex: number | null, higherLevelChildren: AstNode[], type: string, rootChildId: string, editorState: string, key: string): AstUpdate | null => {
    if (startOffset === 0)
    {
        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
        children.splice(index, 0, newContainer);
    }
    else if (startOffset < (container.textContent || '').length)
    {
        const [node1, node2] = splitNode(child, startOffset);
        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
        const oldNode = deepCopyAstNode(children[index]);
        children.splice(index, 1, node1, newContainer, node2);
        const historyBuilder = new HistoryBuilder();
        historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
        historyBuilder.addReplaceCommand(oldNode, node1);
        historyBuilder.addInsertAfterCommand(node1, newContainer);
        historyBuilder.addInsertAfterCommand(newContainer, node2);
        historyBuilder.addFinalCursorPosition(node2, 0, 0);
        historyBuilder.applyTo(historyManager);
    } else
    {
        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
        children.splice(index + 1, 0, newContainer);
    }

    if (higherLevelIndex !== null) {
        const higherLevelChild = higherLevelChildren[higherLevelIndex];
        higherLevelChild.Children = [...children];
    }
    return { type, rootChildId, nodes: children.map((c) => {
        return Object.assign({}, c)
    }) };
}

export default insertEitherStrongOrEmphasisTextIntoNormalText;