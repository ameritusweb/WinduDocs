import { mockAstData } from "../../../__mocks__/editor-mocks";
import { AstOperation } from "../../../components/wysiwyg/interface";
import { applyOperation } from "./operation-handlers";

describe('operationHandlers', () => {

    it('correctly handles an incorrect operation', () => {
        const mockAst = mockAstData;
        const mockOperation = {
            "type": "insertBetween",
            "initialPosition": {
              "targetParentId": "para_08b74bcd-22dd-193c-7242-acb0b38f9d69",
              "nodeIndex": 0,
              "offset": 0
            },
            "finalPosition": {
              "targetParentId": "para_744a50aa-4fef-40cc-8bff-707e24c719fd",
              "nodeIndex": 0,
              "offset": 0
            },
            "parentNodeId": null,
            "targetNodeId": null,
            "nodeIndex": null,
            "payload": {
              "siblingId": "744a50aa-4fef-40cc-8bff-707e24c719fd",
              "newNode": {
                "NodeName": "Text",
                "Guid": "08b74bcd-22dd-193c-7242-acb0b38f9d69",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "\n",
                "Version": "V0"
              }
            },
            "timestamp": 1701535287852
          } as any;
    
        expect(() => applyOperation(mockAst, mockOperation)).toThrow();
      });

    it('correctly applies insert before operation', () => {
        const mockAst = mockAstData;
        const mockOperation = {
            "type": "insertBefore",
            "initialPosition": {
              "targetParentId": "para_08b74bcd-22dd-193c-7242-acb0b38f9d69",
              "nodeIndex": 0,
              "offset": 0
            },
            "finalPosition": {
              "targetParentId": "para_744a50aa-4fef-40cc-8bff-707e24c719fd",
              "nodeIndex": 0,
              "offset": 0
            },
            "parentNodeId": null,
            "targetNodeId": null,
            "nodeIndex": null,
            "payload": {
              "siblingId": "744a50aa-4fef-40cc-8bff-707e24c719fd",
              "newNode": {
                "NodeName": "Text",
                "Guid": "08b74bcd-22dd-193c-7242-acb0b38f9d69",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "\n",
                "Version": "V0"
              }
            },
            "timestamp": 1701535287852
          } as AstOperation<'insertBefore'>;
    
        const updatedAst = applyOperation(mockAst, mockOperation);
        expect(updatedAst).not.toBeNull();
        
      });

    it('correctly applies remove before operation', () => {
        const mockAst = mockAstData;
        const mockOperation = {
            "type": "removeBefore",
            "initialPosition": {
              "targetParentId": "para_08b74bcd-22dd-193c-7242-acb0b38f9d69",
              "nodeIndex": 0,
              "offset": 0
            },
            "finalPosition": {
              "targetParentId": "para_744a50aa-4fef-40cc-8bff-707e24c719fd",
              "nodeIndex": 0,
              "offset": 0
            },
            "parentNodeId": null,
            "targetNodeId": null,
            "nodeIndex": null,
            "payload": {
              "siblingId": "744a50aa-4fef-40cc-8bff-707e24c719fd",
              "targetNode": {
                "NodeName": "Text",
                "Guid": "08b74bcd-22dd-193c-7242-acb0b38f9d69",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [],
                "TextContent": "\n",
                "Version": "V0"
              }
            },
            "timestamp": 1701535287852
          } as AstOperation<'removeBefore'>;
    
        const updatedAst = applyOperation(mockAst, mockOperation);
        expect(updatedAst).not.toBeNull();
        
      });

    it('correctly applies update operation', () => {
        const mockAst = mockAstData;
        const mockOperation = {
            "type": "update",
            "targetNodeId": "ffcf0896-aa89-4a97-989c-ce4001943443",
            "payload": {
              "offset": 19,
              "newVersion": "RV0",
              "newTextContent": "This is a paragraph with both "
            },
            "parentNodeId": "c069fb1b-83fc-4bd9-b1fb-f385f4150da1",
            "nodeIndex": 0,
            "oldState": "This is a paragraph with both ",
            "oldVersion": "V0",
            "oldOffset": 19,
            "rootChildId": "section_a8b579d3-93c2-4837-8731-34fa04badb8f",
            "timestamp": 1701535097747
          } as AstOperation<'update'>;
    
        const updatedAst = applyOperation(mockAst, mockOperation);
        expect(updatedAst).not.toBeNull();
        
      });

    it('correctly applies insert after operation', () => {
        const mockAst = mockAstData;
        const mockOperation = {
            "type": "insertAfter",
            "initialPosition": {
              "targetParentId": "para_a8b579d3-93c2-4837-8731-34fa04badb8f",
              "nodeIndex": 0,
              "offset": 15
            },
            "finalPosition": {
              "targetParentId": "6837fef1-f68e-537f-572d-a7c743472b7e",
              "nodeIndex": 0,
              "offset": 0
            },
            "parentNodeId": null,
            "targetNodeId": null,
            "nodeIndex": null,
            "payload": {
              "siblingId": "a8b579d3-93c2-4837-8731-34fa04badb8f",
              "newNode": {
                "NodeName": "ParagraphBlock",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "2a7ee18a-b59b-4bb9-c7c8-d701d2b6e12a",
                "Depth": 1,
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Strong",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "6837fef1-f68e-537f-572d-a7c743472b7e",
                    "Depth": 2,
                    "TextContent": null,
                    "Children": [
                      {
                        "NodeName": "Text",
                        "Attributes": {},
                        "ChildIndex": 0,
                        "Guid": "6980e5f2-3821-8a70-374b-d83436ca1fd5",
                        "Depth": 3,
                        "TextContent": "raph with both ",
                        "Children": []
                      },
                      {
                        "NodeName": "Strong",
                        "Attributes": {},
                        "ChildIndex": 0,
                        "Guid": "c7eb1eaa-251d-e214-9c75-95d9e9d77068",
                        "Depth": 3,
                        "TextContent": null,
                        "Children": [
                          {
                            "NodeName": "Emphasis",
                            "Attributes": {},
                            "ChildIndex": 0,
                            "Guid": "3689467e-93b4-637d-ac18-22907fdbea76",
                            "Depth": 4,
                            "TextContent": null,
                            "Children": [
                              {
                                "NodeName": "Text",
                                "Attributes": {},
                                "ChildIndex": 0,
                                "Guid": "928d0038-ddaa-d09e-ec11-8250b77dbed3",
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
                        "Guid": "81e049df-a221-8c7e-0297-2cfab34427b2",
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
                    "Guid": "38c6642d-5276-c173-c2b6-bfbb9d78fdae",
                    "Depth": 2,
                    "TextContent": "This is another paragraph.",
                    "Children": []
                  }
                ]
              }
            },
            "timestamp": 1701534544823
          } as AstOperation<'insertAfter'>;
    
        const updatedAst = applyOperation(mockAst, mockOperation);
        expect(updatedAst).not.toBeNull();
        
      });

    it('correctly applies replace operation', () => {
        const mockAst = mockAstData;
        const mockOperation = {
            "type": "replace",
            "initialPosition": {
              "targetParentId": "para_a8b579d3-93c2-4837-8731-34fa04badb8f",
              "nodeIndex": 0,
              "offset": 15
            },
            "finalPosition": {
              "targetParentId": "6837fef1-f68e-537f-572d-a7c743472b7e",
              "nodeIndex": 0,
              "offset": 0
            },
            "parentNodeId": null,
            "targetNodeId": "a8b579d3-93c2-4837-8731-34fa04badb8f",
            "nodeIndex": null,
            "payload": {
              "oldNode": {
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
              "newNode": {
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
                        "TextContent": "This is a parag",
                        "Children": []
                      }
                    ]
                  }
                ]
              }
            },
            "timestamp": 1701534544823
          } as AstOperation<'replace'>;
    
        const updatedAst = applyOperation(mockAst, mockOperation);
        expect(updatedAst).not.toBeNull();
        
      });

    it('correctly applies remove after operation', () => {
      const mockAst = mockAstData;
      const mockOperation = {
        "type": "removeAfter",
        "initialPosition": {
          "targetParentId": "para_a8b579d3-93c2-4837-8731-34fa04badb8f",
          "nodeIndex": 0,
          "offset": 15
        },
        "finalPosition": {
          "targetParentId": "6837fef1-f68e-537f-572d-a7c743472b7e",
          "nodeIndex": 0,
          "offset": 0
        },
        "parentNodeId": null,
        "targetNodeId": null,
        "nodeIndex": null,
        "payload": {
          "siblingId": "a8b579d3-93c2-4837-8731-34fa04badb8f",
          "targetNode": {
            "NodeName": "ParagraphBlock",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "2a7ee18a-b59b-4bb9-c7c8-d701d2b6e12a",
            "Depth": 1,
            "TextContent": null,
            "Children": [
              {
                "NodeName": "Strong",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "6837fef1-f68e-537f-572d-a7c743472b7e",
                "Depth": 2,
                "TextContent": null,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "6980e5f2-3821-8a70-374b-d83436ca1fd5",
                    "Depth": 3,
                    "TextContent": "raph with both ",
                    "Children": []
                  },
                  {
                    "NodeName": "Strong",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Guid": "c7eb1eaa-251d-e214-9c75-95d9e9d77068",
                    "Depth": 3,
                    "TextContent": null,
                    "Children": [
                      {
                        "NodeName": "Emphasis",
                        "Attributes": {},
                        "ChildIndex": 0,
                        "Guid": "3689467e-93b4-637d-ac18-22907fdbea76",
                        "Depth": 4,
                        "TextContent": null,
                        "Children": [
                          {
                            "NodeName": "Text",
                            "Attributes": {},
                            "ChildIndex": 0,
                            "Guid": "928d0038-ddaa-d09e-ec11-8250b77dbed3",
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
                    "Guid": "81e049df-a221-8c7e-0297-2cfab34427b2",
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
                "Guid": "38c6642d-5276-c173-c2b6-bfbb9d78fdae",
                "Depth": 2,
                "TextContent": "This is another paragraph.",
                "Children": []
              }
            ]
          }
        },
        "timestamp": 1701534544823
      } as AstOperation<'removeAfter'>;
  
      const updatedAst = applyOperation(mockAst, mockOperation);
      expect(updatedAst).not.toBeNull();
      
    });
  });