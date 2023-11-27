import { AstNode, AstUpdate } from "../../components/wysiwyg/interface";
import { createNodeWithTypeAndKey, splitNode } from "../node-operations";

const insertBothStrongAndEmphasisTextIntoNormalText = (startOffset: number, container: Node, child: AstNode, children: AstNode[], index: number, higherLevelIndex: number | null, higherLevelChildren: AstNode[], type: string, rootChildId: string, key: string): AstUpdate | null => {
    if (startOffset === 0)
    {
        // TODO
        return null;
    }
    else if (startOffset < (container.textContent || '').length)
    {
        const [node1, node2] = splitNode(child, startOffset);
        const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
        children.splice(index, 1, node1, newContainer, node2);
    } else {
        const newContainer = createNodeWithTypeAndKey('Strong + Emphasis', key);
        children.splice(children.length, 0, newContainer);
    }

    if (higherLevelIndex !== null) {
        const higherLevelChild = higherLevelChildren[higherLevelIndex];
        higherLevelChild.Children = [...children];
    }
    return { type, rootChildId, nodes: children.map((c) => {
        return Object.assign({}, c)
    }) };
}

export default insertBothStrongAndEmphasisTextIntoNormalText;