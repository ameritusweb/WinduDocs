import { vi } from 'vitest';
import { act, cleanup, render, screen, toMockAst, userEvent } from '../../utils/test-utils'
import { AstNode } from '../../components/wysiwyg/interface';
import { mockAstData, mockHigherLevelCodeBlockData, mockListData, mockTableData } from '../../__mocks__/editor-mocks';
import processAst from './process-ast';
import { createNewAstNode } from '.';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
  describe('process-ast', () => {
    it('correctly processes the AST', async () => {
        const mockAst: AstNode = mockAstData;
        mockAst.Children.push(toMockAst({ NodeName: "Table", Children: mockTableData }));
        mockAst.Children.push(toMockAst({ NodeName: "ListBlock", Attributes: { IsOrdered: 'True' },   Children: mockListData }));
        mockAst.Children.push(...mockHigherLevelCodeBlockData);
        mockAst.Children.push(toMockAst({ NodeName: 'Text', TextContent:'Test Text\nMore Test Text' }));
        mockAst.Children.push(toMockAst({ NodeName: 'Text', TextContent:'\n' }));

        const [lines, guidMap] = await processAst(mockAst);
    
        
        expect(lines).toBeInstanceOf(Array);
        
    
        
        expect(guidMap).toBeInstanceOf(Map);
        
      });

      it('correctly processes basic text nodes', async () => {
        const mockAst: AstNode = createNewAstNode('Text', 0, 0, 'Hello, world!');
    
        const [lines, guidMap] = await processAst(mockAst);
    
        
        expect(lines).toHaveLength(1);
        expect(lines[0]).toHaveLength(1);
        expect(lines[0][0].textContent).toBe('Hello, world!');
        
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

        
        expect(guidMap.get('para_para-guid 0')).toEqual([0, 0]); 
        expect(guidMap.get('guid-2 0')).toEqual([1, 0]); 
        expect(guidMap.get('para_para-guid 2')).toEqual([2, 0]); 
    
        
      });
  })