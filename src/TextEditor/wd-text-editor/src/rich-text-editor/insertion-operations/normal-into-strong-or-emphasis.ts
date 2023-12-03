import { AstNode, AstUpdate, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, splitAndUpdateHigherLevelNodes, updateHigherLevelNodes } from "../node-operations";

const insertNormalTextIntoEitherStrongOrEmphasisText = (container: Text, startOffset: number, historyManager: IHistoryManagerRecorder, higherLevelIndex: number, child: AstNode, containerIndex: number, higherLevelChildren: AstNode[], children: AstNode[], key: string): AstUpdate | null => {
    if (startOffset === 0) {
        // TODO
    }
    else if (startOffset < (container.textContent || '').length) // insert in the middle
    {
        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, child, startOffset, historyManager, containerIndex, children.indexOf(child), 'Text', key, children, higherLevelChildren, containerIndex, false);
        if (nodes !== null)
            return { type: 'higherLevelSplit', nodes };
    } else { // insert at the end
        const newText = createNodeWithTypeAndKey('Text', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, [newText], 'end');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }

    return null;
}

export default insertNormalTextIntoEitherStrongOrEmphasisText;