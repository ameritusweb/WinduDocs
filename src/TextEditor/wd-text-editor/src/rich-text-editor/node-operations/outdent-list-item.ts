import { AstNode } from "../../components/wysiwyg/interface";

const outdentListItem = (ast: AstNode, itemIndex: number): AstNode | null => {
  // Check if the operation is valid
  if (ast.NodeName !== 'ListBlock' || itemIndex >= ast.Children.length) {
    console.error('Invalid operation: Cannot outdent a non-existing item.');
    return null;
  }

  const targetListItem = ast.Children[itemIndex];

  // Remove the targetListItem from its current place
  ast.Children.splice(itemIndex, 1);

  // Determine where to place the outdented item
  const insertIndex = itemIndex + 1;

  // Insert the outdented item back into the list at the determined position
  ast.Children.splice(insertIndex, 0, targetListItem);
  
  // Adjust the Depth of the targetListItem to represent it being outdented
  targetListItem.Depth -= 1;

  // Return the modified AST
  return ast;
};

export default outdentListItem;