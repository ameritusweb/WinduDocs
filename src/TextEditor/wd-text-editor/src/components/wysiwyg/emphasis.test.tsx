import { cleanup, render, screen } from '../../utils/test-utils'
import Emphasis from './emphasis'
import { mockEmphasisData } from '../../__mocks__/editor-mocks'
import { AstContext } from './interface';
import EditorData, { EditorDataType } from '../../hooks/editor-data';
import { Mock, vi } from 'vitest';

afterEach(() => {
    cleanup();
  });
  
describe('Emphasis', async () => {

  vi.mock('../../hooks/editor-data', async () => {
    const actual = await vi.importActual("../../hooks/editor-data") as typeof import("../../hooks/editor-data");
    return {
      __esModule: true,
      default: {
        ...actual.default,
        emitEvent: vi.fn(actual.default.emitEvent)
      }
    };
  });
  
  it('should render the Emphasis', () => {
    render(
    <Emphasis 
        id={'123456-123456-123456-123456'} 
        parentId={'A123456-123456-123456-123456'} 
        pathIndices={[]}  
        children={mockEmphasisData}   
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
      />,
    )
    const matchingElements = screen.getAllByText((content) => content.startsWith('bold and italic'));
    expect(matchingElements.length).toBe(1);
  })

  it('should broadcast a * event', () => {
    render(
    <Emphasis 
        id={'E123456-123456-123456-123456'} 
        parentId={'A123456-123456-123456-123456'} 
        pathIndices={[]}  
        children={mockEmphasisData}   
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
      />,
    )

      const editorData: EditorDataType = EditorData;
      (editorData.emitEvent as Mock).mockClear();
      editorData.emitEvent('*', 'E123456-123456-123456-123456', { });

    expect(editorData.emitEvent).toHaveBeenCalledTimes(2);
  })

  it('should render the emphasis inside of strong', () => {
    render(
    <Emphasis 
        id={'123456-123456-123456-123456'} 
        parentId={'A123456-123456-123456-123456'} 
        pathIndices={[]}  
        children={[
          {
            "NodeName": "Strong",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
            "TextContent": null,
            "Children": mockEmphasisData
          }
        ]}   
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
      />,
    )
    const matchingElements = screen.getAllByText((content) => content.startsWith('bold and italic'));
    expect(matchingElements.length).toBe(1);
  })
})
