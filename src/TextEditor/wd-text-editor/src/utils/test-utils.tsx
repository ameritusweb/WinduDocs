import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { AstNode, AstNodeAttributes, AstNodeBase, Idable, IdableNode } from '../components/wysiwyg/interface'
import { generateKey } from '../rich-text-editor/node-operations'

afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => children,
    ...options,
  })
}

interface CustomNode {
  nodeName: string;
  textContent?: string;
  childNodes?: CustomNode[];
}

export const mockCustomElement = (node: CustomNode): IdableNode => {
  let element: IdableNode | Text;

  if (node.nodeName === '#text') {
    element = document.createTextNode(node.textContent || '');
  } else {
    element = document.createElement(node.nodeName) as HTMLElement;
    element.textContent = node.textContent || null;

    if (node.childNodes) {
      node.childNodes.forEach(childNode => {
        const childElement = mockCustomElement(childNode);
        element.appendChild(childElement);
      });
    }
  }

  return element as Node & Idable;
};

export const removeEmptyTextNodes = (element: HTMLElement) => {
  Array.from(element.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node instanceof Text && !(node.textContent || '').trim() && node.textContent !== '\n') {
      element.removeChild(node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      removeEmptyTextNodes(node as HTMLElement);
    }
  });
}

export const selectText = (parentId: string, startOffset: number, endOffset: number) => {
  // Find the parent element by its ID
  const parent = document.getElementById(parentId);
  if (parent) {

    // Assume the first child node is the text node we want
    const textNode = parent.childNodes[0];
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      throw new Error('No text node found for the specified element');
    }

    // Create a new range
    const range = document.createRange();

    if (!textNode.textContent)
      throw new Error('No text content found for text node.');

    if ((textNode.textContent?.length || 0) < (endOffset - 1))
      throw new Error(`Range out of bounds for text node of length: ${textNode.textContent?.length}`);

    // Set the start and end of the range
    range.setStart(textNode, startOffset);
    range.setEnd(textNode, endOffset);

    // Get the current selection
    const selection = window.getSelection();
    if (selection) {

      // Remove all ranges from the current selection
      selection.removeAllRanges();

      // Add the new range to the selection
      selection.addRange(range);
    }
  }
}

const defaultAstNode: AstNode = {
  NodeName: 'defaultName',
  Attributes: {},
  ChildIndex: 0,
  Guid: generateKey(),
  Depth: 0,
  TextContent: null,
  Children: [],
};

export type PartialAst = Partial<PartialAstNode>;

export interface PartialAstNode extends AstNodeBase {
  Children: PartialAst[];
}

export const toMockAstArray = (mockNodes: PartialAst[], depth: number = 0): AstNode[] => {
  return mockNodes.map((node, index) => toMockAst(node, depth, index));
};

export const toMockAst = (mockNode: PartialAst, depth = 0, childIndex = 0): AstNode => {
  return {
    ...defaultAstNode,
    ...mockNode,
    Depth: depth,
    ChildIndex: childIndex,
    Children: mockNode.Children?.map((child, index) => 
      toMockAst(child as PartialAstNode, depth + 1, index)
    ) || [],
  };
};

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
