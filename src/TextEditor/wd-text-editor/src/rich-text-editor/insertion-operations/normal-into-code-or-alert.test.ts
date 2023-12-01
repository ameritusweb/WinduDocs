import { vi } from "vitest";
import { AstNode, IHistoryManager, IHistoryManagerRecorder } from "../../components/wysiwyg/interface";
import { mockCustomElement } from "../../utils/test-utils";
import { insertTextIntoEitherACodeBlockOrAlertBlock } from ".";

describe('insertTextIntoEitherACodeBlockOrAlertBlock', () => {
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
            recordChildAdd: vi.fn(),
        };
      const mockChild: AstNode = {
        "NodeName": "Text",
        "Attributes": {},
        "ChildIndex": 2,
        "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
        "Depth": 2,
        "TextContent": "console.log('This is line 2!');",
        "Children": []
      };
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "console.log('This is line 2!');"
      })
      const startOffset = 21;
      const rootChildId = 'section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d';
      const higherLevelChildren = [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
          "Depth": 2,
          "TextContent": "console.log('Hello, world!');",
          "Children": []
        },
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 1,
          "Guid": "b7ea8d0a-fa75-4c41-b503-52be791878f1",
          "Depth": 2,
          "TextContent": "\n",
          "Children": []
        },
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 2,
          "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
          "Depth": 2,
          "TextContent": "console.log('This is line 2!');",
          "Children": []
        }
      ];
      const children = [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 2,
          "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
          "Depth": 2,
          "TextContent": "console.log('This is line 2!');",
          "Children": []
        }
      ];
  
      const result = insertTextIntoEitherACodeBlockOrAlertBlock(
        mockChild, mockContainer, startOffset, rootChildId, mockHistoryManager as IHistoryManager, higherLevelChildren, children, 'a'
      );
  
      // Assertions here
      expect(mockChild.TextContent).toBe('console.log(\'This is aline 2!\');');
      expect(mockHistoryManager.recordChildTextUpdate).toHaveBeenCalledTimes(1);
      expect(result.type).toBe('higherLevelInsert');
      expect(result.rootChildId).toBe('section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d');
      expect(result.nodes.length).toBe(3);
      expect(result).toStrictEqual({
        "type": "higherLevelInsert",
        "rootChildId": "section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
        "nodes": [
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 0,
            "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
            "Depth": 2,
            "TextContent": "console.log('Hello, world!');",
            "Children": []
          },
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 1,
            "Guid": "b7ea8d0a-fa75-4c41-b503-52be791878f1",
            "Depth": 2,
            "TextContent": "\n",
            "Children": []
          },
          {
            "NodeName": "Text",
            "Attributes": {},
            "ChildIndex": 2,
            "Guid": "744a50aa-4fef-40cc-8bff-707e24c719fd",
            "Depth": 2,
            "TextContent": "console.log('This is aline 2!');",
            "Children": [],
            "Version": "V1"
          }
        ]
      });
    });
  });