import { AstNode, AstUpdate, IHistoryManagerRecorder, IdableNode } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, splitAndUpdateHigherLevelNodes, updateHigherLevelNodes } from "../node-operations";

const insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText = (parent: Node, child: AstNode, container: IdableNode, containerIndex: number, historyManager: IHistoryManagerRecorder, higherLevelIndex: number, higherLevelChildren: AstNode[], children: AstNode[], startOffset: number, key: string): AstUpdate | null => {
    if (startOffset === 0) {
        const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newContainer], startOffset, 'beginning');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    else if (startOffset < (container.textContent || '').length) // insert in the middle
    {
        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, child, startOffset, historyManager, containerIndex, children.indexOf(child), 'Strong + Emphasis', key, children, higherLevelChildren, containerIndex, true, child.Children[containerIndex]);
        if (nodes !== null)
            return { type: 'higherLevelSplit', nodes };
    } else { // insert at the end
        const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newContainer], startOffset, 'end');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    return null;
}

export default insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText;