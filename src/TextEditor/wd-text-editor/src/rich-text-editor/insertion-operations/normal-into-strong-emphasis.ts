import { AstNode, AstUpdate, IHistoryManagerRecorder, IdableNode } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, findNodeIndexByGuid, splitAndUpdateHigherLevelNodes, updateHigherLevelNodes } from "../node-operations";

const insertNormalTextIntoBothStrongAndEmphasisText = (container: IdableNode, startOffset: number, child: AstNode, historyManager: IHistoryManagerRecorder, higherLevelIndex: number, astParent: AstNode, containerIndex: number, higherLevelChildren: AstNode[], children: AstNode[], key: string): AstUpdate | null => {
    if (astParent.Children.indexOf(child) === 0 && startOffset === 0) {
        const newText = createNodeWithTypeAndKey('Text', key);
        const immediateIndex = findNodeIndexByGuid(children, child.Guid);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newText], startOffset, immediateIndex || 0, 'beginning');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    } else if (astParent.Children.indexOf(child) === astParent.Children.length - 1 && startOffset === (container.textContent || '').length)
    {
        const newText = createNodeWithTypeAndKey('Text', key);
        const immediateIndex = findNodeIndexByGuid(children, child.Guid);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newText], startOffset, immediateIndex || 0, 'end');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    else
    {
        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, astParent, startOffset, historyManager, containerIndex, children.indexOf(astParent), 'Text', key, children, higherLevelChildren, containerIndex, true, child.Children[containerIndex]);
        if (nodes !== null)
            return { type: 'higherLevelSplit', nodes };
    }

    return null;
}

export default insertNormalTextIntoBothStrongAndEmphasisText;