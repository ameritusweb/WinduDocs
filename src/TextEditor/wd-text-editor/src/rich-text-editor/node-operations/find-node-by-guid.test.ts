import { vi } from 'vitest';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, findNodeByGuid, generateKey, indentListItem, isNodeEmpty } from '.';
import { AstNode } from '../../components/wysiwyg/interface';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('find-node-by-guid', () => {
        const mockNodes: AstNode[] = [
            // Mock AST structure
            { ...createNewAstNode('Text', 0, 0, null), Guid: 'node1', Children: [] },
            { ...createNewAstNode('ParagraphBlock', 0, 0, null), Guid: 'node2', Children: [{ ...createNewAstNode('Text', 0, 0, null), Guid: 'child1', Children: [] }] },
            // Add more nodes as necessary
        ];
    
      it('finds a top-level node by GUID', () => {
        const [node, parent, immediateChild] = findNodeByGuid(mockNodes, 'node1', null);
        expect(node?.Guid).toBe('node1');
        expect(parent).toBeNull();
        expect(immediateChild?.Guid).toBe('node1');
      });
    
      it('finds a nested node by GUID', () => {
        const [node, parent, immediateChild] = findNodeByGuid(mockNodes, 'child1', null);
        expect(node?.Guid).toBe('child1');
        expect(parent?.Guid).toBe('node2');
        expect(immediateChild?.Guid).toBe('node2');
      });
    
      it('returns null for an unfound GUID', () => {
        const [node, parent, immediateChild] = findNodeByGuid(mockNodes, 'unknown', null);
        expect(node).toBeNull();
        expect(parent).toBeNull();
        expect(immediateChild).toBeNull();
      });
  })