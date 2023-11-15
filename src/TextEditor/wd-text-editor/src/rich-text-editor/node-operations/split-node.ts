import { AstNode } from "../../../components/wysiwyg/interface";

const splitNode = (node: AstNode, index: number): [AstNode, AstNode] => {
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
    };
  
    const rightNode: AstNode = {
      ...node,
      TextContent: rightText,
    };
  
    return [leftNode, rightNode];
  }

  export default splitNode;