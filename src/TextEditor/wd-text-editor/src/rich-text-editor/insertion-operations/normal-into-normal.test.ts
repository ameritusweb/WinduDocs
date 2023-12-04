import { vi } from "vitest";
import { AstNode, IHistoryManager, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { insertNormalTextIntoOtherNormalText, insertTextIntoEitherACodeBlockOrAlertBlock } from ".";

describe('insertNormalTextIntoNormalText', () => {
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
      const mockGrandChild: AstNode = toMockAst({
        "NodeName": "Text",
        "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
        "TextContent": "This is a third paragraph"
      });
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "This is a third paragraph"
      });
      const startOffset = 17;
      const mockChild = toMockAst({
        "NodeName": "ParagraphBlock",
        "Guid": "ac1f684e-57a4-464f-aa76-c751e7a36550",
        "Children": [
          {
            "NodeName": "Text",
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "TextContent": "This is a third paragraph"
          }
        ]
      });
      const rootChildId = 'section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d';
      const mockChildren = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "TextContent": "This is a third paragraph"
        }
      ]);
      mockChildren[0] = mockGrandChild;
  
      const result = insertNormalTextIntoOtherNormalText(
        mockGrandChild, mockContainer, startOffset, mockHistoryManager as IHistoryManager, mockChild, rootChildId, mockChildren, 'a'
      );
  
      // Assertions here
      expect(mockGrandChild.TextContent).toBe('This is a third paaragraph');
      expect(mockHistoryManager.recordChildTextUpdate).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('insert');
      expect(result.rootChildId).toBe('section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d');
      expect(result.nodes.length).toBe(1);
      expect(result).toStrictEqual({
        "type": "insert",
        "rootChildId": "section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
        "nodes": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
            "Depth": 0,
            "TextContent": "This is a third paaragraph",
            "Children": [],
            "Version": "V1"
          }
        ]
      }
      );
    });
  });