import { mockSplitTreeData, mockStrongData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, deepCopyAstNode, isNodeEmpty, splitAndUpdateHigherLevelNodes, splitNode } from '../node-operations';

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
    
        const nodes = splitAndUpdateHigherLevelNodes(index, node, startOffset, indexToSplit, indexToRemoveAndAdd, type, key, [ node ], higherLevelNodes, false);
    
        expect(nodes[index].Children[0].TextContent).toBe('Test c');
      });
  })