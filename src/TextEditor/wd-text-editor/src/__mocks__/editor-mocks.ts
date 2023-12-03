import { AstNode } from "../components/wysiwyg/interface";

export const mockUseParagraphData: AstNode[] = [
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 0,
    "Guid": "a8b579d3-93c2-4837-8731-34fa04badb8f",
    "Depth": 1,
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Strong",
        "Attributes": {},
        "ChildIndex": 0,
        "Guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
        "Depth": 2,
        "TextContent": null,
        "Children": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
            "Depth": 3,
            "TextContent": "This is a paragraph with both ",
            "Children": []
          },
          {
            "NodeName": "Strong",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
            "Depth": 3,
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Emphasis",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                "Depth": 4,
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
                    "Depth": 5,
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
            "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
            "Depth": 3,
            "TextContent": " text",
            "Children": []
          }
        ]
      },
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
        "Depth": 2,
        "TextContent": "This is another paragraph.",
        "Children": []
      }
    ]
  },
  {
    "NodeName": "BlankLine",
    "Attributes": {},
    "ChildIndex": 1,
    "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
    "Depth": 1,
    "TextContent": null,
    "Children": []
  },
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 2,
    "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
    "Depth": 1,
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Strong",
        "Attributes": {},
        "ChildIndex": 0,
        "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
        "Depth": 2,
        "TextContent": null,
        "Children": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
            "Depth": 3,
            "TextContent": "of bold text",
            "Children": []
          }
        ]
      }
    ]
  },
  {
    "NodeName": "BlankLine",
    "Attributes": {},
    "ChildIndex": 3,
    "Guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a",
    "Depth": 1,
    "TextContent": null,
    "Children": []
  },
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 4,
    "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
    "Depth": 1,
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
        "Depth": 2,
        "TextContent": "This is a third paragraph",
        "Children": []
      }
    ]
  },
  {
    "NodeName": "BlankLine",
    "Attributes": {},
    "ChildIndex": 5,
    "Guid": "6649ce34-ee3e-4ecc-b87a-a9bfea8a72a5",
    "Depth": 1,
    "TextContent": null,
    "Children": []
  },
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 6,
    "Guid": "5a079a29-5e17-480b-bfb2-7fdad1844130",
    "Depth": 1,
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Guid": "8d771b9b-622d-462d-9788-3b25e2a335ef",
        "Depth": 2,
        "TextContent": "This is an inline code example: ",
        "Children": []
      },
      {
        "NodeName": "CodeInline",
        "Attributes": {},
        "ChildIndex": 0,
        "Guid": "077cfba4-d7b0-4dca-9660-a6fec0243947",
        "Depth": 2,
        "TextContent": "let x = 5;",
        "Children": []
      }
    ]
  },
  {
    "NodeName": "BlankLine",
    "Attributes": {},
    "ChildIndex": 7,
    "Guid": "078ac8ba-fd8d-4166-aa4d-90ba955d11b5",
    "Depth": 1,
    "TextContent": null,
    "Children": []
  }
];

export const mockBlankLineData: AstNode[] = [
  {
    "NodeName": "BlankLine",
    "Attributes": {},
    "ChildIndex": 41,
    "Depth": 1,
    "Guid": "e6b4cd51-3bf0-4eb9-94cf-7d56565de739",
    "TextContent": null,
    "Children": []
  }
];

export const mockSplitTreeData: AstNode = {
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
          "TextContent": "This is a paragraph with both ",
          "Children": []
        },
        {
          "NodeName": "Strong",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 3,
          "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Emphasis",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 4,
              "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Text",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Depth": 5,
                  "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
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
          "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
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
      "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
      "TextContent": "This is another paragraph.",
      "Children": []
    }
  ]
};

export const mockTableRowData: AstNode[] = [
  {
    "NodeName": "TableCell",
    "Attributes": {},
    "ChildIndex": 0,
    "Depth": 3,
    "Guid": "c97f7054-5e6d-4f66-8ad5-5ce8cc5f98f8",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "ParagraphBlock",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 4,
        "Guid": "fb55ae40-d380-4e1f-b9a7-3ecfeb9e5877",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 5,
            "Guid": "b108689a-e778-4ff0-90fd-e6b26ced337b",
            "TextContent": "Header 1",
            "Children": []
          }
        ]
      }
    ]
  },
  {
    "NodeName": "TableCell",
    "Attributes": {},
    "ChildIndex": 1,
    "Depth": 3,
    "Guid": "b45b5ac2-2b35-4cc1-9a10-835d450dd500",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "ParagraphBlock",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 4,
        "Guid": "aeafe6b1-1a05-4999-9fa4-569063c5b2ef",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 5,
            "Guid": "1d2c1b2d-dcd9-425f-9399-15e975a578b0",
            "TextContent": "Header 2",
            "Children": []
          }
        ]
      }
    ]
  }
];

export const mockStrongData: AstNode[] = [
  {
    "NodeName": "Text",
    "Attributes": {},
    "ChildIndex": 0,
    "Depth": 3,
    "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
    "TextContent": "This is a paragraph with both ",
    "Children": []
  },
  {
    "NodeName": "Strong",
    "Attributes": {},
    "ChildIndex": 0,
    "Depth": 3,
    "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Emphasis",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 4,
        "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 5,
            "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
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
    "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
    "TextContent": " text",
    "Children": []
  }
];

export const mockTargetAst: AstNode = {
  "NodeName": "Text",
  "Attributes": {},
  "ChildIndex": 0,
  "Depth": 3,
  "Guid": "ffcf0896-aa89-4a97-989c-ce4001943443",
  "TextContent": "This is a paragraph with both ",
  "Children": []
};

export const mockAstData: AstNode = {
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
              "TextContent": "This is a paragraph with both ",
              "Children": []
            },
            {
              "NodeName": "Strong",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 3,
              "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Emphasis",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Depth": 4,
                  "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                  "TextContent": null,
                  "Children": [
                    {
                      "NodeName": "Text",
                      "Attributes": {},
                      "ChildIndex": 0,
                      "Depth": 5,
                      "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
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
              "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
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
          "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
          "TextContent": "This is another paragraph.",
          "Children": []
        }
      ]
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 1,
      "Depth": 1,
      "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "ParagraphBlock",
      "Attributes": {},
      "ChildIndex": 2,
      "Depth": 1,
      "Guid": "09621212-5193-46b4-a626-1dd15f4fc8d9",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "Strong",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 2,
          "Guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 3,
              "Guid": "20a3b3a6-c02a-479d-a04e-ec2e18993714",
              "TextContent": "of bold text",
              "Children": []
            }
          ]
        }
      ]
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 35,
      "Depth": 1,
      "Guid": "44d8b9c0-2f7e-479c-a8d6-63cde7858f63",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "HeadingBlock",
      "Attributes": {
        "Level": "2"
      },
      "ChildIndex": 36,
      "Depth": 1,
      "Guid": "de70cd1e-14e4-4658-a27d-64ea829b20da",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 2,
          "Guid": "98e2e235-1fa7-4d2b-b3e3-d0db5d062e6f",
          "TextContent": "Links",
          "Children": []
        }
      ]
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 37,
      "Depth": 1,
      "Guid": "fb49e62d-c3e4-49c6-b5a6-5d97ae0715b6",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "ParagraphBlock",
      "Attributes": {},
      "ChildIndex": 2,
      "Depth": 1,
      "Guid": "933e7e88-4f0e-450d-bb98-e1e0923775ff",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 2,
          "Guid": "a859ffb8-bca7-44f8-9099-298a79d460eb",
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
          "Guid": "e35c5573-c64c-4e55-bc2e-cd718b1477c6",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 3,
              "Guid": "ceef33be-e178-4409-98e7-8a005d7779a8",
              "TextContent": "link ",
              "Children": []
            },
            {
              "NodeName": "Strong",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 3,
              "Guid": "8d88dd2f-9a11-42f8-a307-cae2347c4401",
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Text",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Depth": 4,
                  "Guid": "99fec446-d572-4188-9c30-4c4725ca44b8",
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
              "Guid": "d3d9bf5c-581a-4704-b683-f075a98f75bc",
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
          "Guid": "c074017a-c58b-4110-b249-90e1caa38cd6",
          "TextContent": ".",
          "Children": []
        }
      ]
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 39,
      "Depth": 1,
      "Guid": "ba16b5c1-d178-4ba0-8fb3-f2fa70b3fab4",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "HeadingBlock",
      "Attributes": {
        "Level": "2"
      },
      "ChildIndex": 40,
      "Depth": 1,
      "Guid": "4a14fe93-9c1f-4f79-a932-ade8c81e8e80",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 2,
          "Guid": "fcdd8cf5-4e23-4e2b-b67a-25483a4f932d",
          "TextContent": "JavaScript Code Block",
          "Children": []
        }
      ]
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 41,
      "Depth": 1,
      "Guid": "e6b4cd51-3bf0-4eb9-94cf-7d56565de739",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "ThematicBreakBlock",
      "Attributes": {},
      "ChildIndex": 42,
      "Depth": 1,
      "Guid": "07c2ad41-7426-428a-a537-f50a1d64a1c5",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 43,
      "Depth": 1,
      "Guid": "2a85d51a-ebf0-4bd7-a82d-64b062e61fac",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "FencedCodeBlock",
      "Attributes": {
        "Language": "javascript"
      },
      "ChildIndex": 44,
      "Depth": 1,
      "Guid": "ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 2,
          "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
          "TextContent": "console.log(\u0027Hello, world!\u0027);",
          "Children": []
        },
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 1,
          "Depth": 2,
          "Guid": "b7ea8d0a-fa75-4c41-b503-52be791878f1",
          "TextContent": "\n",
          "Children": []
        },
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 2,
          "Depth": 2,
          "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
          "TextContent": "console.log(\u0027This is line 2!\u0027);",
          "Children": []
        }
      ]
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 45,
      "Depth": 1,
      "Guid": "d5bd73bc-b3d9-4b4f-8353-f4e29580630c",
      "TextContent": null,
      "Children": []
    },
    {
      "NodeName": "ParagraphBlock",
      "Attributes": {},
      "ChildIndex": 46,
      "Depth": 1,
      "Guid": "23afa210-4f5f-488a-80b4-9125f7709aeb",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 2,
          "Guid": "df07b30e-9fa6-49ed-9ddf-cbb9df145f2b",
          "TextContent": "This is another paragraph.",
          "Children": []
        }
      ]
    }
  ]
};

