import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { Idable, IdableNode } from '../components/wysiwyg/interface'

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

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
