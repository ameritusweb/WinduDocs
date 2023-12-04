import { vi } from "vitest";
import { enterAroundQuoteBlocks, enterAroundStrongOrEmphasisText } from ".";
import { mockCustomElement, toMockAst, toMockAstArray } from "../../utils/test-utils";
import { IHistoryManagerRecorder } from "../../components/wysiwyg/interface";

describe('enterAroundQuoteBlocks', () => {
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
            "textContent": "This is a blockquote."
          }
        ]
      }),
        "higherLevelIndex": 0,
        "child": toMockAst({
          "NodeName": "ParagraphBlock",
          "Guid": "f36e3433-6aa5-4f2f-b5a4-7ddeb612472e",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "291b296b-99b1-4702-a119-0c062a3a5500",
              "TextContent": "This is a blockquote."
            }
          ]
        }),
        "astParent": null,
        "lowerLevelChild": null,
        "immediateChild": toMockAst({
          "NodeName": "ParagraphBlock",
          "Guid": "f36e3433-6aa5-4f2f-b5a4-7ddeb612472e",
          "Children": [
            {
              "NodeName": "Text",
              "Guid": "291b296b-99b1-4702-a119-0c062a3a5500",
              "TextContent": "This is a blockquote."
            }
          ]
        }),
        "rootChildId": "section_cb7747a5-e6b2-4240-917c-c6ac59a45b23",
        "containerIndex": 0,
        "grandChild": toMockAst({
          "NodeName": "Text",
          "Guid": "291b296b-99b1-4702-a119-0c062a3a5500",
          "TextContent": "This is a blockquote."
        }),
        "endChild": null,
        "endGrandChild": null,
        "skyChildren": [],
        "higherLevelChildren": toMockAstArray([
          {
            "NodeName": "ParagraphBlock",
            "Guid": "f36e3433-6aa5-4f2f-b5a4-7ddeb612472e",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "291b296b-99b1-4702-a119-0c062a3a5500",
                "TextContent": "This is a blockquote."
              }
            ]
          },
          {
            "NodeName": "ParagraphBlock",
            "Guid": "fb9671fa-a0c0-494c-a56f-0b214482e8bd",
            "Children": [
              {
                "NodeName": "Text",
                "Guid": "0aef21a1-5e28-4074-afc7-086140b0f28d",
                "TextContent": "It can span"
              }
            ]
          }
        ])
      };
      const mockChildren = toMockAstArray([
        {
          "NodeName": "Text",
          "Guid": "291b296b-99b1-4702-a119-0c062a3a5500",
          "TextContent": "This is a blockquote."
        }
      ]);
      const mockContainer = mockCustomElement({
        "nodeName": "#text",
        "childNodes": [],
        "textContent": "This is a blockquote."
      });
  
      const result = enterAroundQuoteBlocks(mockUpdateData, "para_f36e3433-6aa5-4f2f-b5a4-7ddeb612472e", mockHistoryManager, mockChildren, mockContainer, 10);
      
      expect(mockHistoryManager.recordChildInsertAfter).toHaveBeenCalledTimes(1);
      expect(result).not.toBeNull();
      expect(result!.type).toBe("higherLevelSplitOrMove");
      expect(result!.nodes[0].Children[0].TextContent).toBe("This is a ");
      
    });
  
    
  });