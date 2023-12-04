import { vi } from "vitest";
import { cleanup, mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { IHistoryManagerRecorder, IdableNode } from "../../components/wysiwyg/interface";
import { handleBackspaceKeyPress } from ".";

describe('handleBackspaceKeyPress', () => {

    beforeEach(() => {

        cleanup();
        vi.clearAllMocks();

    });

    it('handles backspace correctly at the end of a heading', () => {

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

        const mockContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "Sample Markdown"
          });

        const mockEndContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "Sample Markdown"
          });

        const mockUpdateData = {
            "parent": mockCustomElement({
            "id": "para_fb3f3d85-b999-407c-acbb-7b800bcfa4d6",
            "nodeName": "P",
            "childNodes": [
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": "Sample Markdown"
              }
            ]
          }),
            "higherLevelIndex": 8,
            "child": toMockAst({
              "NodeName": "HeadingBlock",
              "Attributes": {
                "Level": "1"
              },
              "Guid": "fb3f3d85-b999-407c-acbb-7b800bcfa4d6",
              "Children": [
                {
                  "NodeName": "Text",
                  "Guid": "fe891315-9518-4872-9a94-be019bd68e38",
                  "TextContent": "Sample Markdown"
                }
              ]
            }),
            "astParent": null,
            "lowerLevelChild": null,
            "immediateChild": toMockAst({
              "NodeName": "HeadingBlock",
              "Attributes": {
                "Level": "1"
              },
              "Guid": "fb3f3d85-b999-407c-acbb-7b800bcfa4d6",
              "Children": [
                {
                  "NodeName": "Text",
                  "Guid": "fe891315-9518-4872-9a94-be019bd68e38",
                  "TextContent": "Sample Markdown"
                }
              ]
            }),
            "rootChildId": "section_fb3f3d85-b999-407c-acbb-7b800bcfa4d6",
            "containerIndex": 0,
            "grandChild": toMockAst({
              "NodeName": "Text",
              "Guid": "fe891315-9518-4872-9a94-be019bd68e38",
              "TextContent": "Sample Markdown"
            }),
            "endChild": null,
            "endGrandChild": null,
            "skyChildren": [],
            "higherLevelChildren": toMockAstArray([
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
              },
              {
                "NodeName": "ParagraphBlock",
                "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
                    "TextContent": "This is a third paragraph"
                  }
                ]
              },
              {
                "NodeName": "BlankLine",
                "Guid": "6649ce34-ee3e-4ecc-b87a-a9bfea8a72a5"
              },
              {
                "NodeName": "ParagraphBlock",
                "Guid": "5a079a29-5e17-480b-bfb2-7fdad1844130",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "8d771b9b-622d-462d-9788-3b25e2a335ef",
                    "TextContent": "This is an inline code example: "
                  },
                  {
                    "NodeName": "CodeInline",
                    "Guid": "077cfba4-d7b0-4dca-9660-a6fec0243947",
                    "TextContent": "let x = 5;"
                  }
                ]
              },
              {
                "NodeName": "BlankLine",
                "Guid": "078ac8ba-fd8d-4166-aa4d-90ba955d11b5"
              },
              {
                "NodeName": "HeadingBlock",
                "Attributes": {
                  "Level": "1"
                },
                "Guid": "fb3f3d85-b999-407c-acbb-7b800bcfa4d6",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "fe891315-9518-4872-9a94-be019bd68e38",
                    "TextContent": "Sample Markdown"
                  }
                ]
              },
              {
                "NodeName": "HeadingBlock",
                "Attributes": {
                  "Level": "1"
                },
                "Guid": "a868c712-cb70-444b-a2a9-31a980119517",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "8fb0b240-9a0e-43ef-b17c-26ba58146897",
                    "TextContent": "Sample Markdown 2"
                  }
                ]
              },
              {
                "NodeName": "HeadingBlock",
                "Attributes": {
                  "Level": "2"
                },
                "Guid": "8feb61bb-648a-484b-ae01-6e2288cfd9cc",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "119c3dcb-7fa3-4109-90c1-866eb64dc125",
                    "TextContent": "Conventional"
                  }
                ]
              },
              {
                "NodeName": "HeadingBlock",
                "Attributes": {
                  "Level": "3"
                },
                "Guid": "79a149b3-3921-40fc-b44d-8d27419d056a",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "a87edb5f-43f6-4b8a-9822-aa5866efe6ae",
                    "TextContent": "Ovational"
                  }
                ]
              },
              {
                "NodeName": "HeadingBlock",
                "Attributes": {
                  "Level": "4"
                },
                "Guid": "59e03ba0-757b-481c-bd77-fc123b6da5c3",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "21fa51a9-1f43-4459-b953-f7324d1615a9",
                    "TextContent": "Boldly Explorational"
                  }
                ]
              },
              {
                "NodeName": "HeadingBlock",
                "Attributes": {
                  "Level": "5"
                },
                "Guid": "b7a7c223-0adc-4f33-91a9-c4446043f30e",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "86d14f11-6348-4021-b5a5-dd9f0545a888",
                    "TextContent": "Crew of the Enterprise"
                  }
                ]
              },
              {
                "NodeName": "HeadingBlock",
                "Attributes": {
                  "Level": "6"
                },
                "Guid": "0334e08d-3e0a-4157-90ca-733b2f116045",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "0ede582c-80d4-43d3-b6ce-bdba3dabaafd",
                    "TextContent": "It's continuing mission"
                  }
                ]
              },
              {
                "NodeName": "BlankLine",
                "Guid": "45575c23-9d26-4775-9383-71141258a4ac"
              },
              {
                "NodeName": "ParagraphBlock",
                "Guid": "ea4a6985-6427-406b-a0f8-a442515586fe",
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "0707728e-096c-497c-b7e5-35298dc56e07",
                    "TextContent": "This is a paragraph with both "
                  },
                  {
                    "NodeName": "Strong",
                    "Guid": "61fbafa9-9a84-4924-a51b-9a17ff2837af",
                    "Children": [
                      {
                        "NodeName": "Emphasis",
                        "Guid": "c33aa78d-0424-4557-b630-125f2bf30f7d",
                        "Children": [
                          {
                            "NodeName": "Text",
                            "Guid": "0e3cd3e9-02a9-4c5f-bacd-ca8d6231a852",
                            "TextContent": "bold and italic"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "7925c061-a311-47fd-bdc8-8964aadf99d6",
                    "TextContent": " text."
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "1872fc72-5934-4f59-9bc8-ae00c8fda0a4",
                    "TextContent": "This is another paragraph."
                  },
                  {
                    "NodeName": "Text",
                    "Guid": "f86bed0e-0645-45da-ac54-3a623a14e785",
                    "TextContent": "This is a third paragraph"
                  }
                ]
              }
            ])
          };

          mockUpdateData.parent.replaceChild(mockContainer, mockUpdateData.parent.childNodes[0]);

          const commonAncestorContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "Sample Markdown"
          });
          const astUpdate = handleBackspaceKeyPress(mockHistoryManager, mockContainer, mockEndContainer, mockUpdateData.child.Children, mockUpdateData, commonAncestorContainer, 15, 15);
          expect(astUpdate).toStrictEqual({
            "type": "remove",
            "nodes": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "fe891315-9518-4872-9a94-be019bd68e38",
                "Depth": 1,
                "TextContent": "Sample Markdow",
                "Children": []
              }
            ]
          });
    })

    it('handles backspace correctly at the end of code', () => {

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

        const mockContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "console.log('Hello, world!');"
          });

        const mockEndContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "console.log('Hello, world!');"
          });

        const mockUpdateData = {
            "parent": mockCustomElement({
            "id": "para_fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
            "nodeName": "P",
            "childNodes": [
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": "console.log('Hello, world!');"
              }
            ]
          }),
            "higherLevelIndex": -1,
            "child": toMockAst({
              "NodeName": "Text",
              "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
              "TextContent": "console.log('Hello, world!');"
            }),
            "astParent": null,
            "lowerLevelChild": null,
            "immediateChild": toMockAst({
              "NodeName": "Text",
              "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
              "TextContent": "console.log('Hello, world!');"
            }),
            "rootChildId": "section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
            "containerIndex": 0,
            "grandChild": null,
            "endChild": null,
            "endGrandChild": null,
            "skyChildren": [],
            "higherLevelChildren": toMockAstArray([
              {
                "NodeName": "Text",
                "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
                "TextContent": "console.log('Hello, world!');"
              },
              {
                "NodeName": "Text",
                "Guid": "b7ea8d0a-fa75-4c41-b503-52be791878f1",
                "TextContent": "\n"
              },
              {
                "NodeName": "Text",
                "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
                "TextContent": "console.log('This is line 2!');"
              }
            ])
          };

          mockUpdateData.higherLevelChildren[0] = mockUpdateData.child;
          mockUpdateData.parent.replaceChild(mockContainer, mockUpdateData.parent.childNodes[0]);

          const commonAncestorContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "console.log('Hello, world!');"
          });
          const astUpdate = handleBackspaceKeyPress(mockHistoryManager, mockContainer, mockEndContainer, [mockUpdateData.child], mockUpdateData, commonAncestorContainer, 29, 29);
          console.log(JSON.stringify(astUpdate, null, 2));
          expect(astUpdate).toStrictEqual({
            "type": "higherLevelRemove",
            "nodes": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
                "Depth": 0,
                "TextContent": "console.log('Hello, world!')",
                "Children": []
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 1,
                "Guid": "b7ea8d0a-fa75-4c41-b503-52be791878f1",
                "Depth": 0,
                "TextContent": "\n",
                "Children": []
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 2,
                "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
                "Depth": 0,
                "TextContent": "console.log('This is line 2!');",
                "Children": []
              }
            ]
          });
    })

    it('handles backspace correctly for a selection', () => {

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

        const mockContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "This is a paragraph with "
          });

        const mockEndContainer = mockCustomElement({
            "nodeName": "#text",
            "childNodes": [],
            "textContent": " text and "
          });

        const mockUpdateData = {
            "parent": mockCustomElement({
            "nodeName": "P",
            "childNodes": [
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": "This is a paragraph with "
              },
              {
                "nodeName": "STRONG",
                "childNodes": [
                  {
                    "nodeName": "#text",
                    "childNodes": [],
                    "textContent": "bold"
                  }
                ]
              },
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": " text and "
              },
              {
                "nodeName": "EM",
                "childNodes": [
                  {
                    "nodeName": "#text",
                    "childNodes": [],
                    "textContent": "italic"
                  }
                ]
              },
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": " text."
              }
            ]
          }),
            "higherLevelIndex": 25,
            "child": toMockAst({
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
            }),
            "astParent": null,
            "lowerLevelChild": null,
            "immediateChild": toMockAst({
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
            }),
            "rootChildId": "section_8b50e804-f1d7-430e-9f07-ce6cb0bef070",
            "containerIndex": 0,
            "grandChild": toMockAst({
              "NodeName": "Text",
              "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
              "TextContent": "This is a paragraph with "
            }),
            "endChild": toMockAst({
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
            }),
            "endGrandChild": toMockAst({
              "NodeName": "Text",
              "Guid": "1b1dfb46-53f8-4a01-ab14-2081748ef38a",
              "TextContent": " text and "
            }),
            "skyChildren": [],
            "higherLevelChildren": toMockAstArray([
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
            ])
          };

          mockUpdateData.higherLevelChildren[1] = mockUpdateData.child;
          mockUpdateData.parent.replaceChild(mockContainer, mockUpdateData.parent.childNodes[0]);

          const commonAncestorContainer = mockCustomElement({
            "nodeName": "P",
            "childNodes": [
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": "This is a paragraph with "
              },
              {
                "nodeName": "STRONG",
                "childNodes": [
                  {
                    "nodeName": "#text",
                    "childNodes": [],
                    "textContent": "bold"
                  }
                ]
              },
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": " text and "
              },
              {
                "nodeName": "EM",
                "childNodes": [
                  {
                    "nodeName": "#text",
                    "childNodes": [],
                    "textContent": "italic"
                  }
                ]
              },
              {
                "nodeName": "#text",
                "childNodes": [],
                "textContent": " text."
              }
            ]
          });

          commonAncestorContainer.replaceChild(mockContainer, commonAncestorContainer.childNodes[0]);
          commonAncestorContainer.replaceChild(mockEndContainer, commonAncestorContainer.childNodes[4]);

          const astUpdate = handleBackspaceKeyPress(mockHistoryManager, mockContainer, mockEndContainer, mockUpdateData.child.Children, mockUpdateData, commonAncestorContainer, 20, 3);
          expect(astUpdate).toStrictEqual({
            "type": "removeSelected",
            "nodes": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "8c63395f-f5aa-40d3-bc8d-0fcfbf2ef59d",
                "Depth": 1,
                "TextContent": "This is a paragraph ",
                "Children": []
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 4,
                "Guid": "fa6d4496-d1dd-41ad-b482-dbfaaf5f6f13",
                "Depth": 1,
                "TextContent": "xt and ",
                "Children": []
              }
            ]
          });
    })

});