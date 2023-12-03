import { vi } from "vitest";
import { enterAroundLists, enterAroundNormalText, enterAroundQuoteBlocks, enterAroundStrongOrEmphasisText } from ".";
import { mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { IHistoryManagerRecorder } from "../../components/wysiwyg/interface";

describe('enterAroundLists', () => {
    it('handles startOffset > 0', () => {
      const mockHistoryManager: IHistoryManagerRecorder = {
        recordChildReplace: vi.fn(),
        recordChildTextUpdate: vi.fn(),
        recordOperation: vi.fn(),
        recordOperationsAsTransaction: vi.fn(),
        recordChildInsertBefore: vi.fn(),
        recordChildInsertAfter: vi.fn(),
        recordChildRemoveBefore: vi.fn(),
        recordChildRemoveAfter: vi.fn(),
    };
      const mockUpdateData = {
        "parent": mockCustomElement({
        "nodeName": "P",
        "childNodes": [
          {
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "First Level Item 3"
          }
        ]
      }),
        "higherLevelIndex": 0,
        "child": toMockAst({
          "NodeName": "ParagraphBlock",
          "Guid": "684fe5b7-2995-49a6-becb-02d18f53177b",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "313629be-af46-4116-a182-5d7444095a23",
              "TextContent": "First Level Item 3"
            }
          ]
        }),
        "astParent": toMockAst({
          "NodeName": "ListItemBlock",
          "Guid": "18a313ae-832a-46eb-bc78-be061ad016c3",
          "Children": [
            {
              "NodeName": "ParagraphBlock",
              "Guid": "684fe5b7-2995-49a6-becb-02d18f53177b",
              "Children": [
                {
                  "NodeName": "Text",
                  "Guid": "313629be-af46-4116-a182-5d7444095a23",
                  "TextContent": "First Level Item 3"
                }
              ]
            }
          ]
        }),
        "lowerLevelChild": null,
        "immediateChild": toMockAst({
          "NodeName": "ListItemBlock",
          "Guid": "18a313ae-832a-46eb-bc78-be061ad016c3",
          "Children": [
            {
              "NodeName": "ParagraphBlock",
              "Guid": "684fe5b7-2995-49a6-becb-02d18f53177b",
              "Children": [
                {
                  "NodeName": "Text",
                  "Guid": "313629be-af46-4116-a182-5d7444095a23",
                  "TextContent": "First Level Item 3"
                }
              ]
            }
          ]
        }),
        "rootChildId": "section_46643f8a-6473-4d58-aef6-4a6958885609",
        "containerIndex": 0,
        "grandChild": toMockAst({
          "NodeName": "Text",
          "Guid": "313629be-af46-4116-a182-5d7444095a23",
          "TextContent": "First Level Item 3"
        }),
        "endChild": null,
        "endGrandChild": null,
        "skyChildren": toMockAstArray([
          {
            "NodeName": "ListItemBlock",
            "Guid": "22530233-7753-40cb-ad83-f4b815cdb73c",
            "Children": [
              {
                "NodeName": "ParagraphBlock",
                "Guid": "567b7c66-9e94-4364-b61b-cec0d9ef0e2a",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "1bc2b524-058b-4b05-a227-a99657e9f25b",
                    "TextContent": "First "
                  },
                  {
                    "NodeName": "Strong",
                    "Guid": "5b8cb389-a0f1-42c5-975d-4564c57bb8ab",
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Guid": "22703eb1-6e38-4452-bea1-16919a538ac6",
                        "TextContent": "Level"
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "2bf73464-e26e-40cd-b086-e298ae101e95",
                    "TextContent": " Item 1"
                  }
                ]
              },
              {
                "NodeName": "ListBlock",
                "Attributes": {
                  "IsOrdered": "True"
                },
                "Guid": "0f273aa9-e5e7-49a0-9617-663c10d1b29b",
                "Children": [
                  {
                    "NodeName": "ListItemBlock",
                    "Guid": "63dabc67-c933-4af2-b9b6-36580457bf5b",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Guid": "76f515b4-81bb-407c-8847-90a6205f6bb8",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "Guid": "aa32dde9-e1d8-497f-b394-2aadfd058e2e",
                            "TextContent": "Second Level Item 1"
                          }
                        ]
                      },
                      {
                        "NodeName": "ListBlock",
                        "Attributes": {
                          "IsOrdered": "True"
                        },
                        "Guid": "04a530ac-539a-4fc7-bbef-3b2c9b236d5f",
                        "Children": [
                          {
                            "NodeName": "ListItemBlock",
                            "Guid": "ae716295-54f5-409e-83d3-336a6deb2f1f",
                            "Children": [
                              {
                                "NodeName": "ParagraphBlock",
                                "Guid": "cdbe18c9-cd16-40af-9fdd-a34da137a1d6",
                                "Children": [
                                  {
                                    "NodeName": "Text",
                                    "Guid": "24a8eb8f-1df4-4915-89ac-a77062e78189",
                                    "TextContent": "Third Level Item 1"
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "NodeName": "ListItemBlock",
                            "Guid": "cd4d1451-e78a-4a79-a9ad-531b89db4ce9",
                            "Children": [
                              {
                                "NodeName": "ParagraphBlock",
                                "Guid": "aa528d6a-af3d-4435-8e06-7b68051ce7e4",
                                "Children": [
                                  {
                                    "NodeName": "Text",
                                    "Guid": "6fb7c89e-1f38-4d29-9b3f-42847722e609",
                                    "TextContent": "Third Level Item 2"
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
                    "Guid": "81bdbdd1-8434-4e2c-8430-b96a2dfadb1f",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Guid": "5c1c73ff-618e-40e8-a61f-89780cc84e6e",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "Guid": "a588caa5-8699-4aef-8aa4-2809dc9aaae6",
                            "TextContent": "Second Level Item 2"
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
            "Guid": "1c3956fa-a052-4a35-ad8d-9318869f7cb5",
            "Children": [
              {
                "NodeName": "ParagraphBlock",
                "Guid": "383b59d8-bdab-403d-b0ef-a4a2bf4c0328",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "f10d86ea-e255-48a7-8b6d-c4f03c41e378",
                    "TextContent": "First Level Item 2"
                  }
                ]
              },
              {
                "NodeName": "ListBlock",
                "Attributes": {
                  "IsOrdered": "True"
                },
                "Guid": "c730d28e-c0fb-44ef-beac-40c735b7d5ad",
                "Children": [
                  {
                    "NodeName": "ListItemBlock",
                    "Guid": "1f011404-31c6-494d-ae2d-6438df5c16a3",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Guid": "f8a2e7e2-8dbf-4c70-937c-39cf1fa1b30a",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "Guid": "2108de1b-fe03-4e14-bb9e-730362c14d15",
                            "TextContent": "Second Level Item 3"
                          }
                        ]
                      },
                      {
                        "NodeName": "ListBlock",
                        "Attributes": {
                          "IsOrdered": "True"
                        },
                        "Guid": "3e6f591f-b182-4e5c-8f88-1e33cfebb483",
                        "Children": [
                          {
                            "NodeName": "ListItemBlock",
                            "Guid": "8df679df-e452-4f17-b599-40b1d9521c7d",
                            "Children": [
                              {
                                "NodeName": "ParagraphBlock",
                                "Guid": "26fe1ae4-a963-4363-8567-84ed93c567a0",
                                "Children": [
                                  {
                                    "NodeName": "Text",
                                    "Guid": "c3bbcf66-7480-4bb8-a00e-c6ba7c9a5f13",
                                    "TextContent": "Third Level Item 3"
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "NodeName": "ListItemBlock",
                            "Guid": "b415d60e-8871-4493-9ae7-856cb646a289",
                            "Children": [
                              {
                                "NodeName": "ParagraphBlock",
                                "Guid": "26742b4f-992c-4550-beba-30b8260da0f1",
                                "Children": [
                                  {
                                    "NodeName": "Text",
                                    "Guid": "a4d53906-ec5f-4f89-a6c9-3340a65640f1",
                                    "TextContent": "Third Level Item 4"
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
                    "Guid": "63b9e79a-74b9-4060-912b-2b762a31ce38",
                    "Children": [
                      {
                        "NodeName": "ParagraphBlock",
                        "Guid": "4ee43ee0-cb6d-49de-8221-8bdd67702a95",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "Guid": "e304e3a9-2ddf-49ed-a088-4a29f3d32620",
                            "TextContent": "Second Level Item 4"
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
            "Guid": "18a313ae-832a-46eb-bc78-be061ad016c3",
            "Children": [
              {
                "NodeName": "ParagraphBlock",
                "Guid": "684fe5b7-2995-49a6-becb-02d18f53177b",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "313629be-af46-4116-a182-5d7444095a23",
                    "TextContent": "First Level Item 3"
                  }
                ]
              }
            ]
          }
        ]),
        "higherLevelChildren": toMockAstArray([
          {
            "NodeName": "ParagraphBlock",
            "Guid": "684fe5b7-2995-49a6-becb-02d18f53177b",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "313629be-af46-4116-a182-5d7444095a23",
                "TextContent": "First Level Item 3"
              }
            ]
          }
        ])
      };
      const mockChildren = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "313629be-af46-4116-a182-5d7444095a23",
          "TextContent": "First Level Item 3"
        }
      ]);
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "First Level Item 3"
      });
      mockUpdateData.higherLevelChildren[mockUpdateData.higherLevelIndex].Children = mockChildren;
  
      const result = enterAroundLists(mockUpdateData, mockHistoryManager, mockChildren, mockContainer, 18);
      
      expect(mockHistoryManager.recordChildInsertAfter).toHaveBeenCalledTimes(1);
      expect(result).not.toBeNull();
      expect(result!.type).toBe("skyLevelSplitOrMove");
      expect(result!.nodes[3].Children[0].Children[0].TextContent).toBe("\n");
      // Assertions here
    });
  
    // More tests for other scenarios
  });