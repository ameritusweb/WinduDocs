import { findNodeById } from '..';
import { mockAstData, mockListData } from '../../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../../utils/test-utils'

afterEach(() => {
    cleanup();
  });
  
  describe('findNodeById', () => {
    it('finds the correct node by ID', () => {
        // Mock AST structure
        const mockAst = mockAstData;
    
        // Test if the function correctly finds a node
        const foundNode = findNodeById(mockAst, '2a2c1af5-8ee8-4963-b888-50788959963f');
        expect(foundNode).not.toBeNull();
        expect(foundNode?.Guid).toBe('2a2c1af5-8ee8-4963-b888-50788959963f');
      });
    
      it('returns null if no node is found', () => {

        const mockAst = mockListData[0];

        // Using the same mock AST structure as above
        const notFoundNode = findNodeById(mockAst, 'nonexistent');
        expect(notFoundNode).toBeNull();
      });
  })