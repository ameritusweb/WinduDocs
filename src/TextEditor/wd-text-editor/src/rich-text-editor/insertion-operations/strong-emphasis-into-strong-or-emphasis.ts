import { AstNode, AstUpdate, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, updateHigherLevelNodes } from "../node-operations";

const insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText = (parent: Node, historyManager: IHistoryManagerRecorder, higherLevelIndex: number, higherLevelChildren: AstNode[], children: AstNode[], startOffset: number, key: string): AstUpdate | null => {
    const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
    const nodes = updateHigherLevelNodes(higherLevelIndex, higherLevelChildren, children, historyManager, [newContainer], startOffset, 'end');
    if (nodes !== null) 
        return { type: 'higherLevelInsertNew', nodes: higherLevelChildren };
    return null;
}

export default insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText;