import { generateKey, isNodeEmpty, splitNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const splitTree = (root: AstNode, leafNode: AstNode, offset: number, rightNodeGuid?: string): AstNode[] => {

    const leftTree = {} as AstNode;
    const rightTree = {} as AstNode;
    const path: number[] = [];
    let foundPath: number[] = [];
    let splitFound = false;
    const guid = rightNodeGuid || generateKey();

    function traverse(node: AstNode, left: AstNode, right: AstNode, leaf: AstNode, offset: number, index: number, depth: number): AstNode[] | null {

        path[depth] = index;
        Object.assign(left, node);
        Object.assign(right, node);

        left.Children = [];
        right.Children = [];

        right.Guid = generateKey();

        if (node === leaf)
        {
            splitFound = true;
            foundPath = path.slice(0);
            return splitNode(node, offset, undefined, guid);
        }

        index = 0;
        for (const child of node.Children)
        {
            const leftTreeNode = Object.assign({}, child);
            leftTreeNode.Children = [];
            const rightTreeNode = Object.assign({}, child);
            rightTreeNode.Children = [];
            const innerNode = traverse(child, leftTreeNode, rightTreeNode, leaf, offset, index, depth + 1);
            if (Array.isArray(innerNode)) {
                if (!isNodeEmpty(innerNode[0]))
                    left.Children.push(innerNode[0]);
                if (!isNodeEmpty(innerNode[1]))
                    right.Children.push(innerNode[1]);
            }
            else if (splitFound) {
                if (path[depth + 1] === foundPath[depth + 1])
                {
                    if (!isNodeEmpty(leftTreeNode))
                        left.Children.push(leftTreeNode);
                }
                if (!isNodeEmpty(rightTreeNode))
                    right.Children.push(rightTreeNode);
            } else {
                if (!isNodeEmpty(leftTreeNode))
                    left.Children.push(leftTreeNode);
            }
            index++;
        }

        return null;

    }

    traverse(root, leftTree, rightTree, leafNode, offset, 0, 0);
  
    return [leftTree, rightTree];  
  
  }

  export default splitTree;