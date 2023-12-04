import { vi } from 'vitest';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, indentListItem, isNodeEmpty } from '.';
import { AstNode } from '../../components/wysiwyg/interface';
import { mockListData } from '../../__mocks__/editor-mocks';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('indent-list-item', () => {
    it('correctly indents a list item', () => {
        const mockListBlock: AstNode = { ...createNewAstNode('ListBlock', 0, 0, null), Children: mockListData };
    
        const result = indentListItem(mockListBlock, 1); 
        expect(result).not.toBeNull();
        
      });
  })