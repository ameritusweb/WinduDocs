import { splitTreeAndExtractSpan } from ".";
import { mockParagraphData, mockStrongData } from "../../__mocks__/editor-mocks";
import { AstNode } from "../../components/wysiwyg/interface";

describe('splitTreeAndExtractSpan', () => {
    
    it('should correctly extract text between two nodes', () => {
        const mockAst = mockStrongData;
        const leftNode = mockAst[0];
        const rightNode = mockAst[2];
        const leftOffset = 3;
        const rightOffset = 2;
    
        const [leftTree, rightTree, extractedText] = splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, rightNode, rightOffset);
    
        expect(leftTree).toBeInstanceOf(Array);
        expect(rightTree).toBeInstanceOf(Array);
        expect(extractedText).toBe('s is a paragraph with both bold and italic t');
      });

      it('should correctly extract text when leftNode and rightNode are the same', () => {
        const mockAst = mockParagraphData;
        const sameNode = mockAst[0].Children[0]; 
        const leftOffset = 5;
        const rightOffset = 9;
    
        
        const [leftTree, rightTree, extractedText] = splitTreeAndExtractSpan(mockAst, sameNode, leftOffset, sameNode, rightOffset);
    
        
        expect(leftTree).toBeInstanceOf(Array);
        expect(rightTree).toBeInstanceOf(Array);
        expect(extractedText).toBe('is a'); 
      });

    it('should throw an error for negative offsets', () => {
        
        const mockAst = mockParagraphData;
        const leftNode = mockAst[0]; 
        const rightNode = mockAst[1]; 
    
        
        const leftOffset = -1;
        const rightOffset = -1;
    
        
        expect(() => splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, rightNode, rightOffset))
          .toThrow('Invalid offset: Offsets must be non-negative');
      });

    it('should handle non-existent leftNode or rightNode', () => {
        
        const mockAst = mockParagraphData;
        const nonExistentLeftNode: AstNode = {
            NodeName: 'ParagraphBlock',
            Attributes: {},
            ChildIndex: 0,
            Depth: 1,
            Guid: '12345',
            TextContent: 'This is a test paragraph',
            Children: []
        };
        const rightNode: AstNode = mockAst[1];
        const leftOffset = 5;
        const rightOffset = 5;
    
        
        const res1 = splitTreeAndExtractSpan(mockAst, nonExistentLeftNode, leftOffset, rightNode, rightOffset);
        expect(res1).toStrictEqual([null, null, '']);

        
        const leftNode: AstNode = mockAst[0].Children[0];
        const nonExistentRightNode: AstNode = {
            NodeName: 'ParagraphBlock',
            Attributes: {},
            ChildIndex: 0,
            Depth: 1,
            Guid: '12345',
            TextContent: 'This is a test paragraph',
            Children: []
        };
    
        
        const res2 = splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, nonExistentRightNode, rightOffset);
        expect(res2).toStrictEqual([null, null, '']);
      });

    it('should correctly handle nodes at different depths', () => {
        const mockAst = mockParagraphData;
        const leftNode = mockAst[0].Children[0]; 
        const rightNode = mockAst[1]; 
        const leftOffset = 5; 
        const rightOffset = 8; 
    
        const [leftTree, rightTree, extractedText] = splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, rightNode, rightOffset);
    
        expect(leftTree).toBeInstanceOf(Array);
        expect(rightTree).toBeInstanceOf(Array);
        expect(extractedText).toBe('is a paragraph with both bold and italic textThis is ');
      });
  
    it('should return an empty string for extracted text when there is no text content in the span', () => {
      
      const mockAst = mockParagraphData;
      const leftNode = mockAst[0].Children[0]; 
      const rightNode = mockAst[0].Children[0]; 
      const leftOffset = leftNode.TextContent?.length || 0;
      const rightOffset = leftNode.TextContent?.length || 0;
  
      
      const [leftTree, rightTree, extractedText] = splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, rightNode, rightOffset);
  
      
      expect(extractedText).toBe('');
    });
  
    
  });