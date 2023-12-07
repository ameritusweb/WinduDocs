import { Mock, vi } from "vitest";
import { mockAstContext, mockAstData, mockAstData2 } from "../__mocks__/editor-mocks";
import { AstUpdate, TestData } from "../components/wysiwyg/interface";
import { cleanup, createSimplifiedObject, getType, render, renderHook, safeMatch, selectText, selectTextRange, toMockAstArray } from "../utils/test-utils";
import EditorData, { EditorDataType, EventAction } from "./editor-data";
import { useRichTextEditor } from "./use-rich-text-editor";
import RichTextEditor from "../components/wysiwyg/rich-text-editor";

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
  
describe('useRichTextEditor', () => {

      it('emits an update event for a backspace press', () => {

        const mockAst = mockAstData;

        render(
            <RichTextEditor ast={mockAst} />
        );

        const editorData: EditorDataType = EditorData;

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();

        const { result } = renderHook(() => useRichTextEditor());

        selectText('cc4156fc-0d7d-46de-91f9-5206b3c1c912', 3, 3);

        
        const mockChildren = toMockAstArray([
          {
            "NodeName": "Strong",
            "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                "TextContent": "of bold text"
              }
            ]
          }
        ]);
        const mockHigherLevelChildren = toMockAstArray([
          {
            "NodeName": "ParagraphBlock",
            "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                    "TextContent": "This is a paragraph with both "
                  },
                  {
                    "NodeName": "Emphasis",
                    "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                        "TextContent": "bold and italic"
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                    "TextContent": " text"
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                "TextContent": "This is another paragraph."
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf"
          },
          {
            "NodeName": "ParagraphBlock",
            "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                    "TextContent": "of bold text"
                  }
                ]
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a"
          }
        ]);

        const mockEvent = {
          key: 'Backspace', 
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
          
        } as unknown as React.KeyboardEvent<HTMLElement>;

        const res = result.current.updateAst(mockEvent, mockChildren, mockHigherLevelChildren, editorData, mockAstContext, [], 2);

        expect(res).not.toBeNull();

        expect(mockEmitEvent).toHaveBeenCalled();

      });
      
      it('emits an update event for an enter press', () => {

        const mockAst = mockAstData;

        render(
            <RichTextEditor ast={mockAst} />
        );

        const editorData: EditorDataType = EditorData;

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();

        const { result } = renderHook(() => useRichTextEditor());

        selectText('cc4156fc-0d7d-46de-91f9-5206b3c1c912', 3, 3);

        
        const mockChildren = toMockAstArray([
          {
            "NodeName": "Strong",
            "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                "TextContent": "of bold text"
              }
            ]
          }
        ]);
        const mockHigherLevelChildren = toMockAstArray([
          {
            "NodeName": "ParagraphBlock",
            "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                    "TextContent": "This is a paragraph with both "
                  },
                  {
                    "NodeName": "Emphasis",
                    "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                        "TextContent": "bold and italic"
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                    "TextContent": " text"
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                "TextContent": "This is another paragraph."
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf"
          },
          {
            "NodeName": "ParagraphBlock",
            "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                    "TextContent": "of bold text"
                  }
                ]
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a"
          }
        ]);

        const mockEvent = {
          key: 'Enter', 
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
          
        } as unknown as React.KeyboardEvent<HTMLElement>;

        const res = result.current.updateAst(mockEvent, mockChildren, mockHigherLevelChildren, editorData, mockAstContext, [], 2);
    
        expect(res).not.toBeNull();

        expect(mockEmitEvent).toHaveBeenCalled();

      });

      it('returns correct data based on selection', () => {

        const mockAst = mockAstData;

        render(
            <RichTextEditor ast={mockAst} />
        );

        const editorData: EditorDataType = EditorData;

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();
    
        const { result } = renderHook(() => useRichTextEditor());

        selectText('cc4156fc-0d7d-46de-91f9-5206b3c1c912', 3, 3);
    
        
        const mockChildren = toMockAstArray([
          {
            "NodeName": "Strong",
            "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                "TextContent": "of bold text"
              }
            ]
          }
        ]);
        const mockHigherLevelChildren = toMockAstArray([
          {
            "NodeName": "ParagraphBlock",
            "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                    "TextContent": "This is a paragraph with both "
                  },
                  {
                    "NodeName": "Emphasis",
                    "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                        "TextContent": "bold and italic"
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                    "TextContent": " text"
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                "TextContent": "This is another paragraph."
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf"
          },
          {
            "NodeName": "ParagraphBlock",
            "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                    "TextContent": "of bold text"
                  }
                ]
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a"
          }
        ]);
    
        const res = result.current.gatherUpdateData(mockChildren, mockHigherLevelChildren);
    
        
        expect(res).not.toBeNull();
        expect(res!.container.nodeName).toBe('#text');
        expect(res!.endContainer.nodeName).toBe('#text');
        expect(res!.startOffset).toBe(3);
        expect(res!.endOffset).toBe(3);
        
        expect(safeMatch(['id', 'Guid', 'TextContent', 'NodeName', 'nodeName'])(res!.updateData as unknown as TestData, 
          {
            "parent": {
              "id": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
              "nodeName": "STRONG"
            },
            "higherLevelIndex": 2,
            "child": {
              "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
              "TextContent": null,
              "NodeName": "Strong",
              "Children": [
                {
                  "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                  "TextContent": "of bold text",
                  "NodeName": "Text"
                }
              ]
            },
            "astParent": {
              "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
              "TextContent": null,
              "NodeName": "ParagraphBlock",
              "Children": [
                {
                  "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                  "TextContent": null,
                  "NodeName": "Strong",
                  "Children": [
                    {
                      "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                      "TextContent": "of bold text",
                      "NodeName": "Text"
                    }
                  ]
                }
              ]
            },
            "lowerLevelChild": {
              "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
              "TextContent": null,
              "NodeName": "Strong",
              "Children": [
                {
                  "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                  "TextContent": "of bold text",
                  "NodeName": "Text"
                }
              ]
            },
            "immediateChild": {
              "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
              "TextContent": null,
              "NodeName": "ParagraphBlock",
              "Children": [
                {
                  "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                  "TextContent": null,
                  "NodeName": "Strong",
                  "Children": [
                    {
                      "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                      "TextContent": "of bold text",
                      "NodeName": "Text"
                    }
                  ]
                }
              ]
            },
            "rootChildId": "section_09621212-5193-46b4-a626-1dd15f4fc8d9",
            "containerIndex": 0,
            "grandChild": {
              "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
              "TextContent": "of bold text",
              "NodeName": "Text"
            },
            "endChild": null,
            "endGrandChild": null,
            "skyChildren": [],
            "higherLevelChildren": [
              {
                "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
                "TextContent": null,
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                    "TextContent": null,
                    "NodeName": "Strong",
                    "Children": [
                      {
                        "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                        "TextContent": "This is a paragraph with both ",
                        "NodeName": "Text"
                      },
                      {
                        "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                        "TextContent": null,
                        "NodeName": "Emphasis",
                        "Children": [
                          {
                            "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                            "TextContent": "bold and italic",
                            "NodeName": "Text"
                          }
                        ]
                      },
                      {
                        "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                        "TextContent": " text",
                        "NodeName": "Text"
                      }
                    ]
                  },
                  {
                    "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                    "TextContent": "This is another paragraph.",
                    "NodeName": "Text"
                  }
                ]
              },
              {
                "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
                "TextContent": null,
                "NodeName": "BlankLine"
              },
              {
                "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
                "TextContent": null,
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                    "TextContent": null,
                    "NodeName": "Strong",
                    "Children": [
                      {
                        "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                        "TextContent": "of bold text",
                        "NodeName": "Text"
                      }
                    ]
                  }
                ]
              },
              {
                "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a",
                "TextContent": null,
                "NodeName": "BlankLine"
              }
            ]
          }
          )).toBeTruthy();
      });

      it('returns correct data based on selection when the start container does not match the end container', () => {

        const mockAst = mockAstData;

        render(
            <RichTextEditor ast={mockAst} />
        );

        const editorData: EditorDataType = EditorData;

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();
    
        const { result } = renderHook(() => useRichTextEditor());

        selectTextRange('c069fb1b-83fc-4bd9-b1fb-f385f4150da1', 'c069fb1b-83fc-4bd9-b1fb-f385f4150da1', 0, 2, 0, 3);
    
        
        const mockChildren = toMockAstArray([
          {
            "NodeName": "Strong",
            "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                "TextContent": "This is a paragraph with both "
              },
              {
                "NodeName": "Emphasis",
                "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                    "TextContent": "bold and italic"
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                "TextContent": " text"
              }
            ]
          },
          {
            "NodeName": "Text",
            "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
            "TextContent": "This is another paragraph."
          }
        ]);
        const mockHigherLevelChildren = toMockAstArray([
          {
            "NodeName": "ParagraphBlock",
            "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                    "TextContent": "This is a paragraph with both "
                  },
                  {
                    "NodeName": "Emphasis",
                    "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                        "TextContent": "bold and italic"
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                    "TextContent": " text"
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                "TextContent": "This is another paragraph."
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf"
          }
        ]);
    
        const res = result.current.gatherUpdateData(mockChildren, mockHigherLevelChildren);
    
        
        expect(res).not.toBeNull();
        expect(res!.container.nodeName).toBe('#text');
        expect(res!.endContainer.nodeName).toBe('#text');
        expect(res!.startOffset).toBe(0);
        expect(res!.endOffset).toBe(3);
        console.log(JSON.stringify(createSimplifiedObject(res!.updateData, ['id', 'Guid', 'TextContent', 'NodeName', 'nodeName']), null, 2));
        expect(safeMatch(['id', 'Guid', 'TextContent', 'NodeName', 'nodeName'])(res!.updateData as unknown as TestData, 
          {
            "parent": {
              "id": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
              "nodeName": "STRONG"
            },
            "higherLevelIndex": 0,
            "child": {
              "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
              "TextContent": null,
              "NodeName": "Strong",
              "Children": [
                {
                  "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                  "TextContent": "This is a paragraph with both ",
                  "NodeName": "Text"
                },
                {
                  "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                  "TextContent": null,
                  "NodeName": "Emphasis",
                  "Children": [
                    {
                      "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                      "TextContent": "bold and italic",
                      "NodeName": "Text"
                    }
                  ]
                },
                {
                  "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                  "TextContent": " text",
                  "NodeName": "Text"
                }
              ]
            },
            "astParent": {
              "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
              "TextContent": null,
              "NodeName": "ParagraphBlock",
              "Children": [
                {
                  "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                  "TextContent": null,
                  "NodeName": "Strong",
                  "Children": [
                    {
                      "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                      "TextContent": "This is a paragraph with both ",
                      "NodeName": "Text"
                    },
                    {
                      "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                      "TextContent": null,
                      "NodeName": "Emphasis",
                      "Children": [
                        {
                          "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                          "TextContent": "bold and italic",
                          "NodeName": "Text"
                        }
                      ]
                    },
                    {
                      "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                      "TextContent": " text",
                      "NodeName": "Text"
                    }
                  ]
                },
                {
                  "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                  "TextContent": "This is another paragraph.",
                  "NodeName": "Text"
                }
              ]
            },
            "lowerLevelChild": {
              "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
              "TextContent": null,
              "NodeName": "Strong",
              "Children": [
                {
                  "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                  "TextContent": "This is a paragraph with both ",
                  "NodeName": "Text"
                },
                {
                  "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                  "TextContent": null,
                  "NodeName": "Emphasis",
                  "Children": [
                    {
                      "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                      "TextContent": "bold and italic",
                      "NodeName": "Text"
                    }
                  ]
                },
                {
                  "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                  "TextContent": " text",
                  "NodeName": "Text"
                }
              ]
            },
            "immediateChild": {
              "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
              "TextContent": null,
              "NodeName": "ParagraphBlock",
              "Children": [
                {
                  "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                  "TextContent": null,
                  "NodeName": "Strong",
                  "Children": [
                    {
                      "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                      "TextContent": "This is a paragraph with both ",
                      "NodeName": "Text"
                    },
                    {
                      "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                      "TextContent": null,
                      "NodeName": "Emphasis",
                      "Children": [
                        {
                          "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                          "TextContent": "bold and italic",
                          "NodeName": "Text"
                        }
                      ]
                    },
                    {
                      "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                      "TextContent": " text",
                      "NodeName": "Text"
                    }
                  ]
                },
                {
                  "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                  "TextContent": "This is another paragraph.",
                  "NodeName": "Text"
                }
              ]
            },
            "rootChildId": "section_a8b579d3-93c2-4837-8731-34fa04badb8f",
            "containerIndex": 0,
            "grandChild": {
              "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
              "TextContent": "This is a paragraph with both ",
              "NodeName": "Text"
            },
            "endChild": {
              "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
              "TextContent": null,
              "NodeName": "Strong",
              "Children": [
                {
                  "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                  "TextContent": "This is a paragraph with both ",
                  "NodeName": "Text"
                },
                {
                  "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                  "TextContent": null,
                  "NodeName": "Emphasis",
                  "Children": [
                    {
                      "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                      "TextContent": "bold and italic",
                      "NodeName": "Text"
                    }
                  ]
                },
                {
                  "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                  "TextContent": " text",
                  "NodeName": "Text"
                }
              ]
            },
            "endGrandChild": {
              "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
              "TextContent": " text",
              "NodeName": "Text"
            },
            "skyChildren": [],
            "higherLevelChildren": [
              {
                "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
                "TextContent": null,
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                    "TextContent": null,
                    "NodeName": "Strong",
                    "Children": [
                      {
                        "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                        "TextContent": "This is a paragraph with both ",
                        "NodeName": "Text"
                      },
                      {
                        "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                        "TextContent": null,
                        "NodeName": "Emphasis",
                        "Children": [
                          {
                            "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                            "TextContent": "bold and italic",
                            "NodeName": "Text"
                          }
                        ]
                      },
                      {
                        "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                        "TextContent": " text",
                        "NodeName": "Text"
                      }
                    ]
                  },
                  {
                    "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                    "TextContent": "This is another paragraph.",
                    "NodeName": "Text"
                  }
                ]
              },
              {
                "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
                "TextContent": null,
                "NodeName": "BlankLine"
              }
            ]
          }
          )).toBeTruthy();
      });

      it('returns correct data based on selection and the cursor is between a normal and a strong', () => {

        const mockAst = mockAstData2;

        render(
            <RichTextEditor ast={mockAst} />
        );

        const editorData: EditorDataType = EditorData;

        const mockEmitEvent = editorData.emitEvent as Mock<[action: EventAction, id: string, payload: AstUpdate], void>;
        mockEmitEvent.mockReset();
    
        const { result } = renderHook(() => useRichTextEditor());

        selectText('para_09621212-5193-46b4-a626-1dd15f4fc8d9', 14, 14);
    
        
        const mockChildren = toMockAstArray([
          {
            "NodeName": "Text",
            "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993715",
            "TextContent": "of normal text"
          },
          {
            "NodeName": "Strong",
            "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                "TextContent": "of bold text"
              }
            ]
          }
        ]);
        const mockHigherLevelChildren = toMockAstArray([
          {
            "NodeName": "ParagraphBlock",
            "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
            "Children": [
              {
                "NodeName": "Strong",
                "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                    "TextContent": "This is a paragraph with both "
                  },
                  {
                    "NodeName": "Emphasis",
                    "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                        "TextContent": "bold and italic"
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                    "TextContent": " text"
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                "TextContent": "This is another paragraph."
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf"
          },
          {
            "NodeName": "ParagraphBlock",
            "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993715",
                "TextContent": "of normal text"
              },
              {
                "NodeName": "Strong",
                "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                    "TextContent": "of bold text"
                  }
                ]
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a"
          }
        ]);
    
        const res = result.current.gatherUpdateData(mockChildren, mockHigherLevelChildren);
    
        
        expect(res).not.toBeNull();
        expect(getType(res)).toBe('object');
        expect(res!.container.nodeName).toBe('#text');
        expect(res!.endContainer.nodeName).toBe('#text');
        expect(res!.startOffset).toBe(14);
        expect(res!.endOffset).toBe(14);
        expect(safeMatch(['id', 'Guid', 'TextContent', 'NodeName', 'nodeName'])(res!.updateData as unknown as TestData, 
          {
            "parent": {
              "id": "para_09621212-5193-46b4-a626-1dd15f4fc8d9",
              "nodeName": "P"
            },
            "higherLevelIndex": 2,
            "child": {
              "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
              "TextContent": null,
              "NodeName": "ParagraphBlock",
              "Children": [
                {
                  "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993715",
                  "TextContent": "of normal text",
                  "NodeName": "Text"
                },
                {
                  "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                  "TextContent": null,
                  "NodeName": "Strong",
                  "Children": [
                    {
                      "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                      "TextContent": "of bold text",
                      "NodeName": "Text"
                    }
                  ]
                }
              ]
            },
            "astParent": null,
            "lowerLevelChild": null,
            "immediateChild": {
              "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
              "TextContent": null,
              "NodeName": "ParagraphBlock",
              "Children": [
                {
                  "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993715",
                  "TextContent": "of normal text",
                  "NodeName": "Text"
                },
                {
                  "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                  "TextContent": null,
                  "NodeName": "Strong",
                  "Children": [
                    {
                      "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                      "TextContent": "of bold text",
                      "NodeName": "Text"
                    }
                  ]
                }
              ]
            },
            "rootChildId": "section_09621212-5193-46b4-a626-1dd15f4fc8d9",
            "containerIndex": 0,
            "grandChild": {
              "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993715",
              "TextContent": "of normal text",
              "NodeName": "Text"
            },
            "endChild": null,
            "endGrandChild": null,
            "skyChildren": [],
            "higherLevelChildren": [
              {
                "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
                "TextContent": null,
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                    "TextContent": null,
                    "NodeName": "Strong",
                    "Children": [
                      {
                        "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                        "TextContent": "This is a paragraph with both ",
                        "NodeName": "Text"
                      },
                      {
                        "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                        "TextContent": null,
                        "NodeName": "Emphasis",
                        "Children": [
                          {
                            "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                            "TextContent": "bold and italic",
                            "NodeName": "Text"
                          }
                        ]
                      },
                      {
                        "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
                        "TextContent": " text",
                        "NodeName": "Text"
                      }
                    ]
                  },
                  {
                    "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
                    "TextContent": "This is another paragraph.",
                    "NodeName": "Text"
                  }
                ]
              },
              {
                "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
                "TextContent": null,
                "NodeName": "BlankLine"
              },
              {
                "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
                "TextContent": null,
                "NodeName": "ParagraphBlock",
                "Children": [
                  {
                    "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993715",
                    "TextContent": "of normal text",
                    "NodeName": "Text"
                  },
                  {
                    "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                    "TextContent": null,
                    "NodeName": "Strong",
                    "Children": [
                      {
                        "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                        "TextContent": "of bold text",
                        "NodeName": "Text"
                      }
                    ]
                  }
                ]
              },
              {
                "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a",
                "TextContent": null,
                "NodeName": "BlankLine"
              }
            ]
          }
          )).toBeTruthy();
      });
});