import { vi } from "vitest";
import { handleArrowKeyLeftOrRightPress } from ".";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { mockOutputHtml, mockProcessedAst, mockProcessedAstMap } from "../../__mocks__/editor-mocks";
import { removeEmptyTextNodes } from "../../utils/test-utils";

describe('handleArrowKeyLeftOrRightPress', () => {
  
    it('moves cursor to the left at the start of a text node', () => {

      const mockEvent = {
        key: 'ArrowLeft', // Or 'ArrowRight' depending on the test case
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        // Add any other properties or methods that are accessed within the function
      } as unknown as React.KeyboardEvent<HTMLElement>;

      const editorData: EditorDataType = EditorData;

      document.body.innerHTML = mockOutputHtml;

      const textNode = document.getElementById('para_ac1f684e-57a4-464f-aa76-c751e7a36550')?.childNodes[0];
      expect(textNode).not.toBeUndefined();

      const selection = window.getSelection();
      if (selection) {
        const range: Range = new Range();
        range.setStart(textNode!, 0);
        range.setEnd(textNode!, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      handleArrowKeyLeftOrRightPress(mockEvent, editorData, mockProcessedAst, mockProcessedAstMap, 'left');

      const newRange = selection?.getRangeAt(0);
      expect(newRange).not.toBeUndefined();

      const newContainer = newRange?.startContainer;
      expect(newContainer).not.toBeUndefined();

      const parent = newContainer?.parentElement;
      expect(parent).not.toBeUndefined();

      expect(parent!.id).toBe('6436b060-1804-4778-baec-1aaf8d4a9b9a');

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('should use default behavior when moving cursor to the right at the start of a text node', () => {
        // Setup and simulate cursor at end
        // Trigger right arrow key press
        // Assert expected behavior
  
        const mockEvent = {
          key: 'ArrowRight', // Or 'ArrowRight' depending on the test case
          preventDefault: vi.fn(),
          stopPropagation: vi.fn(),
          // Add any other properties or methods that are accessed within the function
        } as unknown as React.KeyboardEvent<HTMLElement>;
  
        const editorData: EditorDataType = EditorData;
  
        document.body.innerHTML = mockOutputHtml;
  
        const textNode = document.getElementById('para_a87edb5f-43f6-4b8a-9822-aa5866efe6ae')?.childNodes[0];
        expect(textNode).not.toBeUndefined();
  
        const selection = window.getSelection();
        if (selection) {
          const range: Range = new Range();
          range.setStart(textNode!, 0);
          range.setEnd(textNode!, 0);
          selection.removeAllRanges();
          selection.addRange(range);
        }
  
        handleArrowKeyLeftOrRightPress(mockEvent, editorData, mockProcessedAst, mockProcessedAstMap, 'right');
  
        const newRange = selection?.getRangeAt(0);
        expect(newRange).not.toBeUndefined();
  
        const newContainer = newRange?.startContainer;
        expect(newContainer).not.toBeUndefined();
  
        const parent = newContainer?.parentElement;
        expect(parent).not.toBeUndefined();
  
        expect(newRange?.startOffset).toBe(0);
        expect(parent!.id).toBe('para_a87edb5f-43f6-4b8a-9822-aa5866efe6ae');
  
        expect(mockEvent.preventDefault).toHaveBeenCalledTimes(0);
      });
  
    it('moves cursor to the right at the end of a text node', () => {
      // Setup and simulate cursor at end
      // Trigger right arrow key press
      // Assert expected behavior

      const mockEvent = {
        key: 'ArrowRight', // Or 'ArrowRight' depending on the test case
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        // Add any other properties or methods that are accessed within the function
      } as unknown as React.KeyboardEvent<HTMLElement>;

      const editorData: EditorDataType = EditorData;

      document.body.innerHTML = mockOutputHtml;

      const textNode = document.getElementById('para_0ede582c-80d4-43d3-b6ce-bdba3dabaafd')?.childNodes[0];
      expect(textNode).not.toBeUndefined();

      const selection = window.getSelection();
      if (selection) {
        const range: Range = new Range();
        range.setStart(textNode!, 23);
        range.setEnd(textNode!, 23);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      handleArrowKeyLeftOrRightPress(mockEvent, editorData, mockProcessedAst, mockProcessedAstMap, 'right');

      const newRange = selection?.getRangeAt(0);
      expect(newRange).not.toBeUndefined();

      const newContainer = newRange?.startContainer;
      expect(newContainer).not.toBeUndefined();

      const parent = newContainer?.parentElement;
      expect(parent).not.toBeUndefined();

      expect(parent!.id).toBe('45575c23-9d26-4775-9383-71141258a4ac');

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  
    it('handles no movement at the start of the first node in a row', () => {
      // Setup for the first node scenario
      // Trigger left arrow key press
      // Assert no movement

      const mockEvent = {
        key: 'ArrowLeft', // Or 'ArrowRight' depending on the test case
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        // Add any other properties or methods that are accessed within the function
      } as unknown as React.KeyboardEvent<HTMLElement>;

      const editorData: EditorDataType = EditorData;

      document.body.innerHTML = mockOutputHtml;

      const textNode = document.getElementById('c069fb1b-83fc-4bd9-b1fb-f385f4150da1')?.childNodes[0];
      expect(textNode).not.toBeUndefined();

      const selection = window.getSelection();
      if (selection) {
        const range: Range = new Range();
        range.setStart(textNode!, 0);
        range.setEnd(textNode!, 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      handleArrowKeyLeftOrRightPress(mockEvent, editorData, mockProcessedAst, mockProcessedAstMap, 'left');

      const newRange = selection?.getRangeAt(0);
      expect(newRange).not.toBeUndefined();

      const newContainer = newRange?.startContainer;
      expect(newContainer).not.toBeUndefined();

      const parent = newContainer?.parentElement;
      expect(parent).not.toBeUndefined();

      expect(parent!.id).toBe('c069fb1b-83fc-4bd9-b1fb-f385f4150da1');

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(0);
    });
  
    it('moves cursor to the next row at the end of the last node in a row', () => {
      // Setup for the last node scenario
      // Trigger right arrow key press
      // Assert cursor moves to the next row

      const mockEvent = {
        key: 'ArrowRight', // Or 'ArrowRight' depending on the test case
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        // Add any other properties or methods that are accessed within the function
      } as unknown as React.KeyboardEvent<HTMLElement>;

      const editorData: EditorDataType = EditorData;

      document.body.innerHTML = mockOutputHtml;

      const textNode = document.getElementById('para_8b50e804-f1d7-430e-9f07-ce6cb0bef070')?.childNodes[4];
      expect(textNode).not.toBeUndefined();

      const selection = window.getSelection();
      if (selection) {
        const range: Range = new Range();
        range.setStart(textNode!, 6);
        range.setEnd(textNode!, 6);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      handleArrowKeyLeftOrRightPress(mockEvent, editorData, mockProcessedAst, mockProcessedAstMap, 'right');

      const newRange = selection?.getRangeAt(0);
      expect(newRange).not.toBeUndefined();

      const newContainer = newRange?.startContainer;
      expect(newContainer).not.toBeUndefined();

      const parent = newContainer?.parentElement;
      expect(parent).not.toBeUndefined();

      expect(parent!.id).toBe('35e062d2-3b3c-4ca5-9084-b604c97ea239');

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
  
    it('handles no selection available scenario', () => {
      // Setup for no selection
      // Trigger arrow key press
      // Assert correct handling

      const mockEvent = {
        key: 'ArrowRight', // Or 'ArrowRight' depending on the test case
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        // Add any other properties or methods that are accessed within the function
      } as unknown as React.KeyboardEvent<HTMLElement>;

      const editorData: EditorDataType = EditorData;

      document.body.innerHTML = mockOutputHtml;

      const textNode = document.getElementById('para_8b50e804-f1d7-430e-9f07-ce6cb0bef070')?.childNodes[4];
      expect(textNode).not.toBeUndefined();

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
      }

      handleArrowKeyLeftOrRightPress(mockEvent, editorData, mockProcessedAst, mockProcessedAstMap, 'right');

      expect(() => selection?.getRangeAt(0)).toThrow();

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(0);

    });
  
    it('handles selection inside a special node', () => {
      // Setup for a selection inside a special node like CODE or H1
      // Trigger arrow key press
      // Assert correct handling

      const mockEvent = {
        key: 'ArrowRight', // Or 'ArrowRight' depending on the test case
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
        // Add any other properties or methods that are accessed within the function
      } as unknown as React.KeyboardEvent<HTMLElement>;

      const editorData: EditorDataType = EditorData;

      document.body.innerHTML = mockOutputHtml;
      removeEmptyTextNodes(document.body);
      const textNode = document.getElementById('para_077cfba4-d7b0-4dca-9660-a6fec0243947')?.childNodes[0];
      expect(textNode).not.toBeUndefined();

      const selection = window.getSelection();
      if (selection) {
        const range: Range = new Range();
        expect(textNode?.textContent?.length).toBeGreaterThan(0);
        range.setStart(textNode!, textNode?.textContent?.length || 0);
        range.setEnd(textNode!, textNode?.textContent?.length || 0);
        selection.removeAllRanges();
        selection.addRange(range);
      }

      handleArrowKeyLeftOrRightPress(mockEvent, editorData, mockProcessedAst, mockProcessedAstMap, 'right');

      const newRange = selection?.getRangeAt(0);
      expect(newRange).not.toBeUndefined();

      const newContainer = newRange?.startContainer;
      expect(newContainer).not.toBeUndefined();

      const parent = newContainer?.parentElement;
      expect(parent).not.toBeUndefined();

      expect(newRange?.startOffset).toBe(1);
      expect(parent!.id).toBe('078ac8ba-fd8d-4166-aa4d-90ba955d11b5');

      expect(mockEvent.preventDefault).toHaveBeenCalledTimes(1);

    });
  
    // Additional scenarios as needed
  });