import { AstNode, AstUpdate } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, updateHigherLevelNodes } from "../node-operations";

const insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText = (parent: Node, higherLevelIndex: number, higherLevelChildren: AstNode[], children: AstNode[], key: string): AstUpdate | null => {
    const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
    const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, [newContainer], 'end');
    if (nodes !== null) 
        return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
    return null;
}

export default insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText;