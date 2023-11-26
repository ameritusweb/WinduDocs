import { createNodeWithTypeAndKey, nestedSplitNode, splitNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const splitAndUpdateHigherLevelNodes = (childIndex: number, child: AstNode, startOffset: number, indexToSplit: number | undefined, indexToRemoveAndAdd: number, type: string, key: string, children: AstNode[], higherLevelChildren: AstNode[], useNestedSplit: boolean) => {

    const [node1, node2] = useNestedSplit ? nestedSplitNode(child, startOffset) : splitNode(child, startOffset, indexToSplit);
    const newContainer = createNodeWithTypeAndKey(type, key);
    if (childIndex !== null) {
        children.splice(indexToRemoveAndAdd, 1, node1, newContainer, node2);
        const higherLevelChild = higherLevelChildren[childIndex];
        higherLevelChild.Children = [... children];
    }
    return higherLevelChildren;
}

export default splitAndUpdateHigherLevelNodes;