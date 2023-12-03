import { vi } from 'vitest';
import { createNewAstNode, deepCopyAstNode, updateHigherLevelNodes } from '.';
import { mockTableCellData } from '../../__mocks__/editor-mocks';
import { IHistoryManagerRecorder } from '../../components/wysiwyg/interface';
import { cleanup } from '../../utils/test-utils'

afterEach(() => {
    cleanup();
  });

describe('update-higher-level-nodes', () => {

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

    it('returns null for an invalid index', () => {
        const result = updateHigherLevelNodes(-1, [], [], mockHistoryManager, null, 0);
        expect(result).toBeNull();
      });
    
      it('inserts nodes at the beginning when insertAt is not specified', () => {
        const higherLevelChildren = mockTableCellData.map(c => deepCopyAstNode(c));
        const newNodes = [ createNewAstNode('Text', 0, 0, 'Hello World') ];
        const result = updateHigherLevelNodes(0, higherLevelChildren, higherLevelChildren[0].Children, mockHistoryManager, newNodes, 0);
        expect(result).not.toBe(null);
        expect(result![0].Children[0].TextContent).toEqual('Hello World');
      });
    
      it('inserts nodes at the end when insertAt is "end"', () => {
        const higherLevelChildren = mockTableCellData.map(c => deepCopyAstNode(c));
        const newNodes = [ createNewAstNode('Text', 0, 0, 'Hello World') ];
        const result = updateHigherLevelNodes(0, higherLevelChildren, higherLevelChildren[0].Children, mockHistoryManager, newNodes, 0, 'end');
        expect(result).not.toBe(null);
        expect(result![0].Children[1].TextContent).toEqual('Hello World');
      });

})