export const mockQuoteBlockData: AstNode[] = [
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 0,
    "Depth": 2,
    "Guid": "f36e3433-6aa5-4f2f-b5a4-7ddeb612472e",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 3,
        "Guid": "291b296b-99b1-4702-a119-0c062a3a5500",
        "TextContent": "This is a blockquote.",
        "Children": []
      }
    ]
  },
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 1,
    "Depth": 2,
    "Guid": "fb9671fa-a0c0-494c-a56f-0b214482e8bd",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 3,
        "Guid": "0aef21a1-5e28-4074-afc7-086140b0f28d",
        "TextContent": "It can span",
        "Children": []
      }
    ]
  },
  {
    "NodeName": "FakeNode",
    "Attributes": {},
    "ChildIndex": 0,
    "Depth": 3,
    "Guid": "1aef21a1-5e28-4074-afc7-086140b0f28d",
    "TextContent": "",
    "Children": []
  }
]

export const mockHigherLevelParagraphData: AstNode[] = [
    {
      "NodeName": "ParagraphBlock",
      "Attributes": {},
      "ChildIndex": 0,
      "Depth": 1,
      "Guid": "B123456-123456",
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
              "TextContent": "This is a paragraph with both ",
              "Children": []
            },
            {
              "NodeName": "Strong",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 3,
              "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Emphasis",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Depth": 4,
                  "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
                  "TextContent": null,
                  "Children": [
                    {
                      "NodeName": "Text",
                      "Attributes": {},
                      "ChildIndex": 0,
                      "Depth": 5,
                      "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
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
              "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
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
          "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
          "TextContent": "This is another paragraph.",
          "Children": []
        }
      ]
    },
    {
      "NodeName": "BlankLine",
      "Attributes": {},
      "ChildIndex": 1,
      "Depth": 1,
      "Guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
      "TextContent": null,
      "Children": []
    }
];

export const mockParagraphData: AstNode[] = [
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
        "TextContent": "This is a paragraph with both ",
        "Children": []
      },
      {
        "NodeName": "Strong",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 3,
        "Guid": "87c121eb-c1dd-4311-b0b7-31ff22564cc9",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "Emphasis",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 4,
            "Guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 5,
                "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
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
        "Guid": "616cd0ab-ad17-4914-93ff-fb9b699d83bb",
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
    "Guid": "d8d85efd-f787-4ad5-915e-d15f7face731",
    "TextContent": "This is another paragraph.",
    "Children": []
  }
];

export const mockTableCellData: AstNode[] = [
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 0,
    "Depth": 4,
    "Guid": "fb55ae40-d380-4e1f-b9a7-3ecfeb9e5877",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 5,
        "Guid": "b108689a-e778-4ff0-90fd-e6b26ced337b",
        "TextContent": "Header 1",
        "Children": []
      }
    ]
  }
];

export const mockTableData: AstNode[] = [{
  "NodeName": "TableRow",
  "Attributes": {
    "IsHeader": "True"
  },
  "ChildIndex": 0,
  "Depth": 2,
  "Guid": "88fb8f2c-865f-4676-890c-2a369bbd3989",
  "TextContent": null,
  "Children": [
    {
      "NodeName": "TableCell",
      "Attributes": {},
      "ChildIndex": 0,
      "Depth": 3,
      "Guid": "c97f7054-5e6d-4f66-8ad5-5ce8cc5f98f8",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "ParagraphBlock",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 4,
          "Guid": "fb55ae40-d380-4e1f-b9a7-3ecfeb9e5877",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "b108689a-e778-4ff0-90fd-e6b26ced337b",
              "TextContent": "Header 1",
              "Children": []
            }
          ]
        }
      ]
    },
    {
      "NodeName": "TableCell",
      "Attributes": {},
      "ChildIndex": 1,
      "Depth": 3,
      "Guid": "b45b5ac2-2b35-4cc1-9a10-835d450dd500",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "ParagraphBlock",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 4,
          "Guid": "aeafe6b1-1a05-4999-9fa4-569063c5b2ef",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "1d2c1b2d-dcd9-425f-9399-15e975a578b0",
              "TextContent": "Header 2",
              "Children": []
            }
          ]
        }
      ]
    }
  ]
},
{
  "NodeName": "TableRow",
  "Attributes": {
    "IsHeader": "False"
  },
  "ChildIndex": 1,
  "Depth": 2,
  "Guid": "bcac1cb5-b9ea-40cc-9199-9a5ae1d71eff",
  "TextContent": null,
  "Children": [
    {
      "NodeName": "TableCell",
      "Attributes": {},
      "ChildIndex": 0,
      "Depth": 3,
      "Guid": "032522ad-17c1-4115-b6f0-d3da4ee71ced",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "ParagraphBlock",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 4,
          "Guid": "4051dbc9-7175-400a-8955-382a4223913a",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "6cf3cb6f-541e-4b1e-aee1-0101b68d5c19",
              "TextContent": "Row 1 ",
              "Children": []
            },
            {
              "NodeName": "Strong",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "48633e86-73f4-46f8-9f67-0d23aa14af8c",
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Text",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Depth": 6,
                  "Guid": "1ca7af2e-425b-4fdb-8c1c-6271630a5533",
                  "TextContent": "test",
                  "Children": []
                }
              ]
            },
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "8e7d1d59-733e-451b-a925-2473ee2ed016",
              "TextContent": "",
              "Children": []
            }
          ]
        }
      ]
    },
    {
      "NodeName": "TableCell",
      "Attributes": {},
      "ChildIndex": 1,
      "Depth": 3,
      "Guid": "94b4f038-49ef-4907-a33b-3afb6a15429d",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "ParagraphBlock",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 4,
          "Guid": "c38d4410-1355-4bf8-a698-ee62e01cce9e",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "67462e1f-f31d-4b3f-b05a-ec16b3f8c2d2",
              "TextContent": "Data 1 ",
              "Children": []
            },
            {
              "NodeName": "Emphasis",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "ef66ccf1-9bb7-4942-abf8-2e3336e3ef20",
              "TextContent": null,
              "Children": [
                {
                  "NodeName": "Text",
                  "Attributes": {},
                  "ChildIndex": 0,
                  "Depth": 6,
                  "Guid": "8a18ae23-a987-4255-bb85-9cea3c7e59ea",
                  "TextContent": "test",
                  "Children": []
                }
              ]
            },
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "001c76be-40f0-4f48-9ecb-8f9af04987ff",
              "TextContent": "",
              "Children": []
            }
          ]
        }
      ]
    }
  ]
},
{
  "NodeName": "TableRow",
  "Attributes": {
    "IsHeader": "False"
  },
  "ChildIndex": 2,
  "Depth": 2,
  "Guid": "9ce63d78-1a67-43c8-82f6-eae20b3ccd3e",
  "TextContent": null,
  "Children": [
    {
      "NodeName": "TableCell",
      "Attributes": {},
      "ChildIndex": 0,
      "Depth": 3,
      "Guid": "311cd216-16ce-4b8d-babe-829a44004d93",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "ParagraphBlock",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 4,
          "Guid": "0f23dee0-fe5a-4b29-92e4-d117d1d574fd",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "10f9128c-9e58-4f66-9c70-52fcddbffd7c",
              "TextContent": "Row 2",
              "Children": []
            }
          ]
        }
      ]
    },
    {
      "NodeName": "TableCell",
      "Attributes": {},
      "ChildIndex": 1,
      "Depth": 3,
      "Guid": "3bcdd82b-9254-491f-9755-f5f6cea9ab0a",
      "TextContent": null,
      "Children": [
        {
          "NodeName": "ParagraphBlock",
          "Attributes": {},
          "ChildIndex": 0,
          "Depth": 4,
          "Guid": "914db2c8-12a1-4f6d-8c2d-ad3923cd943b",
          "TextContent": null,
          "Children": [
            {
              "NodeName": "Text",
              "Attributes": {},
              "ChildIndex": 0,
              "Depth": 5,
              "Guid": "1fc92807-a2fd-46a3-a920-f0082e95821c",
              "TextContent": "Data 2",
              "Children": []
            }
          ]
        }
      ]
    }
  ]
},
{
  "NodeName": "FakeNode",
  "Attributes": {},
  "ChildIndex": 0,
  "Depth": 5,
  "Guid": "2fc92807-a2fd-46a3-a920-f0082e95821c",
  "TextContent": "",
  "Children": []
}
];

