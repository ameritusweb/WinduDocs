import { mockAstData } from "../../__mocks__/editor-mocks";
import RichTextEditor from "./rich-text-editor";
import { act, cleanup, fireEvent, render, screen, userEvent, waitFor } from '../../utils/test-utils'
import { vi } from "vitest";
import DomDiff from "../../utils/dom-diff";
import { HistoryManager } from "../../rich-text-editor/undo-redo-ot";

const mockUndoRedo = () => {

    const historyManager = HistoryManager;
    let undoMock = vi.spyOn(historyManager, 'undo');
    let redoMock = vi.spyOn(historyManager, 'redo');

    return [ undoMock, redoMock ];

};

const mockHandlers = await vi.hoisted(async () => {
    const actualHandlers = await vi.importActual("../../rich-text-editor/handlers") as typeof import("../../rich-text-editor/handlers");
    let leftOrRightMock = vi.fn(actualHandlers.handleArrowKeyLeftOrRightPress);
    let upOrDownMock = vi.fn(actualHandlers.handleArrowKeyUpOrDownPress);

    vi.mock('../../rich-text-editor/handlers', async () => {
        
        return {
            ...actualHandlers,
            handleArrowKeyLeftOrRightPress: leftOrRightMock,
            handleArrowKeyUpOrDownPress: upOrDownMock
        };
    });

    return [leftOrRightMock, upOrDownMock];
});

const mockRichTextEditor = await vi.hoisted(async () => {
    const actualRichTextEditor = await vi.importActual("../../hooks/use-rich-text-editor") as typeof import("../../hooks/use-rich-text-editor");
    let myMock = vi.fn(actualRichTextEditor.useRichTextEditor().restoreCursorPosition);

    vi.mock('../../hooks/use-rich-text-editor', async () => {
        
        return {
            ...actualRichTextEditor,
            useRichTextEditor: () => ({
            ...actualRichTextEditor.useRichTextEditor(),
            restoreCursorPosition: myMock
            }),
        };
    });

    return [myMock];
});

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

