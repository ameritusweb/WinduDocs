import { vi } from "vitest";
import { AstNode, IHistoryManager, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { cleanup, mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText } from ".";

vi.mock('../node-operations/generate-key', () => {
    return {
      __esModule: true, 
      default: vi.fn().mockReturnValue('mock-key') 
    };
  });

afterEach(() => {
    cleanup();
  });

afterAll(() => {
  vi.clearAllMocks();
});
  
describe('insertStrongAndEmphasisTextIntoStrongOrEmphasisText', () => {
    it('updates text and calls history manager correctly', () => {
        const mockHistoryManager: IHistoryManagerRecorder = {
            recordChildReplace: vi.fn(),
            recordChildTextUpdate: vi.fn((oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null) => 
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
      const mockParent = mockCustomElement({
        "nodeName": "EM",
        "childNodes": [
          {
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "italic"
          }
        ]
      });
      const mockChild = toMockAst({
        "NodeName": "Emphasis",
        "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
            "TextContent": "italic"
          }
        ]
      });
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "italic"
      });
      const startOffset = 3;
      const higherLevelIndex = 1;
      const containerIndex = 0;
      const mockHigherLevelChildren = toMockAstArray([
        {
          "NodeName": "BlankLine",
          "Guid": "e8e90704-dd7a-4c19-ae5c-7e7867d4195e"
        },
        {
          "NodeName": "ParagraphBlock",
          "Guid": "8b50e804-f1d7-430e-9f07-ce6cb0bef070",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
              "TextContent": "This is a paragraph with "
            },
            {
              "NodeName": "Strong",
              "Guid": "9832bb55-81ec-4727-87c2-21c44d151623",
              "Children": [
                {
                  "NodeName": "Text",
                  "Guid": "1a88c03b-0eb7-447b-ade1-aed99843901f",
                  "TextContent": "bold"
                }
              ]
            },
            {
              "NodeName": "Text",
              "Guid": "1b1dfb46-53f8-4a01-ab14-2081748ef38a",
              "TextContent": " text and "
            },
            {
              "NodeName": "Emphasis",
              "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
              "Children": [
                {
                  "NodeName": "Text",
                  "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
                  "TextContent": "italic"
                }
              ]
            },
            {
              "NodeName": "Text",
              "Guid": "fa6d4496-d1dd-41ad-b482-dbfaaf5f6f13",
              "TextContent": " text."
            }
          ]
        },
        {
          "NodeName": "BlankLine",
          "Guid": "35e062d2-3b3c-4ca5-9084-b604c97ea239"
        }
      ]);
      const mockChildren = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
          "TextContent": "This is a paragraph with "
        },
        {
          "NodeName": "Strong",
          "Guid": "9832bb55-81ec-4727-87c2-21c44d151623",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "1a88c03b-0eb7-447b-ade1-aed99843901f",
              "TextContent": "bold"
            }
          ]
        },
        {
          "NodeName": "Text",
          "Guid": "1b1dfb46-53f8-4a01-ab14-2081748ef38a",
          "TextContent": " text and "
        },
        {
          "NodeName": "Emphasis",
          "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
              "TextContent": "italic"
            }
          ]
        },
        {
          "NodeName": "Text",
          "Guid": "fa6d4496-d1dd-41ad-b482-dbfaaf5f6f13",
          "TextContent": " text."
        }
      ]);
      mockHigherLevelChildren[1].Children = mockChildren;
      mockChildren[3] = mockChild;
  
      const result = insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText(
        mockParent, mockChild, mockContainer, containerIndex, mockHistoryManager as IHistoryManager, higherLevelIndex, mockHigherLevelChildren, mockChildren, startOffset, 'a');
  
      
      expect(mockChildren[3].Children[0].TextContent).toBe('ita');
      expect(mockHistoryManager.recordChildInsertAfter).toHaveBeenCalledTimes(2);
      expect(result).not.toBeNull();
      expect(result!.type).toBe('higherLevelSplit');
      expect(result!.nodes.length).toBe(3);
      expect(result!).toStrictEqual({
        "type": "higherLevelSplit",
        "nodes": [
          {
            "NodeName": "BlankLine",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "e8e90704-dd7a-4c19-ae5c-7e7867d4195e",
            "Depth": 0,
            "TextContent": null,
            "Children": []
          },
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 1,
            "Guid": "8b50e804-f1d7-430e-9f07-ce6cb0bef070",
            "Depth": 0,
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
                "Depth": 0,
                "TextContent": "This is a paragraph with ",
                "Children": []
              },
              {
                "NodeName": "Strong",
                "Attributes": {},
                "ChildIndex": 1,
                "Guid": "9832bb55-81ec-4727-87c2-21c44d151623",
                "Depth": 0,
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "1a88c03b-0eb7-447b-ade1-aed99843901f",
                    "Depth": 1,
                    "TextContent": "bold",
                    "Children": []
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 2,
                "Guid": "1b1dfb46-53f8-4a01-ab14-2081748ef38a",
                "Depth": 0,
                "TextContent": " text and ",
                "Children": []
              },
              {
                "NodeName": "Emphasis",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
                "Depth": 0,
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
                    "Depth": 1,
                    "TextContent": "ita",
                    "Children": []
                  }
                ]
              },
              {
                "NodeName": "Strong",
                "Guid": "mock-key",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [
                  {
                    "NodeName": "Emphasis",
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
                ],
                "TextContent": null,
                "Version": "V0"
              },
              {
                "NodeName": "Emphasis",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "mock-key",
                "Depth": 0,
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "mock-key",
                    "Depth": 1,
                    "TextContent": "lic",
                    "Children": []
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 4,
                "Guid": "fa6d4496-d1dd-41ad-b482-dbfaaf5f6f13",
                "Depth": 0,
                "TextContent": " text.",
                "Children": []
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Attributes": {},
            "ChildIndex": 2,
            "Guid": "35e062d2-3b3c-4ca5-9084-b604c97ea239",
            "Depth": 0,
            "TextContent": null,
            "Children": []
          }
        ]
      }
      );
    });

    it('updates text and calls history manager correctly for startOffset === 0', () => {
      const mockHistoryManager: IHistoryManagerRecorder = {
          recordChildReplace: vi.fn(),
          recordChildTextUpdate: vi.fn((oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null) => 
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
    const mockParent = mockCustomElement({
      "nodeName": "EM",
      "childNodes": [
        {
          "nodeName": "#text",
          "childNodes": [],
          "textContent": "italic"
        }
      ]
    });
    const mockChild = toMockAst({
      "NodeName": "Emphasis",
      "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
      "Children": [
        {
          "NodeName": "Text",
          "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
          "TextContent": "italic"
        }
      ]
    });
    const mockContainer = mockCustomElement({
      "nodeName": "#text",
      "childNodes": [],
      "textContent": "italic"
    });
    const startOffset = 0;
    const higherLevelIndex = 1;
    const containerIndex = 0;
    const mockHigherLevelChildren = toMockAstArray([
      {
        "NodeName": "BlankLine",
        "Guid": "e8e90704-dd7a-4c19-ae5c-7e7867d4195e"
      },
      {
        "NodeName": "ParagraphBlock",
        "Guid": "8b50e804-f1d7-430e-9f07-ce6cb0bef070",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
            "TextContent": "This is a paragraph with "
          },
          {
            "NodeName": "Strong",
            "Guid": "9832bb55-81ec-4727-87c2-21c44d151623",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "1a88c03b-0eb7-447b-ade1-aed99843901f",
                "TextContent": "bold"
              }
            ]
          },
          {
            "NodeName": "Text",
            "Guid": "1b1dfb46-53f8-4a01-ab14-2081748ef38a",
            "TextContent": " text and "
          },
          {
            "NodeName": "Emphasis",
            "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
                "TextContent": "italic"
              }
            ]
          },
          {
            "NodeName": "Text",
            "Guid": "fa6d4496-d1dd-41ad-b482-dbfaaf5f6f13",
            "TextContent": " text."
          }
        ]
      },
      {
        "NodeName": "BlankLine",
        "Guid": "35e062d2-3b3c-4ca5-9084-b604c97ea239"
      }
    ]);
    const mockChildren = toMockAstArray([
      {
        "NodeName": "Text",
        "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
        "TextContent": "This is a paragraph with "
      },
      {
        "NodeName": "Strong",
        "Guid": "9832bb55-81ec-4727-87c2-21c44d151623",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "1a88c03b-0eb7-447b-ade1-aed99843901f",
            "TextContent": "bold"
          }
        ]
      },
      {
        "NodeName": "Text",
        "Guid": "1b1dfb46-53f8-4a01-ab14-2081748ef38a",
        "TextContent": " text and "
      },
      {
        "NodeName": "Emphasis",
        "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
            "TextContent": "italic"
          }
        ]
      },
      {
        "NodeName": "Text",
        "Guid": "fa6d4496-d1dd-41ad-b482-dbfaaf5f6f13",
        "TextContent": " text."
      }
    ]);
    mockHigherLevelChildren[1].Children = mockChildren;
    mockChildren[3] = mockChild;

    const result = insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText(
      mockParent, mockChild, mockContainer, containerIndex, mockHistoryManager as IHistoryManager, higherLevelIndex, mockHigherLevelChildren, mockChildren, startOffset, 'a');

    
    expect(mockChildren[3].Children[0].TextContent).toBe('italic');
    expect(mockHistoryManager.recordChildInsertBefore).toHaveBeenCalledTimes(1);
    expect(result).not.toBeNull();
    expect(result!.type).toBe('higherLevelSplitOrMove');
    expect(result!.nodes.length).toBe(3);
    expect(result!).toStrictEqual({
      "type": "higherLevelSplitOrMove",
      "nodes": [
        {
          "NodeName": "BlankLine",
          "Attributes": {},
          "ChildIndex": 0,
          "Guid": "e8e90704-dd7a-4c19-ae5c-7e7867d4195e",
          "Depth": 0,
          "TextContent": null,
          "Children": []
        },
        {
          "NodeName": "ParagraphBlock",
          "Attributes": {},
          "ChildIndex": 1,
          "Guid": "8b50e804-f1d7-430e-9f07-ce6cb0bef070",
          "Depth": 0,
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
              "Depth": 0,
              "TextContent": "This is a paragraph with ",
              "Children": []
            },
            {
              "NodeName": "Strong",
              "Attributes": {},
              "ChildIndex": 1,
              "Guid": "9832bb55-81ec-4727-87c2-21c44d151623",
              "Depth": 0,
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Text",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Guid": "1a88c03b-0eb7-447b-ade1-aed99843901f",
                  "Depth": 1,
                  "TextContent": "bold",
                  "Children": []
                }
              ]
            },
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 2,
              "Guid": "1b1dfb46-53f8-4a01-ab14-2081748ef38a",
              "Depth": 0,
              "TextContent": " text and ",
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
                  "NodeName": "Emphasis",
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
              ],
              "TextContent": null,
              "Version": "V0"
            },
            {
              "NodeName": "Emphasis",
              "Attributes": {},
              "ChildIndex": 0,
              "Guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
              "Depth": 0,
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Text",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Guid": "d5df2a43-7bc6-4511-8d88-ba592268f0cc",
                  "Depth": 1,
                  "TextContent": "italic",
                  "Children": []
                }
              ]
            },
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 4,
              "Guid": "fa6d4496-d1dd-41ad-b482-dbfaaf5f6f13",
              "Depth": 0,
              "TextContent": " text.",
              "Children": []
            }
          ]
        },
        {
          "NodeName": "BlankLine",
          "Attributes": {},
          "ChildIndex": 2,
          "Guid": "35e062d2-3b3c-4ca5-9084-b604c97ea239",
          "Depth": 0,
          "TextContent": null,
          "Children": []
        }
      ]
    }
    );
  });
  });