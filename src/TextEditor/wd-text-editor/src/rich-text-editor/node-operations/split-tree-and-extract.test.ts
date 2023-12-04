import { vi } from "vitest";
import { splitTreeAndExtract } from ".";
import { mockAstData, mockTargetAst } from "../../__mocks__/editor-mocks";
import { cleanup } from "../../utils/test-utils";

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
  
describe('splitTreeAndExtract', () => {
    it('splits the tree and extracts text correctly', () => {
      const root = mockAstData;
      const target = mockTargetAst;
  
      const [leftTree, rightTree, extractedText] = splitTreeAndExtract(root, target, 2, 5);
  
      // Assert the structure of leftTree, rightTree, and the extractedText
      expect(leftTree).toEqual({
        "NodeName": "MarkdownDocument",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 0,
        "Guid": "e6e62837-f528-4eed-a9a2-43025c44cbb0",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 1,
            "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Strong",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
                    "TextContent": "Th",
                    "Children": []
                  }
                ]
              }
            ]
          }
        ]
      });
      expect(rightTree).toEqual({
        "NodeName": "MarkdownDocument",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 0,
        "Guid": "mock-key",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 1,
            "Guid": "mock-key",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Strong",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "mock-key",
                    "TextContent": "is a paragraph with both ",
                    "Children": []
                  },
                  {
                    "NodeName": "Strong",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "mock-key",
                    "TextContent": null,
                    "Children": [
                      {
                        "NodeName": "Emphasis",
                        "Attributes": {},
                        "ChildIndex": 0,
                        "Depth": 4,
                        "Guid": "mock-key",
                        "TextContent": null,
                        "Children": [
                          {
                            "NodeName": "Text",
                            "Attributes": {},
                            "ChildIndex": 0,
                            "Depth": 5,
                            "Guid": "mock-key",
                            "TextContent": "bold and italic",
                            "Children": []
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "mock-key",
                    "TextContent": " text",
                    "Children": []
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "This is another paragraph.",
                "Children": []
              }
            ]
          },
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 2,
            "Depth": 1,
            "Guid": "mock-key",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Strong",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "mock-key",
                    "TextContent": "of bold text",
                    "Children": []
                  }
                ]
              }
            ]
          },
          {
            "NodeName": "HeadingBlock",
            "Attributes": {
              "Level": "2"
            },
            "ChildIndex": 36,
            "Depth": 1,
            "Guid": "mock-key",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "Links",
                "Children": []
              }
            ]
          },
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 2,
            "Depth": 1,
            "Guid": "mock-key",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "This is a ",
                "Children": []
              },
              {
                "NodeName": "Link",
                "Attributes": {
                  "Url": "https://openai.com",
                  "Title": ""
                },
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "mock-key",
                    "TextContent": "link ",
                    "Children": []
                  },
                  {
                    "NodeName": "Strong",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "mock-key",
                    "TextContent": null,
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Attributes": {},
                        "ChildIndex": 0,
                        "Depth": 4,
                        "Guid": "mock-key",
                        "TextContent": "to",
                        "Children": []
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 3,
                    "Guid": "mock-key",
                    "TextContent": " OpenAI",
                    "Children": []
                  }
                ]
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": ".",
                "Children": []
              }
            ]
          },
          {
            "NodeName": "HeadingBlock",
            "Attributes": {
              "Level": "2"
            },
            "ChildIndex": 40,
            "Depth": 1,
            "Guid": "mock-key",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "JavaScript Code Block",
                "Children": []
              }
            ]
          },
          {
            "NodeName": "FencedCodeBlock",
            "Attributes": {
              "Language": "javascript"
            },
            "ChildIndex": 44,
            "Depth": 1,
            "Guid": "mock-key",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "console.log('Hello, world!');",
                "Children": []
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 1,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "\n",
                "Children": []
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 2,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "console.log('This is line 2!');",
                "Children": []
              }
            ]
          },
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 46,
            "Depth": 1,
            "Guid": "mock-key",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 2,
                "Guid": "mock-key",
                "TextContent": "This is another paragraph.",
                "Children": []
              }
            ]
          }
        ]
      });
      expect(extractedText).toBe('is ');
    });
  
    // Add more tests for different scenarios
  });