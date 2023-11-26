import { vi } from 'vitest';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { AstNode } from '../../components/wysiwyg/interface';
import { mockAstData } from '../../__mocks__/editor-mocks';
import processAst from './process-ast';
import { createNewAstNode } from '.';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('process-ast', () => {
    it('correctly processes the AST', async () => {
        const mockAst: AstNode = mockAstData;
    
        const [lines, guidMap] = await processAst(mockAst);
    
        // Assertions for lines
        expect(lines).toBeInstanceOf(Array);
        // Additional assertions based on expected structure
    
        // Assertions for guidMap
        expect(guidMap).toBeInstanceOf(Map);
        // Additional assertions based on expected mappings
      });

      it('correctly processes basic text nodes', async () => {
        const mockAst: AstNode = createNewAstNode('Text', 0, 0, 'Hello, world!');
    
        const [lines, guidMap] = await processAst(mockAst);
    
        // Check that there is one line with one TextBlock
        expect(lines).toHaveLength(1);
        expect(lines[0]).toHaveLength(1);
        expect(lines[0][0].textContent).toBe('Hello, world!');
        // Add more detailed assertions as needed
      });

      it('creates an accurate guidMap', async () => {
        const mockAst = {
          ...createNewAstNode('ParagraphBlock', 0, 0, null),
          Children: [
            { ...createNewAstNode('Text', 0, 0, null), TextContent: 'First Line', Guid: 'guid-1' },
            { ...createNewAstNode('BlankLine', 0, 0, null), Guid: 'guid-2' },
            { ...createNewAstNode('Text', 0, 0, null), TextContent: 'Second Line', Guid: 'guid-3' }
          ],
          Guid: 'para-guid'
        };
    
        const [lines, guidMap] = await processAst(mockAst);
    console.log(guidMap);
        // Verify that guidMap correctly references the positions of TextBlocks
        expect(guidMap.get('para_para-guid 0')).toEqual([0, 0]); // First line, first block
        expect(guidMap.get('guid-2 0')).toEqual([1, 0]); // Second line (BlankLine)
        expect(guidMap.get('para_para-guid 2')).toEqual([2, 0]); // Third line, first block
    
        // Add more assertions for different nodes and nesting levels
      });
  })