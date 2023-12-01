import { findTextBlockByGuid } from ".";

describe('findTextBlockByGuid', () => {
    const mockEditorData = { cursorOffset: 0, cursorOffsetReduction: 0 } as any;
    const mockProcessedAst = [
        [
          { guid: 'key-1-1', index: 0, textContent: 'Hello ' },
          { guid: 'key-1-2', index: 1, textContent: 'World' },
        ],
        [
          { guid: 'key-2-1', index: 0, textContent: 'Welcome ' },
          { guid: 'key-2-2', index: 1, textContent: 'World' },
        ]
       ];
    const mockProcessedAstMap = new Map<string, number[]>();
    mockProcessedAstMap.set('key-1-1 1', [0, 0]);
    mockProcessedAstMap.set('key-1-2 1', [0, 1]);
    mockProcessedAstMap.set('key-2-1 1', [1, 0]);
    mockProcessedAstMap.set('key-2-2 1', [1, 1]);
  
    it('returns the correct block for valid GUID and index', () => {
      const result = findTextBlockByGuid(mockEditorData, mockProcessedAst, mockProcessedAstMap, 'ArrowUp', 'key-2-2', 1, 1);
      expect(result).not.toBeNull();
      expect(result!.guid).toBe('key-1-2');
      expect(result!.index).toBe(1);
      expect(result!.offset).toBe(3);
      expect(result!.textContent).toBe('World');
      // Assert that result is the expected ITextBlock
    });
  
    it('returns null for GUID not found in map', () => {
      const result = findTextBlockByGuid(mockEditorData, mockProcessedAst, mockProcessedAstMap, 'ArrowUp', 'invalid-guid', 1, 5);
      expect(result).toBeNull();
    });
  });