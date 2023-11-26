import { replaceText } from '.';
import { mockAstData, mockListData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'

afterEach(() => {
    cleanup();
  });
  
  describe('replace-text', () => {
    it('correctly replaces text in a non-empty container', () => {
        const container = { textContent: 'Hello World' } as any;
        const child = { NodeName: 'P', Guid: '123456', Children:[], Attributes: {}, ChildIndex: 0, Depth: 0, TextContent: '' };
        replaceText(container, child, 6, 'Test');
    
        expect(child.TextContent).toBe('Hello TestWorld');
      });
    
      it('adds text in an empty container', () => {
        const container = { textContent: '\n' } as any;
        const child = { NodeName: 'P', Guid: '123456', Children:[], Attributes: {}, ChildIndex: 0, Depth: 0, TextContent: '' };
        replaceText(container, child, 0, 'New Text');
    
        expect(child.TextContent).toBe('New Text');
      });
  })