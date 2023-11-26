import EditorData, { EditorDataType } from '../../hooks/editor-data'
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import BlankLine from './blank-line'
import { AstNode } from './interface'

afterEach(() => {
    cleanup();
  });
  
beforeEach(() => {
    const editorData: EditorDataType = EditorData;
    editorData.editorState = 'unselected';
})

describe('BlankLine', async () => {
  it('given a null format, should display with a P tag', () => {
    const { container } = render(
      <BlankLine 
        id={'123456-123456-123456-123456'} 
        format={null} 
        self={{} as AstNode} 
        higherLevelContent={{ content: [], updater: () => { } }}        
      />,
    )
    
    expect(container.firstElementChild?.tagName).toBe('P')
  })

  it.each([
    ['h1', 'H1'],
    ['h2', 'H2'],
    ['h3', 'H3'],
    ['h4', 'H4'],
    ['h5', 'H5'],
    ['h6', 'H6'],
  ])('given a null format and an %s editor state and is focused, should display with a %s tag', async (inputState: string, expectedOutput: string) => {
    const editorData: EditorDataType = EditorData;
    editorData.editorState = inputState;
    const { container } = render(
      <BlankLine 
        id={'123456-123456-123456-123456'} 
        format={null} 
        self={{} as AstNode} 
        higherLevelContent={{ content: [], updater: () => { } }}        
      />,
    )

    
    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });
    
    expect(container.firstElementChild?.tagName).toBe(expectedOutput)
  })
})
