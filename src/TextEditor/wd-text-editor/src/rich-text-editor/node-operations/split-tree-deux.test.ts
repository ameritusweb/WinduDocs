import { mockSplitTreeData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { createNewAstNode, isNodeEmpty, splitTreeDeux } from '../node-operations';

afterEach(() => {
    cleanup();
  });
  
  describe('split-tree-deux', () => {
    it('splits nested structures correctly', () => {
        const root = mockSplitTreeData;
        const leafNode = root.Children[0].Children[0]; 
        const offset = 4; 

        const [leftTree, rightTree] = splitTreeDeux(root, leafNode, offset);
        expect(leftTree).not.toBeNull();
        expect(rightTree).not.toBeNull();
        expect(leftTree!.Children[0].Children[0].TextContent?.length).toEqual(4);
        expect(rightTree!.Children[0].Children[0].TextContent?.length).toEqual(26);
      });

      it('given a zero offset, splits nested structures correctly', () => {
        const root = mockSplitTreeData;
        const leafNode = root.Children[0].Children[0]; 
        const offset = 0; 
        
        const [leftTree, rightTree] = splitTreeDeux(root, leafNode, offset);
        
        expect(leftTree).toBeNull();
        expect(rightTree).not.toBeNull();
        expect(rightTree!.Children[0].Children[0].TextContent?.length).toEqual(30);
      });
      
  })