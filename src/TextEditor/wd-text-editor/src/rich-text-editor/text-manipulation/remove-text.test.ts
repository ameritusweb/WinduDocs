import { removeText } from '.';
import { cleanup } from '../../utils/test-utils'
import { createNewAstNode } from '../node-operations';

afterEach(() => {
    cleanup();
  });
  
  describe('remove-text', () => {
    it('removes the specified text range', () => {
        
        const container = document.createTextNode("Hello World");
            
        const child = createNewAstNode('Text', 0, 0, 'Hello World');
    
        removeText(container, child, 6, 11);
        
        expect(child.TextContent).toBe("Hello ");
      });

      it('removes the specified text range from the beginning', () => {
        
        const container = document.createTextNode("Hello World");
            
        const child = createNewAstNode('Text', 0, 0, 'Hello World');
    
        removeText(container, child, 0, 6);
        
        expect(child.TextContent).toBe("World");
      });

      it('removes a character when start and end are equal', () => {
        const container = document.createTextNode("Hello World");
        const child = createNewAstNode('Text', 0, 0, 'Hello World');
        removeText(container, child, 7, 7);
        expect(child.TextContent).toBe("Hello orld");
      });
  })