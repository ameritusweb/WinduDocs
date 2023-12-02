import { AstNode } from "../../../components/wysiwyg/interface";

/**
 * Find the parent of a node with a given Guid and the index for splicing.
 * @param root The root node of the AST.
 * @param siblingGuid The Guid of the sibling node.
 * @param insertBefore Boolean indicating whether to insert before (true) or after (false) the sibling node.
 * @returns A tuple containing the parent node and the index for splicing.
 */
const findParentNodeAndSpliceIndex = (root: AstNode, siblingGuid: string, insertBefore: boolean): [AstNode | null, number] => {
    function findNode(node: AstNode, parent: AstNode | null = null): [AstNode | null, number] {
        for (let i = 0; i < node.Children.length; i++) {
            const child = node.Children[i];
            if (child.Guid === siblingGuid) {
                // Determine the index based on the insertBefore flag
                return [parent, insertBefore ? i : i + 1];
            }

            const result = findNode(child, node);
            if (result[0]) {
                return result;
            }
        }
        return [null, -1];
    }

    return findNode(root);
}

export default findParentNodeAndSpliceIndex;