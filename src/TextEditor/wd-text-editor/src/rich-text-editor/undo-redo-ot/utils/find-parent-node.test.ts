import { vi } from "vitest";
import { findParentNode } from "..";
import { AstNode } from "../../../components/wysiwyg/interface";
import { cleanup, toMockAst } from "../../../utils/test-utils";

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('findParentNode', () => {
    it('finds the correct parent node', () => {
      const mockAst: AstNode = toMockAst({
        Guid: 'root',
        Children: [
          {
            Guid: 'child1',
            Children: [{ Guid: 'grandchild1', Children: [] }]
          },
          {
            Guid: 'child2',
            Children: []
          }
        ]
      });
  
      const parent = findParentNode(mockAst, 'grandchild1');
      expect(parent).not.toBeNull();
      expect(parent?.Guid).toBe('child1');
    });
  
    it('returns null if parent is not found', () => {
      const mockAst = toMockAst({
        Guid: 'root',
        Children: [{ Guid: 'child1', Children: [] }]
      });
  
      const parent = findParentNode(mockAst, 'nonExistentChild');
      expect(parent).toBeNull();
    });
  
    // Add more test cases as needed
  });