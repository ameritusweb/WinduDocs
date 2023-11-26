import { vi } from 'vitest';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, isNodeEmpty } from '.';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('is-node-empty', () => {
    it('returns true for an empty node', () => {
        const emptyNode =  { ...createNewAstNode('Text', 0, 0, null), TextContent: '', Children: [] };
        expect(isNodeEmpty(emptyNode)).toBe(true);
      });
    
      it('returns false for a node with text content', () => {
        const nodeWithText = { ...createNewAstNode('Text', 0, 0, null), TextContent: 'Some text', Children: [] };
        expect(isNodeEmpty(nodeWithText)).toBe(false);
      });
    
      it('returns false for a node with children', () => {
        const nodeWithChildren = { ...createNewAstNode('Text', 0, 0, null), TextContent: '', Children: [createNewAstNode('Text', 0, 0, null)] };
        expect(isNodeEmpty(nodeWithChildren)).toBe(false);
      });
  })