import { generateKey } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

/**
 * Splits a given AST node at a specified local offset within a target node.
 * This function first finds the target node using a depth-first search,
 * then splits the target node into two nodes at the given local offset,
 * and reconstructs the tree to include the split nodes.
 * 
 * @param {AstNode} rootNode - The root node of the AST.
 * @param {AstNode} target - The target node where the split will occur.
 * @param {number} localOffset - The local offset within the target node to perform the split.
 * @returns {[AstNode, AstNode, AstNode]} - An array containing the left node, right node, and a new line node created by the split.
 */
const splitNodeAtTarget = (rootNode: AstNode, targetNode: AstNode, localOffset: number): [AstNode | null, AstNode | null, AstNode] => {
    const performSplit = (node: AstNode, offset: number, depth: number): [AstNode | null, AstNode | null, AstNode, boolean] => {
      if (node.Guid === targetNode.Guid) {
        if (!node.TextContent || offset > node.TextContent.length) {
          throw new Error("Local offset is out of bounds.");
        }
  
        // Splitting the target node
        const leftNode: AstNode = {
          ...node,
          TextContent: node.TextContent.substring(0, offset),
          Children: [],
          Guid: node.Guid  // Keep the original Guid for the left node
        };
  
        const rightNode: AstNode = {
          ...node,
          TextContent: node.TextContent.substring(offset),
          Children: [],
          Guid: generateKey()  // Generate new Guid for the right node
        };
  
        const newLine: AstNode = {
          ...node,
          TextContent: '\n',
          Children: [],
          Guid: generateKey()
        };
  
        // Check if nodes need to be removed after split
        const leftNodeEmpty = isNodeEmpty(leftNode);
        const rightNodeEmpty = isNodeEmpty(rightNode);
  
        return [leftNodeEmpty ? null : leftNode, rightNodeEmpty ? null : rightNode, newLine, leftNodeEmpty || rightNodeEmpty];
      }
  
      for (let i = 0; i < node.Children.length; i++) {
        if (findNodeInTree(node.Children[i], targetNode.Guid)) {
          const [leftChild, rightChild, newLine, childNeedsRemoval] = performSplit(node.Children[i], offset, depth + 1);
  
          let updatedChildren = [...node.Children];
          if (leftChild) {
            updatedChildren[i] = leftChild;
          } else {
            updatedChildren.splice(i, 1);  // Remove the child if it's empty
          }
  
          if (rightChild) {
            updatedChildren.splice(i + 1, 0, rightChild, newLine);
          }
  
          const parentNodeEmpty = isNodeEmpty(node);
        return [parentNodeEmpty ? null : {
          ...node,
          Children: updatedChildren,
          Guid: node.Guid
        }, null, newLine, parentNodeEmpty || childNeedsRemoval];
        }
      }
  
      throw new Error("Target node not found in the tree.");
    };
  
    const isNodeEmpty = (node: AstNode): boolean => {
      return (!node.TextContent || node.TextContent.trim() === '') && (!node.Children || node.Children.length === 0);
    };
  
    const findNodeInTree = (node: AstNode, guid: string): boolean => {
      if (node.Guid === guid) {
        return true;
      }
      return node.Children.some(child => findNodeInTree(child, guid));
    };
  
    // Start the split process
    const [newRoot, , newLine, rootNeedsRemoval] = performSplit(rootNode, localOffset, 0);
  
    if (rootNeedsRemoval) {
      // Handle the case where the root node itself needs to be removed
      return [null, null, newLine];
    }
  
    return [newRoot, null, newLine];
  };

export default splitNodeAtTarget;