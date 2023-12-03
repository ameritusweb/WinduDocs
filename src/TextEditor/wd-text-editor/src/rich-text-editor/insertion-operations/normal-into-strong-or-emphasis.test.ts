import { vi } from "vitest";
import { AstNode, IHistoryManager, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { cleanup, mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { insertNormalTextIntoEitherStrongOrEmphasisText, insertNormalTextIntoOtherNormalText, insertTextIntoEitherACodeBlockOrAlertBlock } from ".";

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
  
describe('insertNormalTextIntoStrongOrEmphasisText', () => {
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
        "textContent": "of bold text"
      });
      const startOffset = 6;
      const mockChild = toMockAst({
        "NodeName": "Strong",
        "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
            "TextContent": "of bold text"
          }
        ]
      });
      const mockHigherLevelChildren = toMockAstArray(
        [
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
      mockHigherLevelChildren[1].Children = mockChildren;
      mockChildren[0] = mockChild;
  
      const result = insertNormalTextIntoEitherStrongOrEmphasisText(
        mockContainer, startOffset, mockHistoryManager as IHistoryManager, 1, mockChild, 0, mockHigherLevelChildren, mockChildren, 'a'
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