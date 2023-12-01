import { handleArrowKeyUpOrDownPress } from ".";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { mockOutputHtml, mockProcessedAst, mockProcessedAstMap } from "../../__mocks__/editor-mocks";
import { removeEmptyTextNodes } from "../../utils/test-utils";

describe('handleArrowKeyUpOrDownPress', () => {

    const editorData: EditorDataType = EditorData;

    beforeEach(() => {
        editorData.cursorOffsetReduction = 0;
    });

    it('moves cursor up at the start of a text node', () => {
  
        document.body.innerHTML = mockOutputHtml;
        removeEmptyTextNodes(document.body);
  
        const textNode = document.getElementById('para_fcdd8cf5-4e23-4e2b-b67a-25483a4f932d')?.childNodes[0];
        expect(textNode).not.toBeUndefined();
  
        const selection = window.getSelection();
        if (selection) {
          const range: Range = new Range();
          range.setStart(textNode!, 0);
          range.setEnd(textNode!, 0);
          selection.removeAllRanges();
          selection.addRange(range);
        }
  
        handleArrowKeyUpOrDownPress('ArrowUp', editorData, mockProcessedAst, mockProcessedAstMap);
  
        const newRange = selection?.getRangeAt(0);
        expect(newRange).not.toBeUndefined();
  
        const newContainer = newRange?.startContainer;
        expect(newContainer).not.toBeUndefined();
  
        const parent = newContainer?.parentElement;
        expect(parent).not.toBeUndefined();
  
        expect(parent!.id).toBe('ba16b5c1-d178-4ba0-8fb3-f2fa70b3fab4');
        expect(newRange?.startContainer).toStrictEqual(newRange?.endContainer);
        expect(newRange?.startOffset).toBe(0);
      });
  
      it('moves cursor down at the start of a text node', () => {    
      
            document.body.innerHTML = mockOutputHtml;
            removeEmptyTextNodes(document.body);
      
            const textNode = document.getElementById('para_fcdd8cf5-4e23-4e2b-b67a-25483a4f932d')?.childNodes[0];
            expect(textNode).not.toBeUndefined();
      
            const selection = window.getSelection();
            if (selection) {
              const range: Range = new Range();
              range.setStart(textNode!, 0);
              range.setEnd(textNode!, 0);
              selection.removeAllRanges();
              selection.addRange(range);
            }
      
            handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);
      
            const newRange = selection?.getRangeAt(0);
            expect(newRange).not.toBeUndefined();
      
            const newContainer = newRange?.startContainer;
            expect(newContainer).not.toBeUndefined();
      
            const parent = newContainer?.parentElement;
            expect(parent).not.toBeUndefined();
      
            expect(parent!.id).toBe('e6b4cd51-3bf0-4eb9-94cf-7d56565de739');
            expect(newRange?.startContainer).toStrictEqual(newRange?.endContainer);
            expect(newRange?.startOffset).toBe(0);
        });
      
        it('handles cursor down at the end of text', () => {
      
            document.body.innerHTML = mockOutputHtml;
            removeEmptyTextNodes(document.body);
      
            const textNode = document.getElementById('para_f36e3433-6aa5-4f2f-b5a4-7ddeb612472e')?.childNodes[0];
            expect(textNode).not.toBeUndefined();
            expect(textNode?.textContent?.length).not.toBeUndefined();
            expect(textNode?.textContent?.length).toBeGreaterThan(0);
  
            const selection = window.getSelection();
            if (selection) {
              const range: Range = new Range();
              range.setStart(textNode!, textNode?.textContent?.length || 0);
              range.setEnd(textNode!, textNode?.textContent?.length || 0);
              selection.removeAllRanges();
              selection.addRange(range);
            }
      
            handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);
      
            const newRange = selection?.getRangeAt(0);
            expect(newRange).not.toBeUndefined();
      
            const newContainer = newRange?.startContainer;
            expect(newContainer).not.toBeUndefined();
      
            const parent = newContainer?.parentElement;
            expect(parent).not.toBeUndefined();
      
            expect(parent!.id).toBe('para_fb9671fa-a0c0-494c-a56f-0b214482e8bd');
            expect(newRange?.startContainer).toStrictEqual(newRange?.endContainer);
            expect(newRange?.startContainer.textContent).not.toBeUndefined();
            expect(newRange?.startContainer.textContent!.length).toBeGreaterThan(0);
            expect(newRange?.startOffset).toBe(newRange?.startContainer.textContent?.length);
        });
      
        it('correctly navigates in nested CODE elements', () => {
      
            document.body.innerHTML = mockOutputHtml;
            removeEmptyTextNodes(document.body);
      
            const textNode = document.getElementById('para_077cfba4-d7b0-4dca-9660-a6fec0243947')?.childNodes[0];
            expect(textNode).not.toBeUndefined();
            expect(textNode?.textContent?.length).not.toBeUndefined();
            expect(textNode?.textContent?.length).toBeGreaterThan(0);
  
            const selection = window.getSelection();
            if (selection) {
              const range: Range = new Range();
              range.setStart(textNode!, 3);
              range.setEnd(textNode!, 3);
              selection.removeAllRanges();
              selection.addRange(range);
            }
      
            handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);
            handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);
  
            const newRange = selection?.getRangeAt(0);
            expect(newRange).not.toBeUndefined();
      
            const newContainer = newRange?.startContainer;
            expect(newContainer).not.toBeUndefined();
      
            const parent = newContainer?.parentElement;
            expect(parent).not.toBeUndefined();
      
            expect(parent!.id).toBe('para_fe891315-9518-4872-9a94-be019bd68e38');
            expect(newRange?.startContainer).toStrictEqual(newRange?.endContainer);
            expect(newRange?.startContainer.textContent).not.toBeUndefined();
            expect(newRange?.startContainer.textContent!.length).toBeGreaterThan(0);
            expect(newRange?.startOffset).toBe(newRange?.startContainer.textContent?.length);
        });
  
        it('correctly navigates in nested A elements', () => {
              
            document.body.innerHTML = mockOutputHtml;
            removeEmptyTextNodes(document.body);
      
            const textNode = document.getElementById('para_e35c5573-c64c-4e55-bc2e-cd718b1477c6')?.childNodes[2];
            expect(textNode).not.toBeUndefined();
            expect(textNode?.textContent?.length).not.toBeUndefined();
            expect(textNode?.textContent?.length).toBeGreaterThan(0);
  
            const selection = window.getSelection();
            if (selection) {
              const range: Range = new Range();
              range.setStart(textNode!, 4);
              range.setEnd(textNode!, 4);
              selection.removeAllRanges();
              selection.addRange(range);
            }
      
            handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);
            handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);
  
            const newRange = selection?.getRangeAt(0);
            expect(newRange).not.toBeUndefined();
      
            const newContainer = newRange?.startContainer;
            expect(newContainer).not.toBeUndefined();
      
            const parent = newContainer?.parentElement;
            expect(parent).not.toBeUndefined();
      
            expect(parent!.id).toBe('para_fcdd8cf5-4e23-4e2b-b67a-25483a4f932d');
            expect(newRange?.startContainer).toStrictEqual(newRange?.endContainer);
            expect(newRange?.startContainer.textContent).not.toBeUndefined();
            expect(newRange?.startContainer.textContent!.length).toBeGreaterThan(0);
            expect(newRange?.startOffset).toBe(newRange?.startContainer.textContent?.length);
        });

      it('correctly navigates in nested A elements from the middle of text to the middle of other text', () => {
    
          document.body.innerHTML = mockOutputHtml;
          removeEmptyTextNodes(document.body);
    
          const textNode = document.getElementById('para_e35c5573-c64c-4e55-bc2e-cd718b1477c6')?.childNodes[0];
          expect(textNode).not.toBeUndefined();
          expect(textNode?.textContent?.length).not.toBeUndefined();
          expect(textNode?.textContent?.length).toBeGreaterThan(0);

          const selection = window.getSelection();
          if (selection) {
            const range: Range = new Range();
            range.setStart(textNode!, 2);
            range.setEnd(textNode!, 2);
            selection.removeAllRanges();
            selection.addRange(range);
          }
    
          handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);
          handleArrowKeyUpOrDownPress('ArrowDown', editorData, mockProcessedAst, mockProcessedAstMap);

          const newRange = selection?.getRangeAt(0);
          expect(newRange).not.toBeUndefined();
    
          const newContainer = newRange?.startContainer;
          expect(newContainer).not.toBeUndefined();
    
          const parent = newContainer?.parentElement;
          expect(parent).not.toBeUndefined();
    
          expect(parent!.id).toBe('para_fcdd8cf5-4e23-4e2b-b67a-25483a4f932d');
          expect(newRange?.startContainer).toStrictEqual(newRange?.endContainer);
          expect(newRange?.startContainer.textContent).not.toBeUndefined();
          expect(newRange?.startContainer.textContent!.length).toBeGreaterThan(0);
          expect(newRange?.startOffset).toBe(12);
      });
   
  });