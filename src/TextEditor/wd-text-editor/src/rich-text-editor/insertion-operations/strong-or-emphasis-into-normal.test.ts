import { vi } from "vitest";
import { AstNode, IHistoryManager, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { cleanup, mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { insertEitherStrongOrEmphasisTextIntoNormalText, insertTextIntoEitherACodeBlockOrAlertBlock } from ".";

vi.mock('../node-operations/generate-key', () => {
    return {
      __esModule: true, 
      default: vi.fn().mockReturnValue('mock-key') 
    };
  });

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('insertStrongOrEmphasisTextIntoNormalText', () => {
    it('updates text and calls history manager correctly', () => {
        const mockHistoryManager: IHistoryManagerRecorder = {
            recordChildReplace: vi.fn(),
            recordChildTextUpdate: vi.fn((oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string) => 
            {  
                expect(offset).toBe(21);
                const target = child || parent;
                target.Version = 'V1';
            }),
            recordOperation: vi.fn(),
            recordOperationsAsTransaction: vi.fn(),
            recordChildInsertBefore: vi.fn(),
            recordChildInsertAfter: vi.fn(),
            recordChildRemoveBefore: vi.fn(),
            recordChildRemoveAfter: vi.fn()
        };
      
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "This is a third paragraph"
      });
      const mockChild: AstNode = toMockAst({
        "NodeName": "Text",
        "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
        "TextContent": "This is a third paragraph"
      });
      const mockAstParent: AstNode = toMockAst({
        "NodeName": "ParagraphBlock",
        "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "TextContent": "This is a third paragraph"
          }
        ]
      });
      const startOffset = 17;
      const index = 0;
      const higherLevelIndex = null;
      const rootChildId = 'section_ac1f684e-57a4-464f-aa76-c751e7a36550';
      const higherLevelChildren = toMockAstArray([
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
                  "NodeName": "Strong",
                  "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
                  "Children": [
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
        }
      ]);
      const children = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "TextContent": "This is a third paragraph"
        }
      ]);
      const type = 'insertNew';
      const editorState = 'strong';
  
      const result = insertEitherStrongOrEmphasisTextIntoNormalText(
        startOffset, mockContainer, mockAstParent, mockChild, children, index, mockHistoryManager as IHistoryManager, higherLevelIndex, higherLevelChildren, type, rootChildId, editorState, 'a');
  
      
      expect(children[index].TextContent).toBe('This is a third p');
      expect(mockHistoryManager.recordChildInsertAfter).toHaveBeenCalledTimes(2);
      expect(result).not.toBeNull();
      expect(result!.type).toBe('insertNew');
      expect(result!.nodes.length).toBe(3);
      expect(result!).toStrictEqual({
        "type": "insertNew",
        "rootChildId": "section_ac1f684e-57a4-464f-aa76-c751e7a36550",
        "nodes": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "Depth": 0,
            "TextContent": "This is a third p",
            "Children": []
          },
          {
            "NodeName": "Strong",
            "Guid": "mock-key",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "mock-key",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "a",
                "Version": "V0"
              }
            ],
            "TextContent": null,
            "Version": "V0"
          },
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "mock-key",
            "Depth": 0,
            "TextContent": "aragraph",
            "Children": []
          }
        ]
      }
      );
    });

    it('updates text and calls history manager correctly if startOffset === 0', () => {
        const mockHistoryManager: IHistoryManagerRecorder = {
            recordChildReplace: vi.fn(),
            recordChildTextUpdate: vi.fn((oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string) => 
            {  
                expect(offset).toBe(21);
                const target = child || parent;
                target.Version = 'V1';
            }),
            recordOperation: vi.fn(),
            recordOperationsAsTransaction: vi.fn(),
            recordChildInsertBefore: vi.fn(),
            recordChildInsertAfter: vi.fn(),
            recordChildRemoveBefore: vi.fn(),
            recordChildRemoveAfter: vi.fn()
        };
      
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "This is a third paragraph"
      });
      const mockChild: AstNode = toMockAst({
        "NodeName": "Text",
        "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
        "TextContent": "This is a third paragraph"
      });
      const mockAstParent: AstNode = toMockAst({
        "NodeName": "ParagraphBlock",
        "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "TextContent": "This is a third paragraph"
          }
        ]
      });
      const startOffset = 0;
      const index = 0;
      const higherLevelIndex = null;
      const rootChildId = 'section_ac1f684e-57a4-464f-aa76-c751e7a36550';
      const higherLevelChildren = toMockAstArray([
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
                  "NodeName": "Strong",
                  "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
                  "Children": [
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
        }
      ]);
      const children = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "TextContent": "This is a third paragraph"
        }
      ]);
      const type = 'insertNew';
      const editorState = 'strong';
  
      const result = insertEitherStrongOrEmphasisTextIntoNormalText(
        startOffset, mockContainer, mockAstParent, mockChild, children, index, mockHistoryManager as IHistoryManager, higherLevelIndex, higherLevelChildren, type, rootChildId, editorState, 'a');
  
      
      expect(children[index].Children[0].TextContent).toBe('a');
      expect(mockHistoryManager.recordChildInsertBefore).toHaveBeenCalledTimes(1);
      expect(result).not.toBeNull();
      expect(result!.type).toBe('insertNew');
      expect(result!.nodes.length).toBe(2);
      expect(result!).toStrictEqual({
        "type": "insertNew",
        "rootChildId": "section_ac1f684e-57a4-464f-aa76-c751e7a36550",
        "nodes": [
          {
            "NodeName": "Strong",
            "Guid": "mock-key",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "mock-key",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "a",
                "Version": "V0"
              }
            ],
            "TextContent": null,
            "Version": "V0"
          },
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "Depth": 0,
            "TextContent": "This is a third paragraph",
            "Children": []
          }
        ]
      }
      );
    });

    it('updates text and calls history manager correctly if startOffset is at the end', () => {
        const mockHistoryManager: IHistoryManagerRecorder = {
            recordChildReplace: vi.fn(),
            recordChildTextUpdate: vi.fn((oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string) => 
            {  
                expect(offset).toBe(21);
                const target = child || parent;
                target.Version = 'V1';
            }),
            recordOperation: vi.fn(),
            recordOperationsAsTransaction: vi.fn(),
            recordChildInsertBefore: vi.fn(),
            recordChildInsertAfter: vi.fn(),
            recordChildRemoveBefore: vi.fn(),
            recordChildRemoveAfter: vi.fn()
        };
      
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "This is a third paragraph"
      });
      const mockChild: AstNode = toMockAst({
        "NodeName": "Text",
        "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
        "TextContent": "This is a third paragraph"
      });
      const mockAstParent: AstNode = toMockAst({
        "NodeName": "ParagraphBlock",
        "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "TextContent": "This is a third paragraph"
          }
        ]
      });
      const startOffset = mockContainer.textContent!.length;
      const index = 0;
      const higherLevelIndex = null;
      const rootChildId = 'section_ac1f684e-57a4-464f-aa76-c751e7a36550';
      const higherLevelChildren = toMockAstArray([
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
                  "NodeName": "Strong",
                  "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
                  "Children": [
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
        }
      ]);
      const children = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "TextContent": "This is a third paragraph"
        }
      ]);
      const type = 'insertNew';
      const editorState = 'strong';
  
      const result = insertEitherStrongOrEmphasisTextIntoNormalText(
        startOffset, mockContainer, mockAstParent, mockChild, children, index, mockHistoryManager as IHistoryManager, higherLevelIndex, higherLevelChildren, type, rootChildId, editorState, 'a');
  
      
      expect(children[index + 1].Children[0].TextContent).toBe('a');
      expect(mockHistoryManager.recordChildInsertAfter).toHaveBeenCalledTimes(1);
      expect(result).not.toBeNull();
      expect(result!.type).toBe('insertNew');
      expect(result!.nodes.length).toBe(2);
      expect(result!).toStrictEqual({
        "type": "insertNew",
        "rootChildId": "section_ac1f684e-57a4-464f-aa76-c751e7a36550",
        "nodes": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "Depth": 0,
            "TextContent": "This is a third paragraph",
            "Children": []
          },
          {
            "NodeName": "Strong",
            "Guid": "mock-key",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 0,
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "mock-key",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "a",
                "Version": "V0"
              }
            ],
            "TextContent": null,
            "Version": "V0"
          }
        ]
      }
      );
    });
  });