export const mockListData: AstNode[] = [
    {
        "NodeName": "ListItemBlock",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 2,
        "Guid": "f4aacb6d-d6de-45fb-8085-ec539bb29d02",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 3,
            "Guid": "9913f879-c7fa-45f0-a40d-4f7d10d0ae5e",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 4,
                "Guid": "c11ce1a9-5bcc-487c-842a-1a554f77e85d",
                "TextContent": "First level ordered item",
                "Children": []
              }
            ]
          },
          {
            "NodeName": "ListBlock",
            "Attributes": {
              "IsOrdered": "False"
            },
            "ChildIndex": 1,
            "Depth": 3,
            "Guid": "241748ef-a575-42c7-bb86-049a4990d93a",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "ListItemBlock",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 4,
                "Guid": "29bfcaaa-cecf-421f-988e-d73639a26ea0",
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "ParagraphBlock",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 5,
                    "Guid": "fcd8b871-15ed-4db0-a8e3-77511d8f75ad",
                    "TextContent": null,
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Attributes": {},
                        "ChildIndex": 0,
                        "Depth": 6,
                        "Guid": "754cd07c-ed54-4cbd-8bdc-b6fcf6946558",
                        "TextContent": "First level unordered item",
                        "Children": []
                      }
                    ]
                  }
                ]
              },
              {
                "NodeName": "ListItemBlock",
                "Attributes": {},
                "ChildIndex": 1,
                "Depth": 4,
                "Guid": "eaae6ab8-421b-4174-8172-22c3d83b6f27",
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "ParagraphBlock",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 5,
                    "Guid": "e4d786f7-a9fa-4bd8-acfe-f18952ba2cfe",
                    "TextContent": null,
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Attributes": {},
                        "ChildIndex": 0,
                        "Depth": 6,
                        "Guid": "bdfc05bb-02db-4403-80f0-6693700f0114",
                        "TextContent": "Another first level unordered item",
                        "Children": []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "NodeName": "ListItemBlock",
        "Attributes": {},
        "ChildIndex": 1,
        "Depth": 2,
        "Guid": "742d934b-a262-45de-99df-c09f977d600d",
        "TextContent": null,
        "Children": [
          {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 0,
            "Depth": 3,
            "Guid": "6ca75716-a620-4f88-a35c-61cd7699bc39",
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 4,
                "Guid": "55a7c878-0cd0-4763-9152-04dae2d605d5",
                "TextContent": "Second level ordered item",
                "Children": []
              }
            ]
          }
        ]
      },
      {
        "NodeName": "FakeNode",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 2,
        "Guid": "fe891315-9518-4872-9a94-be019bd68e38",
        "TextContent": "Sample Markdown",
        "Children": []
      }
];

export const mockHeadingData: AstNode[] = [
    {
      "NodeName": "Text",
      "Attributes": {},
      "ChildIndex": 0,
      "Depth": 2,
      "Guid": "fe891315-9518-4872-9a94-be019bd68e38",
      "TextContent": "Sample Markdown",
      "Children": []
    }
  ];

export const mockEmphasisData: AstNode[] = [
    {
      "NodeName": "Text",
      "Attributes": {},
      "ChildIndex": 0,
      "Depth": 5,
      "Guid": "2a2c1af5-8ee8-4963-b888-50788959963f",
      "TextContent": "bold and italic",
      "Children": []
    }
  ];

export const mockHigherLevelCodeBlockData: AstNode[] = [
  {
    "NodeName": "FencedCodeBlock",
    "Attributes": {
      "Language": "javascript"
    },
    "ChildIndex": 44,
    "Depth": 1,
    "Guid": "ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 2,
        "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
        "TextContent": "console.log(\u0027Hello, world!\u0027);",
        "Children": []
      },
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 1,
        "Depth": 2,
        "Guid": "b7ea8d0a-fa75-4c41-b503-52be791878f1",
        "TextContent": "\n",
        "Children": []
      },
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 2,
        "Depth": 2,
        "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
        "TextContent": "console.log(\u0027This is line 2!\u0027);",
        "Children": []
      }
    ]
  },
  {
    "NodeName": "BlankLine",
    "Attributes": {},
    "ChildIndex": 45,
    "Depth": 1,
    "Guid": "d5bd73bc-b3d9-4b4f-8353-f4e29580630c",
    "TextContent": null,
    "Children": []
  },
  {
    "NodeName": "ParagraphBlock",
    "Attributes": {},
    "ChildIndex": 46,
    "Depth": 1,
    "Guid": "23afa210-4f5f-488a-80b4-9125f7709aeb",
    "TextContent": null,
    "Children": [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 2,
        "Guid": "df07b30e-9fa6-49ed-9ddf-cbb9df145f2b",
        "TextContent": "This is another paragraph.",
        "Children": []
      }
    ]
  }
];

export const mockInvalidData: AstNode[] = [
  {
    "NodeName": "InvalidNodeName",
    "Attributes": {},
    "ChildIndex": 0,
    "Depth": 2,
    "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
    "TextContent": "console.log(\u0027Hello, world!\u0027);",
    "Children": []
  }
];

export const mockCodeBlockData: AstNode[] = [
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 2,
        "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
        "TextContent": "console.log(\u0027Hello, world!\u0027);",
        "Children": []
      },
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 1,
        "Depth": 2,
        "Guid": "b7ea8d0a-fa75-4c41-b503-52be791878f1",
        "TextContent": "\n",
        "Children": []
      },
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 2,
        "Depth": 2,
        "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
        "TextContent": "console.log(\u0027This is line 2!\u0027);",
        "Children": []
      },
      {
        "NodeName": "FakeNode",
        "Attributes": {},
        "ChildIndex": 2,
        "Depth": 2,
        "Guid": "144a50aa-4fef-40cc-8bff-707e24c719fd",
        "TextContent": "",
        "Children": []
      }
    ];

