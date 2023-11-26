import { removeText } from '.';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode } from '../node-operations';

afterEach(() => {
    cleanup();
  });
  
  describe('remove-text', () => {
    it('removes the specified text range', () => {
        // Mock the container node
        const container = document.createTextNode("Hello World");
        
        // Mock the AstNode
        const child = createNewAstNode('Text', 0, 0, 'Hello World');
    
        // Call the function with start and end indices
        removeText(container, child, 6, 11);
    
        // Assert that TextContent is updated correctly
        expect(child.TextContent).toBe("Hello ");
      });

      it('removes the specified text range from the beginning', () => {
        // Mock the container node
        const container = document.createTextNode("Hello World");
        
        // Mock the AstNode
        const child = createNewAstNode('Text', 0, 0, 'Hello World');
    
        // Call the function with start and end indices
        removeText(container, child, 0, 6);
    
        // Assert that TextContent is updated correctly
        expect(child.TextContent).toBe("World");
      });

      it('removes a character when start and end are equal', () => {
        const container = document.createTextNode("Hello World");
        const child = createNewAstNode('Text', 0, 0, 'Hello World');
        removeText(container, child, 7, 7);
        expect(child.TextContent).toBe("Hello orld");
      });
  })