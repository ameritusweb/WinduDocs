import { vi } from "vitest";
import { AstNode, IHistoryManager, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { cleanup, mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { insertNormalTextIntoBothStrongAndEmphasisText, insertNormalTextIntoEitherStrongOrEmphasisText, insertNormalTextIntoOtherNormalText, insertTextIntoEitherACodeBlockOrAlertBlock } from ".";

vi.mock('../node-operations/generate-key', () => {
    return {
      __esModule: true, // This property is important for mocking default exports
      default: vi.fn().mockReturnValue('mock-key') // Mock implementation
    };
  });

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('insertNormalTextIntoBothStrongAndEmphasisText', () => {
    it('updates text and calls history manager correctly', () => {
        const mockHistoryManager: IHistoryManagerRecorder = {
            recordChildReplace: vi.fn(),
            recordChildTextUpdate: vi.fn((oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string) => 
            {  
                expect(offset).toBe(17);
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
        "textContent": "bold and italic"
      });
      const startOffset = 2;
      const mockAstParent = toMockAst(
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
          }
      );
      const mockHigherLevelChildren = toMockAstArray(
        [
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
          ]
      );
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
      ]);
      mockHigherLevelChildren[0].Children = mockChildren;
      mockChildren[0].Children[1] = mockAstParent;
  
      const result = insertNormalTextIntoBothStrongAndEmphasisText(
        mockContainer, startOffset, mockHistoryManager as IHistoryManager, 0, mockAstParent, 0, mockHigherLevelChildren, mockChildren, 'a'
      );
  
      // Assertions here
      // expect(mockGrandChild.TextContent).toBe('This is a third paaragraph');
      expect(mockHistoryManager.recordChildInsertAfter).toHaveBeenCalledTimes(2);
      expect(result!.type).toBe('higherLevelSplit');
      expect(result!.nodes.length).toBe(3);
      console.log('normal into strong or emphasis');
      console.log(JSON.stringify(result, null, 2));
      expect(result).toStrictEqual({
        "type": "higherLevelSplit",
        "nodes": [
          {
            "NodeName": "BlankLine",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
            "Depth": 0,
            "TextContent": null,
            "Children": []
          },
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 1,
            "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
            "Depth": 0,
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Strong",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
                "Depth": 0,
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
                    "Depth": 1,
                    "TextContent": "of bol",
                    "Children": []
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Guid": "mock-key",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "a",
                "Version": "V0"
              },
              {
                "NodeName": "Strong",
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
                    "TextContent": "d text",
                    "Children": []
                  }
                ]
              }
            ]
          },
          {
            "NodeName": "BlankLine",
            "Attributes": {},
            "ChildIndex": 2,
            "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a",
            "Depth": 0,
            "TextContent": null,
            "Children": []
          }
        ]
      }
      );
    });
  });