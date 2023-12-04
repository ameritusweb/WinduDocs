import { AstNode } from "./wysiwyg/interface";


export const domToAstMap = new Map<Element, AstNode[][]>();


export function astContext(domElement: Element): AstNode[] | undefined {
  return (domToAstMap.get(domElement) || [])[0];
}

export function astHigherLevelContext(domElement: Element): AstNode[] | undefined {
    return (domToAstMap.get(domElement) || [])[1];
  }