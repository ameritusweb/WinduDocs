import { Mock, vi } from "vitest";
import { mockUseParagraphData } from "../__mocks__/editor-mocks";
import { AstContext, AstNode, AstUpdate } from "../components/wysiwyg/interface";
import { cleanup, render, renderHook, selectText } from "../utils/test-utils";
import { useParagraph } from "./use-paragraph";
import EditorData, { EditorDataType, EventAction } from "./editor-data";
import Paragraph from "../components/wysiwyg/paragraph";
import { deepCopyAstNode } from "../rich-text-editor/node-operations";

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

      
      expect(() => result.current.handleMakeBold(mockAst, mockHigherLevelAst, mockAstContext, mockPathIndices)).toThrow();
      
    });

    it('handleMakeBold works correctly from the beginning of text', () => {

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

      const mockHigherLevelAst: AstNode[] = mockUseParagraphData.map(d => deepCopyAstNode(d));
     
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

      render(
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

      const { result } = renderHook(() => useParagraph());

      const editorData: EditorDataType = EditorData;

      selectText('para_ac1f684e-57a4-464f-aa76-c751e7a36550', 0, 7);

      const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
      mockEmitEvent.mockReset();

      
      result.current.handleMakeBold(mockAst, mockHigherLevelAst, mockAstContext, mockPathIndices);

      expect(mockEmitEvent).toHaveBeenCalledTimes(1);
      expect(mockEmitEvent.mock.lastCall![0]).toBe('update');
      expect(mockEmitEvent.mock.lastCall![1]).toBe('richTextEditor');
      expect(mockEmitEvent.mock.lastCall![2].nodes).toStrictEqual([
        {
          ...mockEmitEvent.mock.lastCall![2].nodes[0],
          "NodeName": "Strong",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 0,
          "Children": [
            {
              ...mockEmitEvent.mock.lastCall![2].nodes[0].Children[0],
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 0,
              "Children": [],
              "TextContent": "This is",
              "Version": "V0"
            }
          ],
          "TextContent": null,
          "Version": "V0"
        },
        {
          ...mockEmitEvent.mock.lastCall![2].nodes[1],
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 2,
          "TextContent": " a third paragraph",
          "Children": []
        }
      ]);
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
  
        const mockHigherLevelAst: AstNode[] = mockUseParagraphData.map(d => deepCopyAstNode(d));
       
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

        render(
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
  
        const { result } = renderHook(() => useParagraph());

        const editorData: EditorDataType = EditorData;
  
        selectText('para_ac1f684e-57a4-464f-aa76-c751e7a36550', 5, 7);

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();

        
        result.current.handleMakeBold(mockAst, mockHigherLevelAst, mockAstContext, mockPathIndices);

        expect(mockEmitEvent).toHaveBeenCalledTimes(1);
        expect(mockEmitEvent.mock.lastCall![0]).toBe('update');
        expect(mockEmitEvent.mock.lastCall![1]).toBe('richTextEditor');
        expect(mockEmitEvent.mock.lastCall![2].nodes).toStrictEqual([
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[0],
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "TextContent": "This ",
            "Children": []
          },
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[1],
            "NodeName": "Strong",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [
              {
                ...mockEmitEvent.mock.lastCall![2].nodes[1].Children[0],
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "is",
                "Version": "V0"
              }
            ],
            "TextContent": null,
            "Version": "V0"
          },
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[2],
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "TextContent": " a third paragraph",
            "Children": []
          }
        ]);
      });

      it('handleMakeItalic works correctly', () => {

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
  
        const mockHigherLevelAst: AstNode[] = mockUseParagraphData.map(d => deepCopyAstNode(d));
       
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

        render(
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
  
        const { result } = renderHook(() => useParagraph());

        const editorData: EditorDataType = EditorData;

        selectText('para_ac1f684e-57a4-464f-aa76-c751e7a36550', 5, 7);

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();

        
        result.current.handleMakeItalic(mockAst, mockHigherLevelAst, mockAstContext, mockPathIndices);

        expect(mockEmitEvent).toHaveBeenCalledTimes(1);
        expect(mockEmitEvent.mock.lastCall![0]).toBe('update');
        expect(mockEmitEvent.mock.lastCall![1]).toBe('richTextEditor');
        expect(mockEmitEvent.mock.lastCall![2].type).toBe('makeItalic');
        expect(mockEmitEvent.mock.lastCall![2].nodes).toStrictEqual([
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[0],
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "TextContent": "This ",
            "Children": []
          },
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[1],
            "NodeName": "Emphasis",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [
              {
                ...mockEmitEvent.mock.lastCall![2].nodes[1].Children[0],
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "is",
                "Version": "V0"
              }
            ],
            "TextContent": null,
            "Version": "V0"
          },
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[2],
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "TextContent": " a third paragraph",
            "Children": []
          }
        ]);
      });

      it('handleMakeItalic works correctly at the beginning', () => {

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
  
        const mockHigherLevelAst: AstNode[] = mockUseParagraphData.map(d => deepCopyAstNode(d));
       
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

        render(
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
  
        const { result } = renderHook(() => useParagraph());

        const editorData: EditorDataType = EditorData;

        selectText('para_ac1f684e-57a4-464f-aa76-c751e7a36550', 0, 7);

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();

        
        result.current.handleMakeItalic(mockAst, mockHigherLevelAst, mockAstContext, mockPathIndices);

        expect(mockEmitEvent).toHaveBeenCalledTimes(1);
        expect(mockEmitEvent.mock.lastCall![0]).toBe('update');
        expect(mockEmitEvent.mock.lastCall![1]).toBe('richTextEditor');
        expect(mockEmitEvent.mock.lastCall![2].type).toBe('makeItalic');
        expect(mockEmitEvent.mock.lastCall![2].nodes).toStrictEqual([
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[0],
            "NodeName": "Emphasis",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [
              {
                ...mockEmitEvent.mock.lastCall![2].nodes[0].Children[0],
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "This is",
                "Version": "V0"
              }
            ],
            "TextContent": null,
            "Version": "V0"
          },
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[1],
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "TextContent": " a third paragraph",
            "Children": []
          }
        ]
        );
      });

      it('handleInsertLink works correctly', () => {
  
        const mockHigherLevelAst: AstNode[] = mockUseParagraphData.map(d => deepCopyAstNode(d));
       
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

        render(
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
  
        const { result } = renderHook(() => useParagraph());

        const editorData: EditorDataType = EditorData;

        selectText('para_ac1f684e-57a4-464f-aa76-c751e7a36550', 25, 25);

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();

        const text = 'LinkText';
        const url = 'http://link.text';
        
        result.current.handleInsertLink(mockHigherLevelAst, text, url, mockPathIndices);

        expect(mockEmitEvent).toHaveBeenCalledTimes(1);
        expect(mockEmitEvent.mock.lastCall![0]).toBe('update');
        expect(mockEmitEvent.mock.lastCall![1]).toBe('richTextEditor');
        expect(mockEmitEvent.mock.lastCall![2].type).toBe('insertLink');
        expect(mockEmitEvent.mock.lastCall![2].nodes).toStrictEqual([
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[0],
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "TextContent": "This is a third paragraph",
            "Children": []
          },
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[1],
            "NodeName": "Link",
            "Attributes": {
              "Url": "http://link.text"
            },
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [
              {
                ...mockEmitEvent.mock.lastCall![2].nodes[1].Children[0],
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "LinkText",
                "Version": "V0"
              }
            ],
            "TextContent": null,
            "Version": "V0"
          }
        ]);
      });

      it('handleInsertInline works correctly', () => {
  
        const mockHigherLevelAst: AstNode[] = mockUseParagraphData.map(d => deepCopyAstNode(d));
       
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

        render(
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
  
        const { result } = renderHook(() => useParagraph());

        const editorData: EditorDataType = EditorData;

        selectText('para_ac1f684e-57a4-464f-aa76-c751e7a36550', 25, 25);

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();
        
        result.current.handleInsertInline(mockHigherLevelAst, mockPathIndices);

        expect(mockEmitEvent).toHaveBeenCalledTimes(1);
        expect(mockEmitEvent.mock.lastCall![0]).toBe('update');
        expect(mockEmitEvent.mock.lastCall![1]).toBe('richTextEditor');
        expect(mockEmitEvent.mock.lastCall![2].type).toBe('insertInline');
        expect(mockEmitEvent.mock.lastCall![2].nodes).toStrictEqual([
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[0],
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 2,
            "TextContent": "This is a third paragraph",
            "Children": []
          },
          {
            ...mockEmitEvent.mock.lastCall![2].nodes[1],
            "NodeName": "CodeInline",
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [],
            "TextContent": '\n',
            "Version": "V0"
          }
        ]);
      });
});