const mockProcessedAstMap = new Map<string, number[]>();
mockProcessedAstMap.set('c069fb1b-83fc-4bd9-b1fb-f385f4150da1 0', [0,0]);
mockProcessedAstMap.set('9987ba9d-5a15-46eb-975f-3817f25b2185 0', [0,1]);
mockProcessedAstMap.set('c069fb1b-83fc-4bd9-b1fb-f385f4150da1 2', [0,2]);
mockProcessedAstMap.set('para_a8b579d3-93c2-4837-8731-34fa04badb8f 1', [0,3]);
mockProcessedAstMap.set('2bfdc093-0f70-4d86-a57c-5f16315187cf 0', [1,0]);
mockProcessedAstMap.set('cc4156fc-0d7d-46de-91f9-5206b3c1c912 0', [2,0]);
mockProcessedAstMap.set('6436b060-1804-4778-baec-1aaf8d4a9b9a 0', [3,0]);
mockProcessedAstMap.set('para_ac1f684e-57a4-464f-aa76-c751e7a36550 0', [4,0]);
mockProcessedAstMap.set('6649ce34-ee3e-4ecc-b87a-a9bfea8a72a5 0', [5,0]);
mockProcessedAstMap.set('para_5a079a29-5e17-480b-bfb2-7fdad1844130 0', [6,0]);
mockProcessedAstMap.set('code_077cfba4-d7b0-4dca-9660-a6fec0243947 0', [6,1]);
mockProcessedAstMap.set('078ac8ba-fd8d-4166-aa4d-90ba955d11b5 0', [7,0]);
mockProcessedAstMap.set('fb3f3d85-b999-407c-acbb-7b800bcfa4d6 0', [8,0]);
mockProcessedAstMap.set('a868c712-cb70-444b-a2a9-31a980119517 0', [9,0]);
mockProcessedAstMap.set('8feb61bb-648a-484b-ae01-6e2288cfd9cc 0', [10,0]);
mockProcessedAstMap.set('79a149b3-3921-40fc-b44d-8d27419d056a 0', [11,0]);
mockProcessedAstMap.set('59e03ba0-757b-481c-bd77-fc123b6da5c3 0', [12,0]);
mockProcessedAstMap.set('b7a7c223-0adc-4f33-91a9-c4446043f30e 0', [13,0]);
mockProcessedAstMap.set('0334e08d-3e0a-4157-90ca-733b2f116045 0', [14,0]);
mockProcessedAstMap.set('45575c23-9d26-4775-9383-71141258a4ac 0', [15,0]);
mockProcessedAstMap.set('para_ea4a6985-6427-406b-a0f8-a442515586fe 0', [16,0]);
mockProcessedAstMap.set('c33aa78d-0424-4557-b630-125f2bf30f7d 0', [16,1]);
mockProcessedAstMap.set('para_ea4a6985-6427-406b-a0f8-a442515586fe 2', [16,2]);
mockProcessedAstMap.set('para_ea4a6985-6427-406b-a0f8-a442515586fe 3', [16,3]);
mockProcessedAstMap.set('para_ea4a6985-6427-406b-a0f8-a442515586fe 4', [16,4]);
mockProcessedAstMap.set('17bb57a8-c2c7-488b-b334-bbf3fc344b2e 0', [17,0]);
mockProcessedAstMap.set('para_92138ccd-4d35-469c-8a32-bef9065c9bf2 0', [18,0]);
mockProcessedAstMap.set('code_49e68bf4-161c-45f9-8809-bad2dc263c34 0', [18,1]);
mockProcessedAstMap.set('619e381a-6b7c-49b3-a45b-3eb901bef881 0', [19,0]);
mockProcessedAstMap.set('para_c42f0313-cde7-4f11-994a-04aa0acd2286 0', [20,0]);
mockProcessedAstMap.set('para_76f515b4-81bb-407c-8847-90a6205f6bb8 0', [21,0]);
mockProcessedAstMap.set('para_cdbe18c9-cd16-40af-9fdd-a34da137a1d6 0', [22,0]);
mockProcessedAstMap.set('para_aa528d6a-af3d-4435-8e06-7b68051ce7e4 0', [23,0]);
mockProcessedAstMap.set('para_5c1c73ff-618e-40e8-a61f-89780cc84e6e 0', [24,0]);
mockProcessedAstMap.set('para_383b59d8-bdab-403d-b0ef-a4a2bf4c0328 0', [25,0]);
mockProcessedAstMap.set('para_f8a2e7e2-8dbf-4c70-937c-39cf1fa1b30a 0', [26,0]);
mockProcessedAstMap.set('para_26fe1ae4-a963-4363-8567-84ed93c567a0 0', [27,0]);
mockProcessedAstMap.set('para_26742b4f-992c-4550-beba-30b8260da0f1 0', [28,0]);
mockProcessedAstMap.set('para_4ee43ee0-cb6d-49de-8221-8bdd67702a95 0', [29,0]);
mockProcessedAstMap.set('para_684fe5b7-2995-49a6-becb-02d18f53177b 0', [30,0]);
mockProcessedAstMap.set('86fcdad6-fc7f-43fb-9e83-d972530541c8 0', [31,0]);
mockProcessedAstMap.set('para_9913f879-c7fa-45f0-a40d-4f7d10d0ae5e 0', [32,0]);
mockProcessedAstMap.set('para_fcd8b871-15ed-4db0-a8e3-77511d8f75ad 0', [33,0]);
mockProcessedAstMap.set('para_e4d786f7-a9fa-4bd8-acfe-f18952ba2cfe 0', [34,0]);
mockProcessedAstMap.set('para_6ca75716-a620-4f88-a35c-61cd7699bc39 0', [35,0]);
mockProcessedAstMap.set('246375f7-dd9b-4090-a519-1fd0dad7ca4d 0', [36,0]);
mockProcessedAstMap.set('e8e90704-dd7a-4c19-ae5c-7e7867d4195e 0', [37,0]);
mockProcessedAstMap.set('para_8b50e804-f1d7-430e-9f07-ce6cb0bef070 0', [38,0]);
mockProcessedAstMap.set('9832bb55-81ec-4727-87c2-21c44d151623 0', [38,1]);
mockProcessedAstMap.set('para_8b50e804-f1d7-430e-9f07-ce6cb0bef070 2', [38,2]);
mockProcessedAstMap.set('28e5d457-0f20-4d0d-972f-e48b41b8c3d0 0', [38,3]);
mockProcessedAstMap.set('para_8b50e804-f1d7-430e-9f07-ce6cb0bef070 4', [38,4]);
mockProcessedAstMap.set('35e062d2-3b3c-4ca5-9084-b604c97ea239 0', [39,0]);
mockProcessedAstMap.set('385cf807-75b4-43c2-9799-0ab40a7357c6 0', [40,0]);
mockProcessedAstMap.set('3e6446b0-b083-4388-b7d0-7c4947052c08 0', [41,0]);
mockProcessedAstMap.set('para_fb55ae40-d380-4e1f-b9a7-3ecfeb9e5877 0', [42,0]);
mockProcessedAstMap.set('para_aeafe6b1-1a05-4999-9fa4-569063c5b2ef 0', [43,0]);
mockProcessedAstMap.set('para_4051dbc9-7175-400a-8955-382a4223913a 0', [44,0]);
mockProcessedAstMap.set('48633e86-73f4-46f8-9f67-0d23aa14af8c 0', [44,1]);
mockProcessedAstMap.set('para_c38d4410-1355-4bf8-a698-ee62e01cce9e 0', [45,0]);
mockProcessedAstMap.set('ef66ccf1-9bb7-4942-abf8-2e3336e3ef20 0', [45,1]);
mockProcessedAstMap.set('para_0f23dee0-fe5a-4b29-92e4-d117d1d574fd 0', [46,0]);
mockProcessedAstMap.set('para_914db2c8-12a1-4f6d-8c2d-ad3923cd943b 0', [47,0]);
mockProcessedAstMap.set('a9f9b106-a04b-4a21-be09-c2fbb6e244f6 0', [48,0]);
mockProcessedAstMap.set('73a6ee95-c5f8-423f-88f4-ba205b5ff045 0', [49,0]);
mockProcessedAstMap.set('3ec6594d-0ca8-4a36-91b1-cd51979a6fe0 0', [50,0]);
mockProcessedAstMap.set('para_f36e3433-6aa5-4f2f-b5a4-7ddeb612472e 0', [51,0]);
mockProcessedAstMap.set('para_fb9671fa-a0c0-494c-a56f-0b214482e8bd 0', [52,0]);
mockProcessedAstMap.set('64884213-eed5-426c-b254-8199a602a6fc 0', [53,0]);
mockProcessedAstMap.set('44d8b9c0-2f7e-479c-a8d6-63cde7858f63 0', [54,0]);
mockProcessedAstMap.set('de70cd1e-14e4-4658-a27d-64ea829b20da 0', [55,0]);
mockProcessedAstMap.set('fb49e62d-c3e4-49c6-b5a6-5d97ae0715b6 0', [56,0]);
mockProcessedAstMap.set('para_933e7e88-4f0e-450d-bb98-e1e0923775ff 0', [57,0]);
mockProcessedAstMap.set('e35c5573-c64c-4e55-bc2e-cd718b1477c6 0', [57,1]);
mockProcessedAstMap.set('8d88dd2f-9a11-42f8-a307-cae2347c4401 0', [57,2]);
mockProcessedAstMap.set('e35c5573-c64c-4e55-bc2e-cd718b1477c6 2', [57,3]);
mockProcessedAstMap.set('para_933e7e88-4f0e-450d-bb98-e1e0923775ff 2', [57,4]);
mockProcessedAstMap.set('ba16b5c1-d178-4ba0-8fb3-f2fa70b3fab4 0', [58,0]);
mockProcessedAstMap.set('4a14fe93-9c1f-4f79-a932-ade8c81e8e80 0', [59,0]);
mockProcessedAstMap.set('e6b4cd51-3bf0-4eb9-94cf-7d56565de739 0', [60,0]);
mockProcessedAstMap.set('2a85d51a-ebf0-4bd7-a82d-64b062e61fac 0', [61,0]);
mockProcessedAstMap.set('ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d 0', [62,0]);
mockProcessedAstMap.set('ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d 1', [63,0]);
mockProcessedAstMap.set('ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d 2', [64,0]);
mockProcessedAstMap.set('d5bd73bc-b3d9-4b4f-8353-f4e29580630c 0', [65,0]);
mockProcessedAstMap.set('para_23afa210-4f5f-488a-80b4-9125f7709aeb 0', [66,0]);

