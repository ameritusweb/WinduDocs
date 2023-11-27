import { AstNode } from "../components/wysiwyg/interface";

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
        "Guid": "09a8b8e2-4727-43ca-9434-ade66fefd690",
        "TextContent": "t",
        "Children": []
      },
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
      },
      {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 0,
        "Depth": 3,
        "Guid": "b88341e5-287c-4d19-a635-ac87ce732dfc",
        "TextContent": "multiple lines.",
        "Children": []
      }
    ]
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
      }
    ];