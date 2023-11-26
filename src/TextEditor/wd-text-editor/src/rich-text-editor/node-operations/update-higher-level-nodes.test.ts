import { createNewAstNode, deepCopyAstNode, updateHigherLevelNodes } from '.';
import { mockTableCellData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'

afterEach(() => {
    cleanup();
  });

describe('update=higher-level-nodes', () => {
    it('returns null for an invalid index', () => {
        const result = updateHigherLevelNodes(-1, [], [], null);
        expect(result).toBeNull();
      });
    
      it('inserts nodes at the beginning when insertAt is not specified', () => {
        const higherLevelChildren = mockTableCellData.map(c => deepCopyAstNode(c));
        const newNodes = [ createNewAstNode('Text', 0, 0, 'Hello World') ];
        const result = updateHigherLevelNodes(0, higherLevelChildren, higherLevelChildren[0].Children, newNodes);
        expect(result).not.toBe(null);
        expect(result![0].Children[0].TextContent).toEqual('Hello World');
      });
    
      it('inserts nodes at the end when insertAt is "end"', () => {
        const higherLevelChildren = mockTableCellData.map(c => deepCopyAstNode(c));
        const newNodes = [ createNewAstNode('Text', 0, 0, 'Hello World') ];
        const result = updateHigherLevelNodes(0, higherLevelChildren, higherLevelChildren[0].Children, newNodes, 'end');
        expect(result).not.toBe(null);
        expect(result![0].Children[1].TextContent).toEqual('Hello World');
      });

})