export { mockProcessedAstMap };

export const mockProcessedAst = [
  [
    {
      "guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
      "index": 0,
      "textContent": "This is a paragraph with both "
    },
    {
      "guid": "9987ba9d-5a15-46eb-975f-3817f25b2185",
      "index": 0,
      "textContent": "bold and italic"
    },
    {
      "guid": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
      "index": 2,
      "textContent": " text"
    },
    {
      "guid": "para_a8b579d3-93c2-4837-8731-34fa04badb8f",
      "index": 1,
      "textContent": "This is another paragraph."
    }
  ],
  [
    {
      "guid": "2bfdc093-0f70-4d86-a57c-5f16315187cf",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "cc4156fc-0d7d-46de-91f9-5206b3c1c912",
      "index": 0,
      "textContent": "of bold text"
    }
  ],
  [
    {
      "guid": "6436b060-1804-4778-baec-1aaf8d4a9b9a",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_ac1f684e-57a4-464f-aa76-c751e7a36550",
      "index": 0,
      "textContent": "This is a third paragraph"
    }
  ],
  [
    {
      "guid": "6649ce34-ee3e-4ecc-b87a-a9bfea8a72a5",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_5a079a29-5e17-480b-bfb2-7fdad1844130",
      "index": 0,
      "textContent": "This is an inline code example: "
    },
    {
      "guid": "code_077cfba4-d7b0-4dca-9660-a6fec0243947",
      "index": 0,
      "textContent": "let x = 5;"
    }
  ],
  [
    {
      "guid": "078ac8ba-fd8d-4166-aa4d-90ba955d11b5",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "fb3f3d85-b999-407c-acbb-7b800bcfa4d6",
      "index": 0,
      "textContent": "Sample Markdown"
    }
  ],
  [
    {
      "guid": "a868c712-cb70-444b-a2a9-31a980119517",
      "index": 0,
      "textContent": "Sample Markdown 2"
    }
  ],
  [
    {
      "guid": "8feb61bb-648a-484b-ae01-6e2288cfd9cc",
      "index": 0,
      "textContent": "Conventional"
    }
  ],
  [
    {
      "guid": "79a149b3-3921-40fc-b44d-8d27419d056a",
      "index": 0,
      "textContent": "Ovational"
    }
  ],
  [
    {
      "guid": "59e03ba0-757b-481c-bd77-fc123b6da5c3",
      "index": 0,
      "textContent": "Boldly Explorational"
    }
  ],
  [
    {
      "guid": "b7a7c223-0adc-4f33-91a9-c4446043f30e",
      "index": 0,
      "textContent": "Crew of the Enterprise"
    }
  ],
  [
    {
      "guid": "0334e08d-3e0a-4157-90ca-733b2f116045",
      "index": 0,
      "textContent": "It's continuing mission"
    }
  ],
  [
    {
      "guid": "45575c23-9d26-4775-9383-71141258a4ac",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_ea4a6985-6427-406b-a0f8-a442515586fe",
      "index": 0,
      "textContent": "This is a paragraph with both "
    },
    {
      "guid": "c33aa78d-0424-4557-b630-125f2bf30f7d",
      "index": 0,
      "textContent": "bold and italic"
    },
    {
      "guid": "para_ea4a6985-6427-406b-a0f8-a442515586fe",
      "index": 2,
      "textContent": " text."
    },
    {
      "guid": "para_ea4a6985-6427-406b-a0f8-a442515586fe",
      "index": 3,
      "textContent": "This is another paragraph."
    },
    {
      "guid": "para_ea4a6985-6427-406b-a0f8-a442515586fe",
      "index": 4,
      "textContent": "This is a third paragraph"
    }
  ],
  [
    {
      "guid": "17bb57a8-c2c7-488b-b334-bbf3fc344b2e",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_92138ccd-4d35-469c-8a32-bef9065c9bf2",
      "index": 0,
      "textContent": "This is an inline code example: "
    },
    {
      "guid": "code_49e68bf4-161c-45f9-8809-bad2dc263c34",
      "index": 0,
      "textContent": "let x = 5;"
    }
  ],
  [
    {
      "guid": "619e381a-6b7c-49b3-a45b-3eb901bef881",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_c42f0313-cde7-4f11-994a-04aa0acd2286",
      "index": 0,
      "textContent": "First Level Item 1"
    }
  ],
  [
    {
      "guid": "para_76f515b4-81bb-407c-8847-90a6205f6bb8",
      "index": 0,
      "textContent": "Second Level Item 1"
    }
  ],
  [
    {
      "guid": "para_cdbe18c9-cd16-40af-9fdd-a34da137a1d6",
      "index": 0,
      "textContent": "Third Level Item 1"
    }
  ],
  [
    {
      "guid": "para_aa528d6a-af3d-4435-8e06-7b68051ce7e4",
      "index": 0,
      "textContent": "Third Level Item 2"
    }
  ],
  [
    {
      "guid": "para_5c1c73ff-618e-40e8-a61f-89780cc84e6e",
      "index": 0,
      "textContent": "Second Level Item 2"
    }
  ],
  [
    {
      "guid": "para_383b59d8-bdab-403d-b0ef-a4a2bf4c0328",
      "index": 0,
      "textContent": "First Level Item 2"
    }
  ],
  [
    {
      "guid": "para_f8a2e7e2-8dbf-4c70-937c-39cf1fa1b30a",
      "index": 0,
      "textContent": "Second Level Item 3"
    }
  ],
  [
    {
      "guid": "para_26fe1ae4-a963-4363-8567-84ed93c567a0",
      "index": 0,
      "textContent": "Third Level Item 3"
    }
  ],
  [
    {
      "guid": "para_26742b4f-992c-4550-beba-30b8260da0f1",
      "index": 0,
      "textContent": "Third Level Item 4"
    }
  ],
  [
    {
      "guid": "para_4ee43ee0-cb6d-49de-8221-8bdd67702a95",
      "index": 0,
      "textContent": "Second Level Item 4"
    }
  ],
  [
    {
      "guid": "para_684fe5b7-2995-49a6-becb-02d18f53177b",
      "index": 0,
      "textContent": "First Level Item 3"
    }
  ],
  [
    {
      "guid": "86fcdad6-fc7f-43fb-9e83-d972530541c8",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_9913f879-c7fa-45f0-a40d-4f7d10d0ae5e",
      "index": 0,
      "textContent": "First level ordered item"
    }
  ],
  [
    {
      "guid": "para_fcd8b871-15ed-4db0-a8e3-77511d8f75ad",
      "index": 0,
      "textContent": "First level unordered item"
    }
  ],
  [
    {
      "guid": "para_e4d786f7-a9fa-4bd8-acfe-f18952ba2cfe",
      "index": 0,
      "textContent": "Another first level unordered item"
    }
  ],
  [
    {
      "guid": "para_6ca75716-a620-4f88-a35c-61cd7699bc39",
      "index": 0,
      "textContent": "Second level ordered item"
    }
  ],
  [
    {
      "guid": "246375f7-dd9b-4090-a519-1fd0dad7ca4d",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "e8e90704-dd7a-4c19-ae5c-7e7867d4195e",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_8b50e804-f1d7-430e-9f07-ce6cb0bef070",
      "index": 0,
      "textContent": "This is a paragraph with "
    },
    {
      "guid": "9832bb55-81ec-4727-87c2-21c44d151623",
      "index": 0,
      "textContent": "bold"
    },
    {
      "guid": "para_8b50e804-f1d7-430e-9f07-ce6cb0bef070",
      "index": 2,
      "textContent": " text and "
    },
    {
      "guid": "28e5d457-0f20-4d0d-972f-e48b41b8c3d0",
      "index": 0,
      "textContent": "italic"
    },
    {
      "guid": "para_8b50e804-f1d7-430e-9f07-ce6cb0bef070",
      "index": 4,
      "textContent": " text."
    }
  ],
  [
    {
      "guid": "35e062d2-3b3c-4ca5-9084-b604c97ea239",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "385cf807-75b4-43c2-9799-0ab40a7357c6",
      "index": 0,
      "textContent": "Table"
    }
  ],
  [
    {
      "guid": "3e6446b0-b083-4388-b7d0-7c4947052c08",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_fb55ae40-d380-4e1f-b9a7-3ecfeb9e5877",
      "index": 0,
      "textContent": "Header 1"
    }
  ],
  [
    {
      "guid": "para_aeafe6b1-1a05-4999-9fa4-569063c5b2ef",
      "index": 0,
      "textContent": "Header 2"
    }
  ],
  [
    {
      "guid": "para_4051dbc9-7175-400a-8955-382a4223913a",
      "index": 0,
      "textContent": "Row 1 "
    },
    {
      "guid": "48633e86-73f4-46f8-9f67-0d23aa14af8c",
      "index": 0,
      "textContent": "test"
    }
  ],
  [
    {
      "guid": "para_c38d4410-1355-4bf8-a698-ee62e01cce9e",
      "index": 0,
      "textContent": "Data 1 "
    },
    {
      "guid": "ef66ccf1-9bb7-4942-abf8-2e3336e3ef20",
      "index": 0,
      "textContent": "test"
    }
  ],
  [
    {
      "guid": "para_0f23dee0-fe5a-4b29-92e4-d117d1d574fd",
      "index": 0,
      "textContent": "Row 2"
    }
  ],
  [
    {
      "guid": "para_914db2c8-12a1-4f6d-8c2d-ad3923cd943b",
      "index": 0,
      "textContent": "Data 2"
    }
  ],
  [
    {
      "guid": "a9f9b106-a04b-4a21-be09-c2fbb6e244f6",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "73a6ee95-c5f8-423f-88f4-ba205b5ff045",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "3ec6594d-0ca8-4a36-91b1-cd51979a6fe0",
      "index": 0,
      "textContent": "Blockquote"
    }
  ],
  [
    {
      "guid": "para_f36e3433-6aa5-4f2f-b5a4-7ddeb612472e",
      "index": 0,
      "textContent": "This is a blockquote."
    }
  ],
  [
    {
      "guid": "para_fb9671fa-a0c0-494c-a56f-0b214482e8bd",
      "index": 0,
      "textContent": "It can span"
    }
  ],
  [
    {
      "guid": "64884213-eed5-426c-b254-8199a602a6fc",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "44d8b9c0-2f7e-479c-a8d6-63cde7858f63",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "de70cd1e-14e4-4658-a27d-64ea829b20da",
      "index": 0,
      "textContent": "Links"
    }
  ],
  [
    {
      "guid": "fb49e62d-c3e4-49c6-b5a6-5d97ae0715b6",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_933e7e88-4f0e-450d-bb98-e1e0923775ff",
      "index": 0,
      "textContent": "This is a "
    },
    {
      "guid": "e35c5573-c64c-4e55-bc2e-cd718b1477c6",
      "index": 0,
      "textContent": "link "
    },
    {
      "guid": "8d88dd2f-9a11-42f8-a307-cae2347c4401",
      "index": 0,
      "textContent": "to"
    },
    {
      "guid": "e35c5573-c64c-4e55-bc2e-cd718b1477c6",
      "index": 2,
      "textContent": " OpenAI"
    },
    {
      "guid": "para_933e7e88-4f0e-450d-bb98-e1e0923775ff",
      "index": 2,
      "textContent": "."
    }
  ],
  [
    {
      "guid": "ba16b5c1-d178-4ba0-8fb3-f2fa70b3fab4",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "4a14fe93-9c1f-4f79-a932-ade8c81e8e80",
      "index": 0,
      "textContent": "JavaScript Code Block"
    }
  ],
  [
    {
      "guid": "e6b4cd51-3bf0-4eb9-94cf-7d56565de739",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "2a85d51a-ebf0-4bd7-a82d-64b062e61fac",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
      "index": 0,
      "textContent": "console.log('Hello, world!');"
    }
  ],
  [
    {
      "guid": "ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
      "index": 1,
      "textContent": "\n"
    }
  ],
  [
    {
      "guid": "ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
      "index": 2,
      "textContent": "console.log('This is line 2!');"
    }
  ],
  [
    {
      "guid": "d5bd73bc-b3d9-4b4f-8353-f4e29580630c",
      "index": 0,
      "textContent": ""
    }
  ],
  [
    {
      "guid": "para_23afa210-4f5f-488a-80b4-9125f7709aeb",
      "index": 0,
      "textContent": "This is another paragraph."
    }
  ]
];

