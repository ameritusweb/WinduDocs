import { generateKey } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

/**
 * Splits a given AST node at a specified local offset within a target node.
 * This function first finds the target node using a depth-first search,
 * then splits the target node into two nodes at the given local offset,
 * and reconstructs the tree to include the split nodes.
 * 
 * @param {AstNode} root - The root node of the AST.
 * @param {AstNode} target - The target node where the split will occur.
 * @param {number} offset - The local offset within the target node to perform the split.
 * @returns {[AstNode, AstNode, AstNode]} - An array containing the left node, right node, and a new line node created by the split.
 */
const splitNodeAtTarget = (root: AstNode, target: AstNode, offset: number): [AstNode, AstNode] => {
    let targetFound = false;

    const generateNewTree = (node: AstNode, generateNewGuid: boolean): AstNode => {
        return {
            ...node,
            Children: node.Children.map(child => generateNewTree(child, generateNewGuid)),
            Guid: generateNewGuid ? generateKey() : node.Guid
        };
    };

    const traverseAndSplit = (node: AstNode, depth: number): [AstNode, AstNode | null] => {
        if (node.Guid === target.Guid) {
            targetFound = true;
            const leftNode = { ...node, TextContent: node.TextContent!.substring(0, offset), Children: node.Children };
            const rightNode = { ...node, TextContent: node.TextContent!.substring(offset), Children: [], Guid: generateKey() };
            return [leftNode, rightNode];
        }

        let leftChildren = [];
        let rightChildren = [];
        for (let i = 0; i < node.Children.length; i++) {
            if (targetFound) {
                rightChildren.push(generateNewTree(node.Children[i], true));
            } else {
                const [leftChild, rightChild] = traverseAndSplit(node.Children[i], depth + 1);
                leftChildren.push(leftChild);
                if (rightChild) {
                    rightChildren.push(rightChild);
                }
            }
        }

        const leftPart = { ...node, Children: leftChildren, Guid: node.Guid };
        const rightPart = targetFound ? { ...node, Children: rightChildren, Guid: generateKey() } : null;
        return [leftPart, rightPart];
    };

    const [leftTree, rightTree] = traverseAndSplit(root, 0);
    return [leftTree, rightTree ? rightTree : generateNewTree(root, true)];
};


export default splitNodeAtTarget;