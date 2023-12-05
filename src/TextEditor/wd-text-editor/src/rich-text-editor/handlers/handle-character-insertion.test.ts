import { vi } from "vitest";
import { handleCharacterInsertion } from ".";
import { AstContext, CustomNode, IHistoryManagerRecorder, IdableNode } from "../../components/wysiwyg/interface";
import { mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { mockAstContext } from "../../__mocks__/editor-mocks";
import { insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText, insertBothStrongAndEmphasisTextIntoNormalText, insertEitherStrongOrEmphasisTextIntoNormalText, insertNormalTextIntoBothStrongAndEmphasisText, insertNormalTextIntoEitherStrongOrEmphasisText, insertNormalTextIntoOtherNormalText, insertStrongTextIntoEmphasisTextOrViceVersa, insertTextIntoEitherACodeBlockOrAlertBlock } from "../insertion-operations";

describe('handleCharacterInsertion', () => {

    beforeEach(() => {
        vi.mock('../insertion-operations', () => ({
            insertTextIntoEitherACodeBlockOrAlertBlock: vi.fn(),
            insertNormalTextIntoOtherNormalText: vi.fn(),
            insertEitherStrongOrEmphasisTextIntoNormalText: vi.fn(),
            insertStrongTextIntoEmphasisTextOrViceVersa: vi.fn(),
            insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText: vi.fn(),
            insertBothStrongAndEmphasisTextIntoNormalText: vi.fn(),
            insertNormalTextIntoEitherStrongOrEmphasisText: vi.fn(),
            insertNormalTextIntoBothStrongAndEmphasisText: vi.fn()
          }));
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    const createMocks = (parent: Partial<CustomNode>, context: Partial<AstContext>) => {

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
        "textContent": "This is a third paragraph"
        })
      const mockChildren = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "TextContent": "This is a third paragraph"
        }
      ]);
      const mockUpdateData = {
        "parent": mockCustomElement({
        ...parent,
        "childNodes": [
          {
            "nodeName": "#text",
            "childNodes": [],
            "textContent": "This is a third paragraph"
          }
        ]
      }),
        "higherLevelIndex": 4,
        "child": toMockAst({
          "NodeName": "ParagraphBlock",
          "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
              "TextContent": "This is a third paragraph"
            }
          ]
        }),
        "astParent": toMockAst({}),
        "lowerLevelChild": null,
        "immediateChild": toMockAst({
          "NodeName": "ParagraphBlock",
          "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
              "TextContent": "This is a third paragraph"
            }
          ]
        }),
        "rootChildId": "section_ac1f684e-57a4-464f-aa76-c751e7a36550",
        "containerIndex": 0,
        "grandChild": toMockAst({
          "NodeName": "Text",
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "TextContent": "This is a third paragraph"
        }),
        "endChild": null,
        "endGrandChild": null,
        "skyChildren": [],
        "higherLevelChildren": []
      };
      const mockContext = {
        ...mockAstContext,
        ...context
      } as AstContext;
      const mockRange = new Range();

      return {
        mockHistoryManager,
        mockContainer,
        mockContext,
        mockUpdateData,
        mockChildren,
        mockRange
      };

      };
    
    it('handles character insertion for strong text into normal text', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'strong', 
        4
      );
  
      expect(insertEitherStrongOrEmphasisTextIntoNormalText).toHaveBeenCalled();
    });

    it('handles character insertion for emphasis text into normal text', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'em', 
        4
      );
  
      expect(insertEitherStrongOrEmphasisTextIntoNormalText).toHaveBeenCalled();
    });

    it('handles character insertion for normal text', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
        const grandParent = mockCustomElement({
            "nodeName": "STRONG",
            "childNodes": [
                {
                    "nodeName": "P",
                    "id": "P123",
                    "childNodes": [
                        {
                            "nodeName": "#text",
                            "childNodes": [],
                            "textContent": "This is a third paragraph"
                          }
                    ]
                }
            ]
          });
          mockUpdateData.parent = grandParent.childNodes[0] as IdableNode;

      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'normal', 
        4
      );
  
      expect(insertNormalTextIntoOtherNormalText).toHaveBeenCalled();
    });

    it('handles character insertion for both strong and emphasis into normal text', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
        const grandParent = mockCustomElement({
            "nodeName": "STRONG",
            "childNodes": [
                {
                    "nodeName": "P",
                    "id": "P123",
                    "childNodes": [
                        {
                            "nodeName": "#text",
                            "childNodes": [],
                            "textContent": "This is a third paragraph"
                          }
                    ]
                }
            ]
          });
          mockUpdateData.parent = grandParent.childNodes[0] as IdableNode;

      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        ['strong', 'em'] as any, 
        4
      );
  
      expect(insertBothStrongAndEmphasisTextIntoNormalText).toHaveBeenCalled();
    });

    it('handles character insertion for code or alert blocks', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
        const grandParent = mockCustomElement({
            "nodeName": "CODE",
            "childNodes": [
                {
                    "nodeName": "P",
                    "id": "P123",
                    "childNodes": [
                        {
                            "nodeName": "#text",
                            "childNodes": [],
                            "textContent": "This is a third paragraph"
                          }
                    ]
                }
            ]
          });
          mockUpdateData.parent = grandParent.childNodes[0] as IdableNode;

      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'normal', 
        4
      );
  
      expect(insertTextIntoEitherACodeBlockOrAlertBlock).toHaveBeenCalled();
    });

    it('handles character insertion for both strong and emphasis text into either strong or emphasis text', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
        const grandParent = mockCustomElement({
            "nodeName": "P",
            "childNodes": [
                {
                    "nodeName": "STRONG",
                    "id": "P123",
                    "childNodes": [
                        {
                            "nodeName": "#text",
                            "childNodes": [],
                            "textContent": "This is a third paragraph"
                          }
                    ]
                }
            ]
          });
          mockUpdateData.parent = grandParent.childNodes[0] as IdableNode;

      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        ['strong', 'em'] as any, 
        4
      );
  
      expect(insertBothStrongAndEmphasisTextInsideEitherStrongOrEmphasisText).toHaveBeenCalled();
    });

    it('handles character insertion for strong or emphasis text into the other', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
        const grandParent = mockCustomElement({
            "nodeName": "P",
            "childNodes": [
                {
                    "nodeName": "STRONG",
                    "id": "P123",
                    "childNodes": [
                        {
                            "nodeName": "#text",
                            "childNodes": [],
                            "textContent": "This is a third paragraph"
                          }
                    ]
                }
            ]
          });
          mockUpdateData.parent = grandParent.childNodes[0] as IdableNode;

      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'em', 
        4
      );
  
      expect(insertStrongTextIntoEmphasisTextOrViceVersa).toHaveBeenCalled();
    });

    it('handles character insertion for normal text into either strong or emphasis text', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
        const grandParent = mockCustomElement({
            "nodeName": "P",
            "childNodes": [
                {
                    "nodeName": "EM",
                    "id": "P123",
                    "childNodes": [
                        {
                            "nodeName": "#text",
                            "childNodes": [],
                            "textContent": "This is a third paragraph"
                          }
                    ]
                }
            ]
          });
          mockUpdateData.parent = grandParent.childNodes[0] as IdableNode;

      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'normal', 
        4
      );
  
      expect(insertNormalTextIntoEitherStrongOrEmphasisText).toHaveBeenCalled();
    });

    it('handles character insertion for normal text into both strong and emphasis text', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
        const grandParent = mockCustomElement({
            "nodeName": "STRONG",
            "childNodes": [
                {
                    "nodeName": "EM",
                    "id": "P123",
                    "childNodes": [
                        {
                            "nodeName": "#text",
                            "childNodes": [],
                            "textContent": "This is a third paragraph"
                          }
                    ]
                }
            ]
          });
          mockUpdateData.parent = grandParent.childNodes[0] as IdableNode;

      handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'normal', 
        4
      );
  
      expect(insertNormalTextIntoBothStrongAndEmphasisText).toHaveBeenCalled();
    });

    it('handles an invalid scenario', () => {
        const { mockHistoryManager, mockContainer, mockUpdateData, mockChildren } 
        = createMocks({ nodeName: 'P' }, {});
  
      expect(() => handleCharacterInsertion(
        mockHistoryManager, 
        mockContainer, 
        mockChildren, 
        mockUpdateData, 
        'a', 
        'normal', 
        4
      )).toThrow();
    });

  });