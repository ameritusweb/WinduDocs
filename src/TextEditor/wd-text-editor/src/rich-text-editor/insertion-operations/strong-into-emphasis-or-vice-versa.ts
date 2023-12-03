import { AstNode, AstUpdate, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, splitAndUpdateHigherLevelNodes, updateHigherLevelNodes } from "../node-operations";

const insertStrongTextIntoEmphasisTextOrViceVersa = (parent: Node, editorState: string, startOffset: number, historyManager: IHistoryManagerRecorder, higherLevelIndex: number, astParent: AstNode | null, containerIndex: number, higherLevelChildren: AstNode[], children: AstNode[], key: string): AstUpdate | null => {
    if (astParent && parent.parentElement?.nodeName === 'STRONG')
    {
        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, astParent, startOffset, historyManager, containerIndex, children.indexOf(astParent), 'Strong', key, children, higherLevelChildren, containerIndex, true);
        if (nodes !== null)
            return { type: 'higherLevelSplit', nodes };
    } else {
        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newContainer], startOffset, 'end');
        if (nodes !== null) 
            return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
    }
    return null;
}

export default insertStrongTextIntoEmphasisTextOrViceVersa;