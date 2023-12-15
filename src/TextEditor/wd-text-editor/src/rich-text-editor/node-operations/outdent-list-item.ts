import { AstNode } from "../../components/wysiwyg/interface";

const outdentListItem = (ast: AstNode, itemIndex: number): AstNode | null => {
  // Check if the operation is valid
  if (ast.NodeName !== 'ListBlock' || itemIndex >= ast.Children.length) {
    console.error('Invalid operation: Cannot outdent a non-existing item.');
    return null;
  }

  const targetListItem = ast.Children[itemIndex];

  const innerListBlock = targetListItem.Children[1];

  const innerListItem = innerListBlock.Children[innerListBlock.Children.length - 1];

  // Remove the targetListItem from its current place
  targetListItem.Children.splice(1, 1);

  // Insert the outdented item back into the list at the determined position
  ast.Children.splice(itemIndex + 1, 0, innerListItem);
  
  // Adjust the Depth of the targetListItem to represent it being outdented
  innerListItem.Depth -= 1;

  // Return the modified AST
  return ast;
};

export default outdentListItem;