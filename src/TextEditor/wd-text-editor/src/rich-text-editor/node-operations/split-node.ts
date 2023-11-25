import { generateKey } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const splitNode = (node: AstNode, index: number, childIndex?: number, rightNodeGuid?: string): [AstNode, AstNode, AstNode] => {

    if (childIndex !== undefined)
    {
      const [childLeftNode, childRightNode] = splitNode(node.Children[childIndex], index, undefined, rightNodeGuid);
      
      const leftNode: AstNode = {
        ...node,
        Children: [...node.Children.slice(0, childIndex), childLeftNode],
        Guid: node.Guid
      };

      const newLine: AstNode = {
        ...node,
        TextContent: '\n',
        Guid: generateKey()
      };

      const rightNode: AstNode = {
        ...node,
        Children: [childRightNode, ...node.Children.slice(childIndex + 1)],
        Guid: generateKey()
      };

      return [leftNode, rightNode, newLine];
    }

    if (!node.TextContent || node.TextContent.length === 0) {
      throw new Error("Node does not have text content or the content is empty.");
    }
  
    if (index < 0 || index > node.TextContent.length) {
      throw new Error("Index is out of bounds.");
    }
  
    const leftText = node.TextContent.substring(0, index);
    const rightText = node.TextContent.substring(index);
  
    const leftNode: AstNode = {
      ...node,
      TextContent: leftText,
      Guid: node.Guid
    };

    const newLine: AstNode = {
      ...node,
      TextContent: '\n',
      Guid: generateKey()
    };
  
    const rightNode: AstNode = {
      ...node,
      TextContent: rightText,
      Guid: rightNodeGuid || generateKey()
    };
  
    return [leftNode, rightNode, newLine];
  }

  export default splitNode;