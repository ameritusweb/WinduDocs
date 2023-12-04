import { generateKey } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const indentListItem = (ast: AstNode, itemIndex: number): AstNode | null => {
    if (ast.NodeName !== "ListBlock" || ast.Children.length <= itemIndex || itemIndex === 0) {
      console.error("Invalid operation");
      return null;
    }
  
    const targetListItem = ast.Children[itemIndex];
    const previousListItem = ast.Children[itemIndex - 1];
  
    
    ast.Children.splice(itemIndex, 1);
  
    
    let innerListBlock = previousListItem.Children.find(child => child.NodeName === "ListBlock");
    if (!innerListBlock) {
      innerListBlock = {
        NodeName: "ListBlock",
        Attributes: { IsOrdered: ast.Attributes.IsOrdered },
        ChildIndex: previousListItem.Children.length,
        Depth: previousListItem.Depth + 1,
        Guid: generateKey(),
        TextContent: null,
        Children: []
      };
      previousListItem.Children.push(innerListBlock);
    }
  
    
    innerListBlock.Children.push(targetListItem);

    return ast;
  }

  export default indentListItem;