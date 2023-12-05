import { AstNode, AstUpdate, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, splitAndUpdateHigherLevelNodes, updateHigherLevelNodes } from "../node-operations";

const insertStrongTextIntoEmphasisTextOrViceVersa = (container: Node, child: AstNode, editorState: string, startOffset: number, historyManager: IHistoryManagerRecorder, higherLevelIndex: number, astParent: AstNode | null, containerIndex: number, higherLevelChildren: AstNode[], children: AstNode[], key: string): AstUpdate | null => {
    if (startOffset === 0) {
        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newContainer], startOffset, children.indexOf(child), 'beginning');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    else if (startOffset < (container.textContent || '').length) 
    {
        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, child, startOffset, historyManager, containerIndex, children.indexOf(child), editorState === 'strong' ? 'Strong' : 'Emphasis', key, children, higherLevelChildren, containerIndex, true, child.Children[containerIndex]);
        if (nodes !== null)
            return { type: 'higherLevelSplit', nodes };
    } else { 
        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newContainer], startOffset, children.indexOf(child), 'end');
        if (nodes !== null)
            return { type: 'higherLevelSplitOrMove', nodes: higherLevelChildren };
    }
    return null;
}

export default insertStrongTextIntoEmphasisTextOrViceVersa;