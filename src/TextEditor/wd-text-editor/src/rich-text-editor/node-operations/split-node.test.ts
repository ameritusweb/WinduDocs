import { cleanup } from '../../utils/test-utils'
import { createNewAstNode, splitNode } from '../node-operations';

afterEach(() => {
    cleanup();
  });
  
  describe('split-node', () => {
    it('splits a text node correctly', () => {
        const node = createNewAstNode('Text', 0, 0, 'Test content');
        const index = 6; 
    
        const [leftNode, rightNode, newLine] = splitNode(node, index);
    
        expect(leftNode.TextContent).toBe('Test c'); 
        expect(rightNode.TextContent).toBe('ontent'); 
        
      });
  })