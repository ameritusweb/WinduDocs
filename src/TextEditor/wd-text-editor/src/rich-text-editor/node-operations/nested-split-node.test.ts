import { vi } from 'vitest';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, nestedSplitNode } from '.';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('nested-split-node', () => {
    it('splits a node with child correctly', () => {
        const mockNodeWithChildren = {
            ...createNewAstNode('ParagraphBlock', 0, 0, null),
            Guid: '1',
            Children: [
              { ...createNewAstNode('Text', 0, 0, 'Hello'), Guid: '2', Children: [] },
            ]
          };
          
        const offset = 2; // Splitting after 'He'
        const [leftNode, rightNode, newLine] = nestedSplitNode(mockNodeWithChildren, offset);
        expect(leftNode.Children).toHaveLength(1);
        expect(leftNode.Children[0].TextContent).toBe('He');
        expect(rightNode.Children).toHaveLength(1);
        expect(rightNode.Children[0].TextContent).toBe('llo');
        // Additional assertions...
      });

      it('splits a node with children correctly', () => {
        const mockNodeWithChildren = {
            ...createNewAstNode('ParagraphBlock', 0, 0, null),
            Guid: '1',
            Children: [
              { ...createNewAstNode('Text', 0, 0, 'Hello'), Guid: '2', Children: [] },
              { ...createNewAstNode('Text', 0, 0, 'World'), Guid: '3', Children: [] }
            ]
          };
          
        const offset = 7; // Splitting after 'Hello'
        const [leftNode, rightNode, newLine] = nestedSplitNode(mockNodeWithChildren, offset);
        expect(leftNode.Children).toHaveLength(2);
        expect(leftNode.Children[0].TextContent).toBe('Hello');
        expect(leftNode.Children[1].TextContent).toBe('Wo');
        expect(rightNode.Children).toHaveLength(1);
        expect(rightNode.Children[0].TextContent).toBe('rld');
        // Additional assertions...
      });

  })