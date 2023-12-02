import { vi } from 'vitest';
import { mockSplitTreeData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, isNodeEmpty, replaceKeys, splitNode } from '../node-operations';
import generateKey from './generate-key';

vi.mock('./generate-key', async () => {
    const actual = await vi.importActual("./generate-key") as typeof import("./generate-key");
    return {
      __esModule: true,
      default: vi.fn(() => 'mock-key')
    };
  });

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('replace-keys', () => {
    it('replaces Guids for all nodes', () => {
        const mockNode = {
          ...createNewAstNode('Text', 0, 0, 'TextNode'),
          Guid: 'guid',
          Children: [{ ...createNewAstNode('Text', 0, 0, 'TextNode'), Guid: 'child1', Children: [] }, 
            { ...createNewAstNode('Text', 0, 0, 'TextNode'), Guid: 'child2', Children: [] }]
        };
    
        const result = replaceKeys(mockNode);
    
        // Check the parent node
        expect(result.Guid).toBe('mock-key');
        // Check child nodes
        result.Children.forEach(child => {
          expect(child.Guid).toBe('mock-key');
        });
    
        // Check if generateKey was called correctly
        expect(generateKey).toHaveBeenCalledTimes(7); // Once for the parent and once for each child
      });
  })