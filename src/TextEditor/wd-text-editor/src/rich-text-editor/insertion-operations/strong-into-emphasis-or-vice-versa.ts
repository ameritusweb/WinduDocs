import { AstNode, AstUpdate } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, splitAndUpdateHigherLevelNodes, updateHigherLevelNodes } from "../node-operations";

const insertStrongTextIntoEmphasisTextOrViceVersa = (parent: Node, editorState: string, startOffset: number, higherLevelIndex: number, astParent: AstNode | null, containerIndex: number, higherLevelChildren: AstNode[], children: AstNode[], key: string): AstUpdate | null => {
    if (astParent && parent.parentElement?.nodeName === 'STRONG')
    {
        const nodes = splitAndUpdateHigherLevelNodes(higherLevelIndex, astParent, startOffset, containerIndex, children.indexOf(astParent), 'Strong', key, children, higherLevelChildren, true);
        if (nodes !== null)
            return { type: 'higherLevelSplit', nodes };
    } else {
        const newContainer = createNodeWithTypeAndKey(editorState === 'strong' ? 'Strong' : 'Emphasis', key);
        const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, [newContainer], 'end');
        if (nodes !== null) 
            return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
    }
    return null;
}

export default insertStrongTextIntoEmphasisTextOrViceVersa;