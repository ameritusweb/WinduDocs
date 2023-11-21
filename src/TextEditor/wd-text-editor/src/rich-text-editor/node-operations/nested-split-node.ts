import { generateKey } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const nestedSplitNode = (node: AstNode, offset: number, depth: number = 0): [AstNode, AstNode, AstNode] => {
        // Internal recursive function to traverse depth-first
  const findChildToSplit = (currentNode: AstNode, currentOffset: number, currentDepth: number): [number, number, number] => {
    if (currentNode.TextContent) {
      const length = currentNode.TextContent.length;
      if (currentOffset <= length) {
        // Offset is within the current node
        return [currentOffset, currentDepth, currentDepth === 0 ? -1 : 0];
      } else {
        // Decrease offset and continue depth-first search
        currentOffset -= length;
      }
    }

    for (let i = 0; i < currentNode.Children.length; i++) {
      const [newOffset, newDepth, childIndex] = findChildToSplit(currentNode.Children[i], currentOffset, currentDepth + 1);
      if (newDepth > currentDepth) {
        // Found the correct level to split
        return [newOffset, newDepth, i];
      }
      currentOffset = newOffset;
    }

    // No child to split found at this level
    return [currentOffset, currentDepth, -1];
  };

  const [newOffset, newDepth, childIndexToSplit] = findChildToSplit(node, offset, depth);

  if (newDepth === depth && childIndexToSplit === -1) {
    throw new Error("Offset is beyond the total text content length.");
  }

  if (newDepth > depth) {
    // Recurse into the child node to perform the split
    const [leftChild, rightChild, newLine] = nestedSplitNode(node.Children[childIndexToSplit], newOffset, newDepth);
    return [
      {
        ...node,
        Children: [...node.Children.slice(0, childIndexToSplit), leftChild],
        Guid: node.Guid
      },
      {
        ...node,
        Children: [rightChild, ...node.Children.slice(childIndexToSplit + 1)],
        Guid: generateKey()
      },
      newLine
    ];
  }

  // Splitting the current node
  const leftNode: AstNode = {
    ...node,
    TextContent: node.TextContent ? node.TextContent.substring(0, newOffset) : null,
    Children: node.Children.slice(0, childIndexToSplit),
    Guid: node.Guid
  };

  const rightNode: AstNode = {
    ...node,
    TextContent: node.TextContent ? node.TextContent.substring(newOffset) : null,
    Children: node.Children.slice(childIndexToSplit),
    Guid: generateKey()
  };

  const newLine: AstNode = {
    ...node,
    TextContent: '\n',
    Guid: generateKey()
  };

  return [leftNode, rightNode, newLine];
};

  export default nestedSplitNode;