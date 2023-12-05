import { vi } from 'vitest';
import { cleanup } from '../../utils/test-utils'
import { createNewAstNode, replaceKeys } from '../node-operations';
import generateKey from './generate-key';

vi.mock('./generate-key', async () => {
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
    
        
        expect(result.Guid).toBe('mock-key');
        
        result.Children.forEach(child => {
          expect(child.Guid).toBe('mock-key');
        });
    
        
        expect(generateKey).toHaveBeenCalledTimes(7); 
      });
  })