export const mockOutputHtml = `
<div class="bg-white dark:bg-zinc-950 text-gray-600/90 dark:text-zinc-400 absolute top-0 left-0 w-full min-h-[100px] overflow-visible outline-none whitespace-pre-wrap p-[1.1rem_2rem_1rem_2rem] cursor-text text-left text-base" id="richTextEditor" style="font-family: Consolas, Monaco, &quot;Andale Mono&quot;, &quot;Ubuntu Mono&quot;, monospace;">
	<section id="section_a8b579d3-93c2-4837-8731-34fa04badb8f" class="relative" tabindex="1">
		<p id="para_a8b579d3-93c2-4837-8731-34fa04badb8f" class="rich-para" version="V0" tabindex="1" contenteditable="true">
			<strong data-testid="_0_0_0_0_0_0_0_0_0_0_0_1" id="c069fb1b-83fc-4bd9-b1fb-f385f4150da1">This is a paragraph with both <em data-testid="strong_0_0_0_0_0_0_0_0_1_0_0_1" id="9987ba9d-5a15-46eb-975f-3817f25b2185">bold and italic</em> text</strong>This is another paragraph.</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="2bfdc093-0f70-4d86-a57c-5f16315187cf" class="blank-line" contenteditable="true">
</p>
	<section id="section_09621212-5193-46b4-a626-1dd15f4fc8d9" class="relative" tabindex="1">
		<p id="para_09621212-5193-46b4-a626-1dd15f4fc8d9" class="rich-para" version="V0" tabindex="1" contenteditable="true">
			<strong data-testid="_0_0_0_0_0_0_0_0_0_0_0_1" id="cc4156fc-0d7d-46de-91f9-5206b3c1c912">of bold text</strong>
		</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="6436b060-1804-4778-baec-1aaf8d4a9b9a" class="blank-line" contenteditable="true">
</p>
	<section id="section_ac1f684e-57a4-464f-aa76-c751e7a36550" class="relative" tabindex="1">
		<p id="para_ac1f684e-57a4-464f-aa76-c751e7a36550" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is a third paragraph</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="6649ce34-ee3e-4ecc-b87a-a9bfea8a72a5" class="blank-line" contenteditable="true">
</p>
	<section id="section_5a079a29-5e17-480b-bfb2-7fdad1844130" class="relative" tabindex="1">
		<p id="para_5a079a29-5e17-480b-bfb2-7fdad1844130" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is an inline code example: <code id="code_077cfba4-d7b0-4dca-9660-a6fec0243947">
				<span id="para_077cfba4-d7b0-4dca-9660-a6fec0243947">let x = 5;</span>
			</code>
		</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="078ac8ba-fd8d-4166-aa4d-90ba955d11b5" class="blank-line" contenteditable="true">
</p>
	<section id="section_fb3f3d85-b999-407c-acbb-7b800bcfa4d6" class="relative" tabindex="1">
		<h1 id="fb3f3d85-b999-407c-acbb-7b800bcfa4d6" version="V0">
			<p id="para_fe891315-9518-4872-9a94-be019bd68e38" class="rich-para" version="V0" tabindex="1" contenteditable="true">Sample Markdown</p>
		</h1>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<section id="section_a868c712-cb70-444b-a2a9-31a980119517" class="relative" tabindex="1">
		<h1 id="a868c712-cb70-444b-a2a9-31a980119517" version="V0">
			<p id="para_8fb0b240-9a0e-43ef-b17c-26ba58146897" class="rich-para" version="V0" tabindex="1" contenteditable="true">Sample Markdown 2</p>
		</h1>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<section id="section_8feb61bb-648a-484b-ae01-6e2288cfd9cc" class="relative" tabindex="1">
		<h2 id="8feb61bb-648a-484b-ae01-6e2288cfd9cc" version="V0">
			<p id="para_119c3dcb-7fa3-4109-90c1-866eb64dc125" class="rich-para" version="V0" tabindex="1" contenteditable="true">Conventional</p>
		</h2>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<section id="section_79a149b3-3921-40fc-b44d-8d27419d056a" class="relative" tabindex="1">
		<h3 id="79a149b3-3921-40fc-b44d-8d27419d056a" version="V0">
			<p id="para_a87edb5f-43f6-4b8a-9822-aa5866efe6ae" class="rich-para" version="V0" tabindex="1" contenteditable="true">Ovational</p>
		</h3>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<section id="section_59e03ba0-757b-481c-bd77-fc123b6da5c3" class="relative" tabindex="1">
		<h4 id="59e03ba0-757b-481c-bd77-fc123b6da5c3" version="V0">
			<p id="para_21fa51a9-1f43-4459-b953-f7324d1615a9" class="rich-para" version="V0" tabindex="1" contenteditable="true">Boldly Explorational</p>
		</h4>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<section id="section_b7a7c223-0adc-4f33-91a9-c4446043f30e" class="relative" tabindex="1">
		<h5 id="b7a7c223-0adc-4f33-91a9-c4446043f30e" version="V0">
			<p id="para_86d14f11-6348-4021-b5a5-dd9f0545a888" class="rich-para" version="V0" tabindex="1" contenteditable="true">Crew of the Enterprise</p>
		</h5>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<section id="section_0334e08d-3e0a-4157-90ca-733b2f116045" class="relative" tabindex="1">
		<h6 id="0334e08d-3e0a-4157-90ca-733b2f116045" version="V0">
			<p id="para_0ede582c-80d4-43d3-b6ce-bdba3dabaafd" class="rich-para" version="V0" tabindex="1" contenteditable="true">It's continuing mission</p>
		</h6>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="45575c23-9d26-4775-9383-71141258a4ac" class="blank-line" contenteditable="true">
</p>
	<section id="section_ea4a6985-6427-406b-a0f8-a442515586fe" class="relative" tabindex="1">
		<p id="para_ea4a6985-6427-406b-a0f8-a442515586fe" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is a paragraph with both <strong data-testid="_0_0_0_0_0_0_0_0_0_0_0_1" id="61fbafa9-9a84-4924-a51b-9a17ff2837af">
				<em data-testid="strong_0_0_0_0_0_0_0_0_1_0_0_1" id="c33aa78d-0424-4557-b630-125f2bf30f7d">bold and italic</em>
			</strong> text.This is another paragraph.This is a third paragraph</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="17bb57a8-c2c7-488b-b334-bbf3fc344b2e" class="blank-line" contenteditable="true">
</p>
	<section id="section_92138ccd-4d35-469c-8a32-bef9065c9bf2" class="relative" tabindex="1">
		<p id="para_92138ccd-4d35-469c-8a32-bef9065c9bf2" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is an inline code example: <code id="code_49e68bf4-161c-45f9-8809-bad2dc263c34">
				<span id="para_49e68bf4-161c-45f9-8809-bad2dc263c34">let x = 5;</span>
			</code>
		</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="619e381a-6b7c-49b3-a45b-3eb901bef881" class="blank-line" contenteditable="true">
</p>
	<section id="section_46643f8a-6473-4d58-aef6-4a6958885609" class="relative" tabindex="1">
		<ol id="46643f8a-6473-4d58-aef6-4a6958885609">
			<li id="22530233-7753-40cb-ad83-f4b815cdb73c">
				<p id="para_c42f0313-cde7-4f11-994a-04aa0acd2286" class="rich-para" version="V0" tabindex="1" contenteditable="true">First Level Item 1</p>
				<ol id="0f273aa9-e5e7-49a0-9617-663c10d1b29b">
					<li id="63dabc67-c933-4af2-b9b6-36580457bf5b">
						<p id="para_76f515b4-81bb-407c-8847-90a6205f6bb8" class="rich-para" version="V0" tabindex="1" contenteditable="true">Second Level Item 1</p>
						<ol id="04a530ac-539a-4fc7-bbef-3b2c9b236d5f">
							<li id="ae716295-54f5-409e-83d3-336a6deb2f1f">
								<p id="para_cdbe18c9-cd16-40af-9fdd-a34da137a1d6" class="rich-para" version="V0" tabindex="1" contenteditable="true">Third Level Item 1</p>
							</li>
							<li id="cd4d1451-e78a-4a79-a9ad-531b89db4ce9">
								<p id="para_aa528d6a-af3d-4435-8e06-7b68051ce7e4" class="rich-para" version="V0" tabindex="1" contenteditable="true">Third Level Item 2</p>
							</li>
						</ol>
					</li>
					<li id="81bdbdd1-8434-4e2c-8430-b96a2dfadb1f">
						<p id="para_5c1c73ff-618e-40e8-a61f-89780cc84e6e" class="rich-para" version="V0" tabindex="1" contenteditable="true">Second Level Item 2</p>
					</li>
				</ol>
			</li>
			<li id="1c3956fa-a052-4a35-ad8d-9318869f7cb5">
				<p id="para_383b59d8-bdab-403d-b0ef-a4a2bf4c0328" class="rich-para" version="V0" tabindex="1" contenteditable="true">First Level Item 2</p>
				<ol id="c730d28e-c0fb-44ef-beac-40c735b7d5ad">
					<li id="1f011404-31c6-494d-ae2d-6438df5c16a3">
						<p id="para_f8a2e7e2-8dbf-4c70-937c-39cf1fa1b30a" class="rich-para" version="V0" tabindex="1" contenteditable="true">Second Level Item 3</p>
						<ol id="3e6f591f-b182-4e5c-8f88-1e33cfebb483">
							<li id="8df679df-e452-4f17-b599-40b1d9521c7d">
								<p id="para_26fe1ae4-a963-4363-8567-84ed93c567a0" class="rich-para" version="V0" tabindex="1" contenteditable="true">Third Level Item 3</p>
							</li>
							<li id="b415d60e-8871-4493-9ae7-856cb646a289">
								<p id="para_26742b4f-992c-4550-beba-30b8260da0f1" class="rich-para" version="V0" tabindex="1" contenteditable="true">Third Level Item 4</p>
							</li>
						</ol>
					</li>
					<li id="63b9e79a-74b9-4060-912b-2b762a31ce38">
						<p id="para_4ee43ee0-cb6d-49de-8221-8bdd67702a95" class="rich-para" version="V0" tabindex="1" contenteditable="true">Second Level Item 4</p>
					</li>
				</ol>
			</li>
			<li id="18a313ae-832a-46eb-bc78-be061ad016c3">
				<p id="para_684fe5b7-2995-49a6-becb-02d18f53177b" class="rich-para" version="V0" tabindex="1" contenteditable="true">First Level Item 3</p>
			</li>
		</ol>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="86fcdad6-fc7f-43fb-9e83-d972530541c8" class="blank-line" contenteditable="true">
</p>
	<section id="section_0a94d193-ce89-4770-974e-6d3a981fdb5a" class="relative" tabindex="1">
		<ul id="0a94d193-ce89-4770-974e-6d3a981fdb5a">
			<li id="f4aacb6d-d6de-45fb-8085-ec539bb29d02">
				<p id="para_9913f879-c7fa-45f0-a40d-4f7d10d0ae5e" class="rich-para" version="V0" tabindex="1" contenteditable="true">First level ordered item</p>
				<ul id="241748ef-a575-42c7-bb86-049a4990d93a">
					<li id="29bfcaaa-cecf-421f-988e-d73639a26ea0">
						<p id="para_fcd8b871-15ed-4db0-a8e3-77511d8f75ad" class="rich-para" version="V0" tabindex="1" contenteditable="true">First level unordered item</p>
					</li>
					<li id="eaae6ab8-421b-4174-8172-22c3d83b6f27">
						<p id="para_e4d786f7-a9fa-4bd8-acfe-f18952ba2cfe" class="rich-para" version="V0" tabindex="1" contenteditable="true">Another first level unordered item</p>
					</li>
				</ul>
			</li>
			<li id="742d934b-a262-45de-99df-c09f977d600d">
				<p id="para_6ca75716-a620-4f88-a35c-61cd7699bc39" class="rich-para" version="V0" tabindex="1" contenteditable="true">Second level ordered item</p>
			</li>
		</ul>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="246375f7-dd9b-4090-a519-1fd0dad7ca4d" class="blank-line" contenteditable="true">
</p>
	<p id="e8e90704-dd7a-4c19-ae5c-7e7867d4195e" class="blank-line" contenteditable="true">
</p>
	<section id="section_8b50e804-f1d7-430e-9f07-ce6cb0bef070" class="relative" tabindex="1">
		<p id="para_8b50e804-f1d7-430e-9f07-ce6cb0bef070" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is a paragraph with <strong data-testid="_0_0_0_0_0_0_0_0_0_0_0_1" id="9832bb55-81ec-4727-87c2-21c44d151623">bold</strong> text and <em data-testid="_0_0_0_0_0_0_0_0_0_0_0_1" id="28e5d457-0f20-4d0d-972f-e48b41b8c3d0">italic</em> text.</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="35e062d2-3b3c-4ca5-9084-b604c97ea239" class="blank-line" contenteditable="true">
</p>
	<section id="section_385cf807-75b4-43c2-9799-0ab40a7357c6" class="relative" tabindex="1">
		<h2 id="385cf807-75b4-43c2-9799-0ab40a7357c6" version="V0">
			<p id="para_f9a7030e-a95d-466c-ab02-e594a16a0d31" class="rich-para" version="V0" tabindex="1" contenteditable="true">Table</p>
		</h2>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="3e6446b0-b083-4388-b7d0-7c4947052c08" class="blank-line" contenteditable="true">
</p>
	<section id="section_1df6ce59-f1ee-4788-88ba-c201283ce107" class="relative" tabindex="1">
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
		<div class="relative table-cell pr-1 outline-none" tabindex="1">
			<table id="1df6ce59-f1ee-4788-88ba-c201283ce107">
				<tbody>
					<tr>
						<th>
							<span id="para_fb55ae40-d380-4e1f-b9a7-3ecfeb9e5877" class="rich-para" version="V0" tabindex="1" contenteditable="true">Header 1</span>
						</th>
						<th>
							<span id="para_aeafe6b1-1a05-4999-9fa4-569063c5b2ef" class="rich-para" version="V0" tabindex="1" contenteditable="true">Header 2</span>
						</th>
					</tr>
					<tr>
						<td>
							<span id="para_4051dbc9-7175-400a-8955-382a4223913a" class="rich-para" version="V0" tabindex="1" contenteditable="true">Row 1 <strong data-testid="table_0_0_0_0_0_0_0_0_0_1_0_1" id="48633e86-73f4-46f8-9f67-0d23aa14af8c">test</strong>
							</span>
						</td>
						<td>
							<span id="para_c38d4410-1355-4bf8-a698-ee62e01cce9e" class="rich-para" version="V0" tabindex="1" contenteditable="true">Data 1 <em data-testid="table_0_0_0_0_0_0_0_0_0_1_0_1" id="ef66ccf1-9bb7-4942-abf8-2e3336e3ef20">test</em>
							</span>
						</td>
					</tr>
					<tr>
						<td>
							<span id="para_0f23dee0-fe5a-4b29-92e4-d117d1d574fd" class="rich-para" version="V0" tabindex="1" contenteditable="true">Row 2</span>
						</td>
						<td>
							<span id="para_914db2c8-12a1-4f6d-8c2d-ad3923cd943b" class="rich-para" version="V0" tabindex="1" contenteditable="true">Data 2</span>
						</td>
					</tr>
				</tbody>
			</table>
			<div class="overflow-hidden h-2 opacity-0 pointer-events-none table-utility-container absolute top-[0rem] right-[-1rem] p-0 flex flex-col gap-2.5">
				<div title="Add Row" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
					</svg>
				</div>
				<div title="Add Column" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<g transform="rotate(90 12 12)">
							<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
						</g>
					</svg>
				</div>
			</div>
		</div>
	</section>
	<p id="a9f9b106-a04b-4a21-be09-c2fbb6e244f6" class="blank-line" contenteditable="true">
</p>
	<p id="73a6ee95-c5f8-423f-88f4-ba205b5ff045" class="blank-line" contenteditable="true">
</p>
	<section id="section_3ec6594d-0ca8-4a36-91b1-cd51979a6fe0" class="relative" tabindex="1">
		<h2 id="3ec6594d-0ca8-4a36-91b1-cd51979a6fe0" version="V0">
			<p id="para_07ae2654-6b06-4d95-987b-470557f386ba" class="rich-para" version="V0" tabindex="1" contenteditable="true">Blockquote</p>
		</h2>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<section id="section_cb7747a5-e6b2-4240-917c-c6ac59a45b23" class="relative" tabindex="1">
		<blockquote>
			<p id="para_f36e3433-6aa5-4f2f-b5a4-7ddeb612472e" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is a blockquote.</p>
			<p id="para_fb9671fa-a0c0-494c-a56f-0b214482e8bd" class="rich-para" version="V0" tabindex="1" contenteditable="true">It can span</p>
		</blockquote>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="64884213-eed5-426c-b254-8199a602a6fc" class="blank-line" contenteditable="true">
</p>
	<p id="44d8b9c0-2f7e-479c-a8d6-63cde7858f63" class="blank-line" contenteditable="true">
</p>
	<section id="section_de70cd1e-14e4-4658-a27d-64ea829b20da" class="relative" tabindex="1">
		<h2 id="de70cd1e-14e4-4658-a27d-64ea829b20da" version="V0">
			<p id="para_98e2e235-1fa7-4d2b-b3e3-d0db5d062e6f" class="rich-para" version="V0" tabindex="1" contenteditable="true">Links</p>
		</h2>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="fb49e62d-c3e4-49c6-b5a6-5d97ae0715b6" class="blank-line" contenteditable="true">
</p>
	<section id="section_933e7e88-4f0e-450d-bb98-e1e0923775ff" class="relative" tabindex="1">
		<p id="para_933e7e88-4f0e-450d-bb98-e1e0923775ff" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is a <a id="e35c5573-c64c-4e55-bc2e-cd718b1477c6" href="https://openai.com">
				<span id="para_e35c5573-c64c-4e55-bc2e-cd718b1477c6" class="rich-para" version="V0" tabindex="1" contenteditable="true">link <strong data-testid="a_0_0_0_0_0_0_1_0_0_0_0_1" id="8d88dd2f-9a11-42f8-a307-cae2347c4401">to</strong> OpenAI</span>
			</a>.</p>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="ba16b5c1-d178-4ba0-8fb3-f2fa70b3fab4" class="blank-line" contenteditable="true">
</p>
	<section id="section_4a14fe93-9c1f-4f79-a932-ade8c81e8e80" class="relative" tabindex="1">
		<h2 id="4a14fe93-9c1f-4f79-a932-ade8c81e8e80" version="V0">
			<p id="para_fcdd8cf5-4e23-4e2b-b67a-25483a4f932d" class="rich-para" version="V0" tabindex="1" contenteditable="true">JavaScript Code Block</p>
		</h2>
		<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
			<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
				</svg>
			</div>
			<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
				</svg>
			</div>
			<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
				</svg>
			</div>
			<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
				</svg>
			</div>
		</div>
	</section>
	<p id="e6b4cd51-3bf0-4eb9-94cf-7d56565de739" class="blank-line" contenteditable="true">
</p>
	<section id="section_07c2ad41-7426-428a-a537-f50a1d64a1c5" class="relative" tabindex="1">
		<hr tabindex="1" class="hr-inset" id="07c2ad41-7426-428a-a537-f50a1d64a1c5">
			<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
				<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
					</svg>
				</div>
				<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
					</svg>
				</div>
				<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
					</svg>
				</div>
				<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
					</svg>
				</div>
			</div>
		</section>
		<p id="2a85d51a-ebf0-4bd7-a82d-64b062e61fac" class="blank-line" contenteditable="true">
</p>
		<section id="section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d" class="relative" tabindex="1">
			<pre id="pre_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d">
				<code id="ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d" class="rich-code language-javascript">
					<p id="para_fc245cd8-38b5-45fb-ab93-8c4de8cd8116" class="rich-para" version="V0" tabindex="1" contenteditable="true">console.log('Hello, world!');</p>
					<p id="para_b7ea8d0a-fa75-4c41-b503-52be791878f1" class="rich-para" version="V0" tabindex="1" contenteditable="true">
</p>
					<p id="para_744a50aa-4fef-40cc-8bff-707e24c719fd" class="rich-para" version="V0" tabindex="1" contenteditable="true">console.log('This is line 2!');</p>
				</code>
			</pre>
			<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
				<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
					</svg>
				</div>
				<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
					</svg>
				</div>
				<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
					</svg>
				</div>
				<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
					</svg>
				</div>
			</div>
		</section>
		<p id="d5bd73bc-b3d9-4b4f-8353-f4e29580630c" class="blank-line" contenteditable="true">
</p>
		<section id="section_23afa210-4f5f-488a-80b4-9125f7709aeb" class="relative" tabindex="1">
			<p id="para_23afa210-4f5f-488a-80b4-9125f7709aeb" class="rich-para" version="V0" tabindex="1" contenteditable="true">This is another paragraph.</p>
			<div class="overflow-hidden h-2 opacity-0 pointer-events-none utility-container absolute top-[-2rem] right-[-3.5rem] p-8 flex flex-col gap-2.5">
				<div title="Delete" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
					</svg>
				</div>
				<div title="Cut" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664"/>
					</svg>
				</div>
				<div title="Copy" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>
					</svg>
				</div>
				<div title="Paste" class="text-gray-500 cursor-pointer opacity-[0.75] hover:opacity-100">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
					</svg>
				</div>
			</div>
		</section>
	</div>
`;