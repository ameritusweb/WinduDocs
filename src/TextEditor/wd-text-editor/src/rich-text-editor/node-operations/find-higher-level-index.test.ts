import { vi } from 'vitest';
import { cleanup } from '../../utils/test-utils'
import { createNewAstNode, findHigherlevelIndex } from '.';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('findHigherlevelIndex function', () => {
    it('returns the correct index when a match is found', () => {
      const nodes = [
        { ...createNewAstNode('Text', 0, 0, 'node1'), Guid: 'node1', /* other properties */ },
        { ...createNewAstNode('Text', 0, 0, 'node2'), Guid: 'node2', /* other properties */ }
      ];
  
      const higherLevelNodes = [
        { ...createNewAstNode('ParagraphBlock', 0, 0, null), Children: [{ ...createNewAstNode('Text', 0, 0, 'other'), Guid: 'other' }, { ...createNewAstNode('Text', 0, 0, 'nodes'), Guid: 'nodes' }], /* other properties */ },
        { ...createNewAstNode('ParagraphBlock', 0, 0, null), Children: [...nodes], /* other properties */ }
      ];
  
      const index = findHigherlevelIndex(nodes, higherLevelNodes);
      expect(index).toBe(1); 
    });
  
    it('returns null when no match is found', () => {
        const nodes = [
            { ...createNewAstNode('Text', 0, 0, 'node1'), Guid: 'node1', /* other properties */ },
            { ...createNewAstNode('Text', 0, 0, 'node2'), Guid: 'node2', /* other properties */ }
          ];
  
      const higherLevelNodes = [
        { ...createNewAstNode('ParagraphBlock', 0, 0, null), Children: [{ ...createNewAstNode('Text', 0, 0, 'other'), Guid: 'other' }, { ...createNewAstNode('Text', 0, 0, 'nodes'), Guid: 'nodes' }], /* other properties */ }
        
      ];
  
      const index = findHigherlevelIndex(nodes, higherLevelNodes);
      expect(index).toBeNull();
    });
  });