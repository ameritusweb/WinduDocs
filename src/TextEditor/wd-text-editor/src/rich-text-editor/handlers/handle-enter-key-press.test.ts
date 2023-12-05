import { vi } from "vitest";
import { mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { AstContext, CustomNode, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { handleEnterKeyPress } from ".";
import { enterAroundCodeOrAlertBlocks, enterAroundLists, enterAroundNormalText, enterAroundQuoteBlocks, enterAroundStrongOrEmphasisText } from "../enter-operations";
import { mockAstContext } from "../../__mocks__/editor-mocks";
  
  describe('handleEnterKeyPress', () => {
    
    beforeEach(() => {
        vi.mock('../enter-operations', () => ({
            enterAroundNormalText: vi.fn(),
            enterAroundCodeOrAlertBlocks: vi.fn(),
            enterAroundLists: vi.fn(),
            enterAroundQuoteBlocks: vi.fn(), 
            enterAroundStrongOrEmphasisText: vi.fn()
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
        "astParent": null,
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

    it('handles enter around normal text correctly', () => {
        
        const { mockHistoryManager, mockContainer, mockContext, mockUpdateData, mockChildren, mockRange } 
        = createMocks({ nodeName: 'P' }, {});
        mockRange.setStart(document.createTextNode(''), 0);
  
        handleEnterKeyPress(mockHistoryManager, mockContainer, mockChildren, mockUpdateData, mockContext, mockRange, 0);
  
        expect(enterAroundNormalText).toHaveBeenCalled();

    });

    it('handles enter around strong or emphasis text correctly', () => {
        
        const { mockHistoryManager, mockContainer, mockContext, mockUpdateData, mockChildren, mockRange } = createMocks({ nodeName: 'STRONG' }, {});
        mockRange.setStart(document.createTextNode(''), 0);
  
        handleEnterKeyPress(mockHistoryManager, mockContainer, mockChildren, mockUpdateData, mockContext, mockRange, 0);
  
        expect(enterAroundStrongOrEmphasisText).toHaveBeenCalled();

    });

    it('handles enter around code blocks correctly', () => {
        
        const { mockHistoryManager, mockContainer, mockContext, mockUpdateData, mockChildren, mockRange } = createMocks({ nodeName: 'CODE' }, { isCodeBlock: true });
        mockRange.setStart(document.createTextNode(''), 0);
  
        handleEnterKeyPress(mockHistoryManager, mockContainer, mockChildren, mockUpdateData, mockContext, mockRange, 0);
  
        expect(enterAroundCodeOrAlertBlocks).toHaveBeenCalled();

    });

    it('handles enter around quote blocks correctly', () => {
        
        const { mockHistoryManager, mockContainer, mockContext, mockUpdateData, mockChildren, mockRange } = createMocks({ nodeName: 'BLOCKQUOTE' }, { isQuoteBlock: true });
        mockRange.setStart(document.createTextNode(''), 0);
  
        handleEnterKeyPress(mockHistoryManager, mockContainer, mockChildren, mockUpdateData, mockContext, mockRange, 0);
  
        expect(enterAroundQuoteBlocks).toHaveBeenCalled();

    });

    it('handles enter around lists correctly', () => {
        
        const { mockHistoryManager, mockContainer, mockContext, mockUpdateData, mockChildren, mockRange } = createMocks({ nodeName: 'LI' }, { isOrderedList: true });
        mockRange.setStart(document.createTextNode(''), 0);
  
        handleEnterKeyPress(mockHistoryManager, mockContainer, mockChildren, mockUpdateData, mockContext, mockRange, 0);
  
        expect(enterAroundLists).toHaveBeenCalled();

    });

    it('handles enter around links correctly', () => {
        
        const { mockHistoryManager, mockContainer, mockContext, mockUpdateData, mockChildren, mockRange } = createMocks({ nodeName: 'A' }, { isLink: true });
        mockRange.setStart(document.createTextNode(''), 0);
  
        const res = handleEnterKeyPress(mockHistoryManager, mockContainer, mockChildren, mockUpdateData, mockContext, mockRange, 0);
  
        expect(res).toBeNull();
        expect(enterAroundNormalText).not.toHaveBeenCalled();

    });

    it('handles enter around an unknown element correctly', () => {
        
        const { mockHistoryManager, mockContainer, mockContext, mockUpdateData, mockChildren, mockRange } = createMocks({ nodeName: 'UNKNOWN' }, { isTable: true });
        mockRange.setStart(document.createTextNode(''), 0);
  
        const res = handleEnterKeyPress(mockHistoryManager, mockContainer, mockChildren, mockUpdateData, mockContext, mockRange, 0);
  
        expect(res).toBeNull();
        expect(enterAroundNormalText).not.toHaveBeenCalled();

    });
  
    // Add more tests for different contexts and conditions
  });