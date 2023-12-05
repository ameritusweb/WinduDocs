import { AstNode, AstUpdate, IHistoryManagerRecorder, IdableNode } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, splitAndUpdateHigherLevelNodes, updateHigherLevelNodes } from "../node-operations";

const insertNormalTextIntoEitherStrongOrEmphasisText = (container: IdableNode, startOffset: number, historyManager: IHistoryManagerRecorder, higherLevelIndex: number, child: AstNode, containerIndex: number, higherLevelChildren: AstNode[], children: AstNode[], key: string): AstUpdate | null => {
    if (startOffset === 0) {
        const newText = createNodeWithTypeAndKey('Text', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newText], startOffset, children.indexOf(child), 'beginning');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    else if (startOffset < (container.textContent || '').length) 
    {
        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, child, startOffset, historyManager, containerIndex, children.indexOf(child), 'Text', key, children, higherLevelChildren, containerIndex, false);
        if (nodes !== null)
            return { type: 'higherLevelSplit', nodes };
    } else { 
        const newText = createNodeWithTypeAndKey('Text', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newText], startOffset, children.indexOf(child), 'end');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }

    return null;
}

export default insertNormalTextIntoEitherStrongOrEmphasisText;