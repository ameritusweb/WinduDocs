import { replaceText } from '.';
import { cleanup } from '../../utils/test-utils'

afterEach(() => {
    cleanup();
  });
  
  describe('replace-text', () => {
    it('correctly replaces text in a non-empty container', () => {
        const container = { textContent: 'Hello World' } as Partial<Node>;
        const child = { NodeName: 'P', Guid: '123456', Children:[], Attributes: {}, ChildIndex: 0, Depth: 0, TextContent: '' };
        replaceText(container as Node, child, 6, 'Test');
    
        expect(child.TextContent).toBe('Hello TestWorld');
      });
    
      it('adds text in an empty container', () => {
        const container = { textContent: '\n' } as Partial<Node>;
        const child = { NodeName: 'P', Guid: '123456', Children:[], Attributes: {}, ChildIndex: 0, Depth: 0, TextContent: '' };
        replaceText(container as Node, child, 0, 'New Text');
    
        expect(child.TextContent).toBe('New Text');
      });
  })