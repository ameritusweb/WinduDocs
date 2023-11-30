import { vi } from "vitest";
import { mockUseParagraphData } from "../__mocks__/editor-mocks";
import { AstContext, AstNode } from "../components/wysiwyg/interface";
import { cleanup, render, renderHook, selectText } from "../utils/test-utils";
import { useParagraph } from "./use-paragraph";
import EditorData, { EditorDataType } from "./editor-data";
import Paragraph from "../components/wysiwyg/paragraph";

vi.mock('./editor-data', async () => {
    const actual = await vi.importActual("./editor-data") as typeof import("./editor-data");
    return {
      __esModule: true,
      default: {
        ...actual.default,
        emitEvent: vi.fn()
      }
    };
  });

afterEach(() => {
    cleanup();
  });
  
describe('useParagraph', () => {
    it('handleMakeBold throws an error when no text is selected', () => {

      const mockAst: AstNode[] = [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "Depth": 2,
          "TextContent": "This is a third paragraph",
          "Children": []
        }
      ];

      const mockHigherLevelAst: AstNode[] = mockUseParagraphData;
     
      const mockAstContext: AstContext = {
        "isAlertBlock": false,
        "isQuoteBlock": false,
        "isCodeBlock": false,
        "isEmphasis": false,
        "isHeading": false,
        "isInlineCode": false,
        "isLink": false,
        "isOrderedList": false,
        "isStrong": false,
        "isTable": false,
        "isUnorderedList": false,
        "types": []
      };

      const mockPathIndices: number[] = [
        4
      ];

      const { result } = renderHook(() => useParagraph());

      // Invoke handler
      expect(() => result.current.handleMakeBold(mockAst, mockHigherLevelAst, mockAstContext, mockPathIndices)).toThrow();
      
    });

    it('handleMakeBold works correctly', () => {

        const mockAst: AstNode[] = [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "Depth": 2,
            "TextContent": "This is a third paragraph",
            "Children": []
          }
        ];
  
        const mockHigherLevelAst: AstNode[] = mockUseParagraphData;
       
        const mockAstContext: AstContext = {
          "isAlertBlock": false,
          "isQuoteBlock": false,
          "isCodeBlock": false,
          "isEmphasis": false,
          "isHeading": false,
          "isInlineCode": false,
          "isLink": false,
          "isOrderedList": false,
          "isStrong": false,
          "isTable": false,
          "isUnorderedList": false,
          "types": []
        };
  
        const mockPathIndices: number[] = [
          4
        ];

        const {container} = render(
          <div id="richTextEditor">
              <div id="containerId">
                <Paragraph<HTMLParagraphElement>
                  id="ac1f684e-57a4-464f-aa76-c751e7a36550" 
                  content={[mockHigherLevelAst[4].Children[0]]} 
                  context={mockAstContext}
                  pathIndices={mockPathIndices} 
                  version="V1" 
                  render={props => <p {...props}></p>} 
                />
            </div>
          </div>
        );

        console.log(container.outerHTML);
  
        const { result } = renderHook(() => useParagraph());

        const editorData: EditorDataType = EditorData;
  
        selectText('para_ac1f684e-57a4-464f-aa76-c751e7a36550', 5, 7);

        // Invoke handler
        result.current.handleMakeBold(mockAst, mockHigherLevelAst, mockAstContext, mockPathIndices);
   
        expect(editorData.emitEvent).toHaveBeenCalledTimes(1);

      });
});