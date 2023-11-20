import { AstNode } from "./wysiwyg/interface";

// Map DOM elements to AST nodes
export const domToAstMap = new Map<Element, AstNode[][]>();

// Function to get AST node from a DOM element
export function astContext(domElement: Element): AstNode[] | undefined {
  return (domToAstMap.get(domElement) || [])[0];
}

export function astHigherLevelContext(domElement: Element): AstNode[] | undefined {
    return (domToAstMap.get(domElement) || [])[1];
  }