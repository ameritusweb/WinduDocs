import { vi } from 'vitest';
import { mockStrongData } from '../../__mocks__/editor-mocks';
import { IHistoryManagerRecorder } from '../../components/wysiwyg/interface';
import { cleanup } from '../../utils/test-utils'
import { createNewAstNode, deepCopyAstNode, splitAndUpdateHigherLevelNodes, splitNode } from '../node-operations';

afterEach(() => {
    cleanup();
  });
  
  describe('split-and-update-higher-level-nodes', () => {
    it('splits a text node correctly', () => {
        const higherLevelNodes = mockStrongData.map(c => deepCopyAstNode(c));
        const node = createNewAstNode('Text', 0, 0, 'Test content');
        const index = 0; // Example index
        const startOffset = 6;
        const indexToSplit = undefined;
        const indexToRemoveAndAdd = 0;
        const type = 'Text';
        const key = 'Text Content';
        const containerIndex = 0;
        const mockHistoryManager: IHistoryManagerRecorder = {
          recordChildReplace: vi.fn(),
          recordChildTextUpdate: vi.fn(),
          recordOperation: vi.fn(),
          recordOperationsAsTransaction: vi.fn(),
          recordChildInsertBefore: vi.fn(),
          recordChildInsertAfter: vi.fn(),
          recordChildRemoveBefore: vi.fn(),
          recordChildRemoveAfter: vi.fn(),
      };
    
        const nodes = splitAndUpdateHigherLevelNodes(index, node, startOffset, mockHistoryManager, indexToSplit, indexToRemoveAndAdd, type, key, [ node ], higherLevelNodes, containerIndex, false);
    
        expect(nodes[index].Children[0].TextContent).toBe('Test c');
      });
  })