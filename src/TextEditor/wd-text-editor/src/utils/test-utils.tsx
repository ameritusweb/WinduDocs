import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { AstNode, AstNodeBase, CustomNode, Idable, IdableNode, Simplifiable, TestData } from '../components/wysiwyg/interface'
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

export const mockCustomElement = (node: Partial<CustomNode>): IdableNode => {
  let element: IdableNode | Text;

  if (node.nodeName === '#text') {
    element = document.createTextNode(node.textContent || '');
  } else {
    element = document.createElement(node.nodeName || '') as HTMLElement;
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

    console.log(parent.outerHTML);
    const textNode = parent.childNodes[0];
    if (!textNode || textNode.nodeType !== Node.TEXT_NODE) {
      throw new Error('No text node found for the specified element');
    }

    
    const range = document.createRange();

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

export const selectTextRange = (startParentId: string, endParentId: string, startIndex: number, endIndex: number, startOffset: number, endOffset: number) => {
  const startParent = document.getElementById(startParentId);
  const endParent = document.getElementById(endParentId);
  
  if (!startParent) {
      throw new Error(`Start parent element with id ${startParentId} not found`);
  }

  if (!endParent) {
      throw new Error(`End parent element with id ${endParentId} not found`);
  }
  
  const startNode = startParent.childNodes[startIndex];
  const endNode = endParent.childNodes[endIndex];

  if (!startNode || startNode.nodeType !== Node.TEXT_NODE) {
      throw new Error('No text node found in the start parent element');
  }

  if (!endNode || endNode.nodeType !== Node.TEXT_NODE) {
      throw new Error('No text node found in the end parent element');
  }

  if (!startNode.textContent || !endNode.textContent) {
      throw new Error('One of the text nodes has no text content');
  }

  if (startNode.textContent.length < startOffset || endNode.textContent.length < endOffset) {
      throw new Error('Range out of bounds');
  }

  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);

  const selection = window.getSelection();
  if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
  }
};

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

export const getType = (value: any): string => {
  if (Array.isArray(value)) {
      return 'array';
  } else if (value === null) {
      return 'null';
  } else if (value === undefined) {
      return 'undefined';
  } else if (typeof value === 'object') {
      return 'object';
  } else {
      return typeof value;
  }
}

export const safeMatch = <T extends object>(keys: Array<keyof T>) => {
  const compareValues = (v1: any, v2: any, keys: Array<keyof T>): boolean => {
    if (Array.isArray(v1) && Array.isArray(v2)) {
      // Check if arrays are of the same length
      if (v1.length !== v2.length) {
          return false;
      }
      // Compare each element in the arrays
      for (let i = 0; i < v1.length; i++) {
          if (!compareValues(v1[i], v2[i], keys)) {
              return false;
          }
      }
      return true;
    } else if (isSimplifiable(v1) && isSimplifiable(v2)) {
        // Compare Simplifiable objects
        return compareObjects(v1, v2, keys);
    } else {
        // Direct comparison for other types
        return v1 === v2;
    }
  };

  const compareObjects = (o1: Simplifiable<T>, o2: Simplifiable<T>, keys: Array<keyof T>): boolean => {
      for (const key of keys) {
          if (key in o1 && key in o2) {
              if (!compareValues(o1[key], o2[key], keys)) {
                  console.warn(`Values for ${String(key)}, ${o1[key]} and ${o2[key]} do not match.`);
                  return false;
              }
          }
      }
      return compareChildren(o1, o2);
  };

  const compareChildren = (o1: Simplifiable<T>, o2: Simplifiable<T>): boolean => {
    const hasChildren1 = Array.isArray(o1.Children);
    const hasChildren2 = Array.isArray(o2.Children);

    if (hasChildren1 && hasChildren2) {
        if (o1.Children!.length !== o2.Children!.length) {
            console.warn(`Children arrays are of different lengths.`);
            return false; 
        }
        for (let i = 0; i < o1.Children!.length; i++) {
            if (!compareObjects(o1.Children![i], o2.Children![i], keys)) {
                return false;
            }
        }
    }
    return true;
};

  const isSimplifiable = (value: any): value is Simplifiable<Partial<T>> => {
      return value && typeof value === 'object' && !Array.isArray(value);
  };

  return (obj1: TestData, obj2: TestData) => {
      for (const key in obj1) {
          if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
              if (!compareValues(obj1[key], obj2[key], keys)) {
                  console.warn(`Top level values for ${key}, ${obj1[key]} and ${obj2[key]} do not match.`);
                  return false;
              }
          } else {
              console.warn(`One of the top level objects does not have the key ${key} of type ${obj1[key] ? getType(obj1[key]) : getType(obj2[key])}.`);
              return false;
          }
      }
      return true;
  };
};

export const safeSimplify = <T extends object>(keys: Array<keyof T>): ((obj: Partial<T>) => Simplifiable<Partial<T>>) => {
  return (obj) => {
      
      function simplifyObject(o: Partial<T>): Simplifiable<Partial<T>> {
          const simplified: Simplifiable<Partial<T>> = {};

          if (!o)
          {
            console.log('not defined');
          }

          
          for (const key of keys) {
              if (key in o) {
                  
                  simplified[key] = o[key] as any;
              }
          }

          
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
  
  const simplify = safeSimplify(keys);
  
  const output: { [innerKey: string]: Simplifiable<Partial<T>> | Simplifiable<Partial<T>>[] } = {};

  function isPrimitive(value: any) {
    return value === null || (typeof value !== 'object' && typeof value !== 'function');
  }

  for (const key in obj) {
      if (Array.isArray(obj[key])) {
          
          const val = (obj[key] as Array<Partial<T>>).map(element => simplify(element));
          if (val.length > 0)
          {
            output[key] = val;
          } else {
            output[key] = [];
          }
      } else if (isPrimitive(obj[key])) {
        output[key] = obj[key];
      } else {
          
          output[key] = simplify(obj[key] as Partial<T>);
      }
  }

  return output;
};

export { fireEvent, act, screen, cleanup, renderHook, waitFor } from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

export { customRender as render }
