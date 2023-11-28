import { vi } from 'vitest';
import { act, cleanup, fireEvent, render, userEvent } from '../../utils/test-utils'
import Paragraph from './paragraph'
import { mockHigherLevelParagraphData, mockParagraphData } from '../../__mocks__/editor-mocks';
import EditorData from '../../hooks/editor-data';
import { AstContext } from './interface';

const mockHandlers = await vi.hoisted(async () => {
    const actualHandlers = await vi.importActual("../../rich-text-editor/handlers") as typeof import("../../rich-text-editor/handlers");
    const myMock = vi.fn(actualHandlers.handleCharacterInsertion);

    vi.mock('../../rich-text-editor/handlers', async () => {
        
        return {
            ...actualHandlers,
            handleCharacterInsertion: myMock
        };
    });

    return [myMock];
});

const mockRichTextEditor = await vi.hoisted(async () => {
    const actualRichTextEditor = await vi.importActual("../../hooks/use-rich-text-editor") as typeof import("../../hooks/use-rich-text-editor");
    const myMock = vi.fn(actualRichTextEditor.useRichTextEditor().updateAst);

    vi.mock('../../hooks/use-rich-text-editor', async () => {
        
        return {
            ...actualRichTextEditor,
            useRichTextEditor: () => ({
            ...actualRichTextEditor.useRichTextEditor(),
            updateAst: myMock
            }),
        };
    });

    return [myMock];
});

vi.mock('../../hooks/editor-data', async () => {
    const actual = await vi.importActual("../../hooks/editor-data") as typeof import("../../hooks/editor-data");
    return {
      __esModule: true,
      default: {
        ...actual.default,
        emitEvent: vi.fn()
      }
    };
  });

afterEach(() => {
    cleanup();
  });
  
describe('Paragraph', async () => {
    it('renders as a p tag and shows Paragraph', async () => {
        const { getByText } = render(
            <Paragraph<HTMLParagraphElement>
              id="#B123456-123456" 
              content={mockParagraphData} 
              context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
              pathIndices={[0]} 
              version="V1" 
              render={props => <p {...props}></p>} 
            />
          );
      
          expect(getByText('This is another paragraph.')).toBeInTheDocument();
      });

      it('renders as a span tag and shows Paragraph', async () => {
        const { getByText } = render(
            <Paragraph<HTMLParagraphElement>
              id="#B123456-123456" 
              content={mockParagraphData} 
              context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
              pathIndices={[0]} 
              version="V1" 
              render={props => <span {...props}></span>} 
            />
          );
      
          expect(getByText('This is another paragraph.')).toBeInTheDocument();
      });

      it('calls emit event', async () => {

        const [ updateAstMock ] = await mockRichTextEditor;

        const [ handleCharacterInsertionMock ] = await mockHandlers;

        const { container } = render(
            <div id={"richTextEditor"}>
                <Paragraph<HTMLParagraphElement>
                id="B123456-123456" 
                content={mockParagraphData} 
                context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
                pathIndices={[0]} 
                version="V1" 
                higherLevelContent={{ content: mockHigherLevelParagraphData, id: 'A123456-123456' }}
                render={props => <p {...props}></p>} 
                />
            </div>
          );

          const paragraphElement = container.querySelector('#para_B123456-123456');
          expect(paragraphElement).toBeInTheDocument();
          await act(async () => {
            await userEvent.click(paragraphElement!);
        });
      
        await act(async () => {
            fireEvent.mouseDown(paragraphElement!);

            // Simulate key press event, e.g., Enter key
            fireEvent.keyDown(paragraphElement!, { key: 'a', code: 'a' });
        });

        expect(updateAstMock).toHaveBeenCalledTimes(1);

        expect((updateAstMock.mock.lastCall || [])[0]!.type).toBe('keydown');

        expect((updateAstMock.mock.lastCall || [])[1]!.length).toBe(2);

        expect((updateAstMock.mock.lastCall || [])[2]!.length).toBe(2);

        expect((updateAstMock.mock.lastCall || [])[3]!.editorState).toBe('unselected');

        expect((updateAstMock.mock.lastCall || [])[4]!).toStrictEqual([ 0 ]);

        expect((updateAstMock.mock.lastCall || [])[5]!).toBe('A123456-123456');

        expect(handleCharacterInsertionMock).toHaveBeenCalledTimes(1);

        expect((handleCharacterInsertionMock.mock.lastCall || [])[0]!).not.toBe(null);

        expect((handleCharacterInsertionMock.mock.lastCall || [])[1]!).not.toBe(null);

        expect((handleCharacterInsertionMock.mock.lastCall || [])[1]!.nodeName).toBe('#text');

        expect((handleCharacterInsertionMock.mock.lastCall || [])[2]!.length).toBe(2);

        expect((handleCharacterInsertionMock.mock.lastCall || [])[3]!.length).toBe(2);

        expect((handleCharacterInsertionMock.mock.lastCall || [])[4]!.parent.nodeName).toBe('P');

        expect((handleCharacterInsertionMock.mock.lastCall || [])[4]!.child).not.toBe(null);

        expect((handleCharacterInsertionMock.mock.lastCall || [])[4]!.astParent).toBe(null);

        expect((handleCharacterInsertionMock.mock.lastCall || [])[5]!).toBe('a');

        expect((handleCharacterInsertionMock.mock.lastCall || [])[6]!).toBe('unselected');

        expect((handleCharacterInsertionMock.mock.lastCall || [])[7]!).toBe(26);

          const editorData = EditorData;
          expect(editorData.emitEvent).toHaveBeenCalled();
      });
})