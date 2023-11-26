import { mockSplitTreeData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, isNodeEmpty, splitTree } from '../node-operations';

afterEach(() => {
    cleanup();
  });
  
  describe('split-tree', () => {
    it('splits nested structures correctly', () => {
        const root = mockSplitTreeData;
        const leafNode = root.Children[0].Children[0]; // Nested leaf node
        const offset = 4; // Some offset

        const [leftTree, rightTree] = splitTree(root, leafNode, offset);
        expect(leftTree.Children[0].Children[0].TextContent?.length).toEqual(4);
        expect(rightTree.Children[0].Children[0].TextContent?.length).toEqual(26);
      });

      it('given a zero offset, splits nested structures correctly', () => {
        const root = mockSplitTreeData;
        const leafNode = root.Children[0].Children[0]; // Nested leaf node
        const offset = 0; // Some offset

        const [leftTree, rightTree] = splitTree(root, leafNode, offset);
        expect(isNodeEmpty(leftTree)).toEqual(true);
        expect(rightTree.Children[0].Children[0].TextContent?.length).toEqual(30);
      });
      
  })