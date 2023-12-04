import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { AstNode, AstNodeAttributes, AstNodeBase, Idable, IdableNode, Simplifiable, TestData } from '../components/wysiwyg/interface'
import { generateKey } from '../rich-text-editor/node-operations'

afterEach(() => {
  cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
  return render(ui, {
    
    wrapper: ({ children }) => children,
    ...options,
  })
}

interface CustomNode {
  nodeName: string;
  id?: string;
  textContent?: string;
  childNodes?: CustomNode[];
}

export const mockCustomElement = (node: CustomNode): IdableNode => {
  let element: IdableNode | Text;

  if (node.nodeName === '#text') {
    element = document.createTextNode(node.textContent || '');
  } else {
    element = document.createElement(node.nodeName) as HTMLElement;
    node.id && (element.id = node.id);
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
  
  const parent = document.getElementById(parentId);
  if (parent) {

    
    const textNode = parent.childNodes[0];
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      throw new Error('No text node found for the specified element');
    }

    
    const range = document.createRange();

    if (!textNode.textContent)
      throw new Error('No text content found for text node.');

    if ((textNode.textContent?.length || 0) < (endOffset - 1))
      throw new Error(`Range out of bounds for text node of length: ${textNode.textContent?.length}`);

    
    range.setStart(textNode, startOffset);
    range.setEnd(textNode, endOffset);

    
    const selection = window.getSelection();
    if (selection) {

      
      selection.removeAllRanges();

      
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

  export const safeMatch = <T extends object>(keys: Array<keyof T>): ((obj1: Simplifiable<TestData>, obj2: Simplifiable<TestData>) => boolean) => {
  return (obj1, obj2) => {
      // Recursive function to compare objects including their Children
      function compareObjects(o1: Simplifiable<TestData>, o2: Simplifiable<TestData>): boolean {
          for (let key of keys) {
              if (typeof key === 'string') {
                if ((key in o1) && (key in o2)) {        
                  if (o1[key] !== o2[key]) {
                    console.warn(`Values for ${key}, ${o1[key]} and ${o2[key]} do not match.`);
                    return false;
                  }
              }
            }
          }

          // Special handling for Children property
          const hasChildren1 = 'Children' in o1 && Array.isArray(o1.Children);
          const hasChildren2 = 'Children' in o2 && Array.isArray(o2.Children);

          if (hasChildren1 || hasChildren2) {
              if (!hasChildren1 || !hasChildren2) {
                  console.warn(`One has Children and the other does not.`);
                  return false; // One object has Children, the other doesn't
              }
              if (Array.isArray(o1.Children) && Array.isArray(o2.Children)) {
                if (o1.Children.length !== o2.Children.length) {
                    console.warn(`Children arrays are of different lengths.`);
                    return false; // Children arrays are of different lengths
                }
                for (let i = 0; i < o1.Children.length; i++) {
                    if (!compareObjects(o1.Children[i], o2.Children[i])) {
                        return false;
                    }
                }
            }
          }

          return true;
      }

      return compareObjects(obj1, obj2);
  };
}

export const safeSimplify = <T extends object>(keys: Array<keyof T>): ((obj: Partial<T>) => Simplifiable<Partial<T>>) => {
  return (obj) => {
      // Recursive function to simplify the object
      function simplifyObject(o: Partial<T>): Simplifiable<Partial<T>> {
          let simplified: Simplifiable<Partial<T>> = {};

          if (!o)
          {
            console.log('not defined');
          }

          // Include specified keys
          for (let key of keys) {
              if (key in o) {
                  // Using type assertion
                  simplified[key] = o[key] as any;
              }
          }

          // Special handling for Children property
          if ('Children' in o && Array.isArray(o.Children)) {
              const val = o.Children.map(child => simplifyObject(child as any));
              if (val.length > 0)
              {
                simplified.Children = val;
              }
          }

          return simplified;
      }

      return simplifyObject(obj as Partial<T>);
  };
}

export const createSimplifiedObject = <T extends object>(obj: { [key: string]: any }, keys: Array<keyof T>): { [innerKey: string]: Simplifiable<Partial<T>> | Simplifiable<Partial<T>>[] } => {
  // Reusing the simplifyObject function from safeSimplify
  const simplify = safeSimplify(keys);
  
  let output: { [innerKey: string]: Simplifiable<Partial<T>> | Simplifiable<Partial<T>>[] } = {};

  function isPrimitive(value: any) {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
  }

  for (const key in obj) {
      if (Array.isArray(obj[key])) {
          // If the value is an array, simplify each element of the array
          const val = (obj[key] as Array<Partial<T>>).map(element => simplify(element));
          if (val.length > 0)
          {
            output[key] = val;
          }
      } else if (isPrimitive(obj[key])) {
        output[key] = obj[key];
      } else {
          // If the value is an object, simplify the object
          output[key] = simplify(obj[key] as Partial<T>);
      }
  }

  return output;
};

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

export { customRender as render }
