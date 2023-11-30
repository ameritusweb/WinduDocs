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
        const sameNode = mockAst[0].Children[0]; // Assuming this is the node we are targeting
        const leftOffset = 5;
        const rightOffset = 9;
    
        // Execute the function
        const [leftTree, rightTree, extractedText] = splitTreeAndExtractSpan(mockAst, sameNode, leftOffset, sameNode, rightOffset);
    
        // Assertions
        expect(leftTree).toBeInstanceOf(Array);
        expect(rightTree).toBeInstanceOf(Array);
        expect(extractedText).toBe('is a'); // Extracted text should be 'is a'
      });

    it('should throw an error for negative offsets', () => {
        // Setup your nodes (you can use any valid nodes from your mock AST)
        const mockAst = mockParagraphData;
        const leftNode = mockAst[0]; // Assuming the first node is a valid choice
        const rightNode = mockAst[1]; // Assuming the second node is a valid choice
    
        // Negative offsets
        const leftOffset = -1;
        const rightOffset = -1;
    
        // Expect an error to be thrown for negative offsets
        expect(() => splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, rightNode, rightOffset))
          .toThrow('Invalid offset: Offsets must be non-negative');
      });

    it('should handle non-existent leftNode or rightNode', () => {
        // Setup for a non-existent leftNode
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
    
        // Expect an error or specific behavior when leftNode doesn't exist
        const res1 = splitTreeAndExtractSpan(mockAst, nonExistentLeftNode, leftOffset, rightNode, rightOffset);
        expect(res1).toStrictEqual([null, null, '']);

        // Setup for a non-existent rightNode
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
    
        // Expect an error or specific behavior when rightNode doesn't exist
        const res2 = splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, nonExistentRightNode, rightOffset);
        expect(res2).toStrictEqual([null, null, '']);
      });

    it('should correctly handle nodes at different depths', () => {
        const mockAst = mockParagraphData;
        const leftNode = mockAst[0].Children[0]; // Text node inside first paragraph
        const rightNode = mockAst[1]; // Second paragraph
        const leftOffset = 5; // End of 'This is a '
        const rightOffset = 8; // End of 'Another'
    
        const [leftTree, rightTree, extractedText] = splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, rightNode, rightOffset);
    
        expect(leftTree).toBeInstanceOf(Array);
        expect(rightTree).toBeInstanceOf(Array);
        expect(extractedText).toBe('is a paragraph with both bold and italic textThis is ');
      });
  
    it('should return an empty string for extracted text when there is no text content in the span', () => {
      // Set up your nodes and offsets for a span with no text content
      const mockAst = mockParagraphData;
      const leftNode = mockAst[0].Children[0]; // Node with "This is a paragraph with "
      const rightNode = mockAst[0].Children[0]; // Same node
      const leftOffset = leftNode.TextContent?.length || 0;
      const rightOffset = leftNode.TextContent?.length || 0;
  
      // Call your function
      const [leftTree, rightTree, extractedText] = splitTreeAndExtractSpan(mockAst, leftNode, leftOffset, rightNode, rightOffset);
  
      // Assert that extracted text is an empty string
      expect(extractedText).toBe('');
    });
  
    // ... other test cases
  });