describe('RichTextEditor', async () => {
    it('sets up and uses a mutation observer', () => {
        const ast = mockAstData;
        const observe = vi.fn();
        const disconnect = vi.fn();
        const takeRecords = vi.fn();
      
        global.MutationObserver = class {
          constructor(callback: MutationCallback) {}
          observe = observe;
          disconnect = disconnect;
          takeRecords = takeRecords;
        } as unknown as typeof MutationObserver;
      
        const { unmount } = render(<RichTextEditor ast={ast} />);
      
        
        expect(observe).toHaveBeenCalled();
      
        
        unmount();
      
        
        expect(disconnect).toHaveBeenCalled();
      });      

      it('makes appropriate DOM changes on AST update', async () => {
        const ast = mockAstData;
        const domDiff = DomDiff;
        const [ restoreCursorPositionMock ] = await mockRichTextEditor;
        const { container, getByTestId } = render(<RichTextEditor ast={ast} />);
      
        
        const editorElement = container.querySelector('#richTextEditor');

        expect(editorElement).not.toBe(null);

        const editorHtml = editorElement!.cloneNode(true);
      
        const paragraphElement = container.querySelector('#para_933e7e88-4f0e-450d-bb98-e1e0923775ff');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });

        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            
            fireEvent.keyDown(paragraphElement!, { key: 'a', code: 'a' });
        });

        const mutations = domDiff.compareTrees(editorHtml, editorElement!);
        
        expect(mutations.filter(f => f.type === 'characterData').length).toBe(1);
        
      });

      it('when pressing the left arrow key calls handleArrowKeyLeftOrRightPress one time', async () => {
        const ast = mockAstData;
        const [ leftOrRightMock ] = await mockHandlers;
        const { container, getByTestId } = render(<RichTextEditor ast={ast} />);
      
        
        const editorElement = container.querySelector('#richTextEditor');

        expect(editorElement).not.toBe(null);
      
        const paragraphElement = container.querySelector('#para_933e7e88-4f0e-450d-bb98-e1e0923775ff');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });

        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            
            fireEvent.keyDown(paragraphElement!, { key: 'ArrowLeft', code: 'ArrowLeft' });
        });

        expect(leftOrRightMock).toHaveBeenCalledTimes(1);
        
      });

      it('when pressing the right arrow key calls handleArrowKeyLeftOrRightPress one time', async () => {
        const ast = mockAstData;
        const [ leftOrRightMock ] = await mockHandlers;
        const { container, getByTestId } = render(<RichTextEditor ast={ast} />);
      
        
        const editorElement = container.querySelector('#richTextEditor');

        expect(editorElement).not.toBe(null);
      
        const paragraphElement = container.querySelector('#para_933e7e88-4f0e-450d-bb98-e1e0923775ff');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });

        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            
            fireEvent.keyDown(paragraphElement!, { key: 'ArrowRight', code: 'ArrowRight' });
        });

        expect(leftOrRightMock).toHaveBeenCalledTimes(1);
        
      });

      it('when pressing the up arrow key calls handleArrowKeyUpOrDownPress one time', async () => {
        const ast = mockAstData;
        const [ leftOrRightMock, upOrDownMock ] = await mockHandlers;
        const { container, getByTestId } = render(<RichTextEditor ast={ast} />);
      
        
        const editorElement = container.querySelector('#richTextEditor');

        expect(editorElement).not.toBe(null);
      
        const paragraphElement = container.querySelector('#para_933e7e88-4f0e-450d-bb98-e1e0923775ff');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });

        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            
            fireEvent.keyDown(paragraphElement!, { key: 'ArrowUp', code: 'ArrowUp' });
        });

        expect(upOrDownMock).toHaveBeenCalledTimes(1);
        
      });

      it('when pressing the down arrow key calls handleArrowKeyUpOrDownPress one time', async () => {
        const ast = mockAstData;
        const [ leftOrRightMock, upOrDownMock ] = await mockHandlers;
        const { container, getByTestId } = render(<RichTextEditor ast={ast} />);
      
        
        const editorElement = container.querySelector('#richTextEditor');

        expect(editorElement).not.toBe(null);
      
        const paragraphElement = container.querySelector('#para_933e7e88-4f0e-450d-bb98-e1e0923775ff');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });

        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            
            fireEvent.keyDown(paragraphElement!, { key: 'ArrowDown', code: 'ArrowDown' });
        });

        expect(upOrDownMock).toHaveBeenCalledTimes(1);
        
      });

      it('when pressing ctrl+Z key calls undo one time', async () => {
        const ast = mockAstData;
        const [ undoMock ] = mockUndoRedo();
        const { container, getByTestId } = render(<RichTextEditor ast={ast} />);
      
        
        const editorElement = container.querySelector('#richTextEditor');

        expect(editorElement).not.toBe(null);
      
        const paragraphElement = container.querySelector('#para_933e7e88-4f0e-450d-bb98-e1e0923775ff');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });

        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            
            fireEvent.keyDown(paragraphElement!, { key: 'z', ctrlKey: true });
        });

        expect(undoMock).toHaveBeenCalledTimes(1);
        
      });

      it('when pressing ctrl+Y key calls redo one time', async () => {
        const ast = mockAstData;
        const [ redoMock ] = mockUndoRedo();
        const { container, getByTestId } = render(<RichTextEditor ast={ast} />);
      
        
        const editorElement = container.querySelector('#richTextEditor');

        expect(editorElement).not.toBe(null);
      
        const paragraphElement = container.querySelector('#para_933e7e88-4f0e-450d-bb98-e1e0923775ff');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });

        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            
            fireEvent.keyDown(paragraphElement!, { key: 'z', ctrlKey: true });
        });

        expect(redoMock).toHaveBeenCalledTimes(1);
        
      });
})