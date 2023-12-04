import { vi } from "vitest";
import { AstNode, IHistoryManager, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { cleanup, mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { insertBothStrongAndEmphasisTextIntoNormalText } from ".";

vi.mock('../node-operations/generate-key', () => {
    return {
      __esModule: true, 
      default: vi.fn().mockReturnValue('mock-key') 
    };
  });

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('insertStrongAndEmphasisTextIntoNormalText', () => {
    it('updates text and calls history manager correctly', () => {
        const mockHistoryManager: IHistoryManagerRecorder = {
            recordChildReplace: vi.fn(),
            recordChildTextUpdate: vi.fn((oldTextContent: string, offset: number, parent: AstNode, child: AstNode | null, rootChildId?: string) => 
            {  
                expect(offset).toBe(21);
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
      const startOffset = 17;
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "This is a third paragraph"
      });
      const mockAstParent = toMockAst({
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
      const mockChild = toMockAst({
        "NodeName": "Text",
        "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
        "TextContent": "This is a third paragraph"
      });
      const mockChildren = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
          "TextContent": "This is a third paragraph"
        }
      ]);
      const index = 0;
      const higherLevelIndex = 0;
      const mockHigherLevelChildren = toMockAstArray([
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
        }
      ]);
      mockHigherLevelChildren[0].Children = mockChildren;
      mockChildren[0] = mockChild;

      const result = insertBothStrongAndEmphasisTextIntoNormalText(
        startOffset, mockContainer, mockAstParent, mockChild, mockChildren, index, mockHistoryManager as IHistoryManager, higherLevelIndex, mockHigherLevelChildren, "insertNew", "section_ac1f684e-57a4-464f-aa76-c751e7a36550", ["strong", "em"] as unknown as string, 'a');
  
      
      expect(mockChildren[0].TextContent).toBe('This is a third p');
      expect(mockHistoryManager.recordChildInsertAfter).toHaveBeenCalledTimes(2);
      expect(result).not.toBeNull();
      expect(result!.type).toBe('insertNew');
      expect(result!.nodes.length).toBe(3);
      expect(result!).toStrictEqual(
        {
            "type": "insertNew",
            "rootChildId": "section_ac1f684e-57a4-464f-aa76-c751e7a36550",
            "nodes": [
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "0ab14874-7955-4724-963d-8ed36c453662",
                "Depth": 0,
                "TextContent": "This is a third p",
                "Children": []
              },
              {
                "NodeName": "Emphasis",
                "Guid": "mock-key",
                "Attributes": {},
                "ChildIndex": 0,
                "Depth": 0,
                "Children": [
                  {
                    "NodeName": "Text",
                    "Guid": "mock-key",
                    "Attributes": {},
                    "ChildIndex": 0,
                    "Depth": 0,
                    "Children": [],
                    "TextContent": "a",
                    "Version": "V0"
                  }
                ],
                "TextContent": null,
                "Version": "V0"
              },
              {
                "NodeName": "Text",
                "Attributes": {},
                "ChildIndex": 0,
                "Guid": "mock-key",
                "Depth": 0,
                "TextContent": "aragraph",
                "Children": []
              }
            ]
          }
      );
    });
  });