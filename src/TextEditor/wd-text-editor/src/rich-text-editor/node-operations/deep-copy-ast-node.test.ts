import { vi } from 'vitest';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { mockAstData } from '../../__mocks__/editor-mocks';
import { createNewAstNode, deepCopyAstNode } from '.';
import { AstNode } from '../../components/wysiwyg/interface';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

describe('deepCopyAstNode', () => {
    it('creates a deep copy of AstNode', () => {
        const mockNode: AstNode = {
          NodeName: 'div',
          Attributes: { IsHeader: 'True' },
          ChildIndex: 0,
          Guid: '123',
          Depth: 1,
          TextContent: 'Test',
          Children: [{ ...createNewAstNode('Text', 0, 0, null), NodeName: 'span' }],
          Version: '1.0'
        };
    
        const copiedNode = deepCopyAstNode(mockNode);
    
        expect(copiedNode).not.toBe(mockNode);
        expect(copiedNode.Attributes).not.toBe(mockNode.Attributes);
        expect(copiedNode.Children[0]).not.toBe(mockNode.Children[0]);
        expect(copiedNode).toEqual(mockNode);
      });

    it('ensures original object is unchanged after mutations on the copy', () => {
      const mockNode = mockAstData;
  
      const copiedNode = deepCopyAstNode(mockNode);
  
      
      copiedNode.NodeName = 'newNode';
      copiedNode.Attributes.Title = 'newTitle';
      copiedNode.Children[0].NodeName = 'newChildNode';
  
      
      expect(mockNode.NodeName).not.toBe(copiedNode.NodeName);
      expect(mockNode.Attributes.Title).not.toBe(copiedNode.Attributes.Title);
      expect(mockNode.Children[0].NodeName).not.toBe(copiedNode.Children[0].NodeName);
    });
  });