import { vi } from "vitest";
import { enterAroundCodeOrAlertBlocks } from ".";
import { mockCustomElement } from "../../utils/test-utils";
import { IHistoryManagerRecorder } from "../../components/wysiwyg/interface";

describe.only('enterAroundCodeOrAlertBlocks', () => {
    it('handles startOffset === 0', () => {
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
            "textContent": "console.log('Hello, world!');",
            "childNodes": []
          }
        ]
      }),
        "higherLevelIndex": -1,
        "child": {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
          "Depth": 2,
          "TextContent": "console.log('Hello, world!');",
          "Children": []
        },
        "astParent": null,
        "immediateChild": {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
          "Depth": 2,
          "TextContent": "console.log('Hello, world!');",
          "Children": []
        },
        "rootChildId": "section_ca3e3b0b-be05-4a6d-b7c8-b29e8d64f34d",
        "containerIndex": 0,
        "grandChild": null,
        "endChild": null,
        "endGrandChild": null
      };
      const mockHigherLevelChildren = [
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
      const mockChildren = [
        {
          "NodeName": "Text",
          "Attributes": {},
          "ChildIndex": 0,
          "Guid": "fc245cd8-38b5-45fb-ab93-8c4de8cd8116",
          "Depth": 2,
          "TextContent": "console.log('Hello, world!');",
          "Children": []
        }
      ];
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "textContent": "console.log('Hello, world!');",
        "childNodes": []
      });
  
      const result = enterAroundCodeOrAlertBlocks(mockUpdateData, 'para_fc245cd8-38b5-45fb-ab93-8c4de8cd8116', mockHistoryManager, mockHigherLevelChildren, mockChildren, mockContainer, 0);
      
      expect(mockHistoryManager.recordChildInsertBefore).toHaveBeenCalledTimes(1);
      expect(result).not.toBeNull();
      expect(result!.type).toBe("higherLevelSplitOrMove");
      expect(result!.nodes[0].TextContent).toBe("\n");
      // Assertions here
    });
  
    // More tests for other scenarios
  });