import { vi } from 'vitest';
import { mockBlankLineData } from '../../__mocks__/editor-mocks';
import EditorData, { EditorDataType } from '../../hooks/editor-data'
import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import BlankLine from './blank-line'
import { AstNode } from './interface'
import { deepCopyAstNode } from '../../rich-text-editor/node-operations';

afterEach(() => {
    cleanup();
  });
  
beforeEach(() => {
    const editorData: EditorDataType = EditorData;
    editorData.editorState = 'unselected';
})

describe('BlankLine', async () => {

  const getMockData = () => {
    return mockBlankLineData.map(c => deepCopyAstNode(c));
  }

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

  it('should call a function to insert a table', async () => {

    const mockUpdater = vi.fn();

    render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;
    await act (() => {
      editorData.emitEvent('InsertTable', 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739', { rows: 2, cols: 2 });
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
    expect(mockUpdater.mock.lastCall[0].length).toBe(1);
    expect(mockUpdater.mock.lastCall[0][0]).to
    expect(mockUpdater.mock.lastCall[0][0].NodeName).toBe('Table');
  })

  it('should handle a table insertion event', async () => {

    const mockUpdater = vi.fn();

    const { container } = render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={'unselected'} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;

    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });

    await act (() => {
      editorData.emitEvent('InsertTable', 'broadcast', { rows: 2, cols: 2 });
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
  })

  it('should handle a table insertion event called twice with null payload', async () => {

    const mockUpdater = vi.fn();

    const { container } = render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={'unselected'} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;

    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });

    await act (() => {
      editorData.emitEvent('InsertTable', 'broadcast', null);
    });

    const selection = window.getSelection();
    if (selection) {
      const range: Range = new Range();
      range.setStart(blankLineElement!, 0);
      range.setEnd(blankLineElement!, 0);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    await act (() => {
      editorData.emitEvent('InsertTable', 'broadcast', null);
    });

    expect(mockUpdater).toHaveBeenCalledTimes(0);
  })

  it('should handle a table insertion event called twice', async () => {

    const mockUpdater = vi.fn();

    const { container } = render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={'unselected'} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;

    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });

    await act (() => {
      editorData.emitEvent('InsertTable', 'broadcast', { rows: 2, cols: 2 });
    });

    const selection = window.getSelection();
    if (selection) {
      const range: Range = new Range();
      range.setStart(blankLineElement!, 0);
      range.setEnd(blankLineElement!, 0);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    await act (() => {
      editorData.emitEvent('InsertTable', 'broadcast', { rows: 2, cols: 2 });
    });

    expect(mockUpdater).toHaveBeenCalledTimes(2);
  })

  it('should call a function to insert a success alert', async () => {

    const mockUpdater = vi.fn();

    render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;
    await act (() => {
      editorData.emitEvent('InsertSuccessAlert', 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739', null);
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
    expect(mockUpdater.mock.lastCall[0].length).toBe(1);
    expect(mockUpdater.mock.lastCall[0][0]).to
    expect(mockUpdater.mock.lastCall[0][0].NodeName).toBe('FencedCodeBlock');
  })

  it('should call a function to insert a bulleted list', async () => {

    const mockUpdater = vi.fn();

    render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;
    await act (() => {
      editorData.emitEvent('InsertBulleted', 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739', null);
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
    expect(mockUpdater.mock.lastCall[0].length).toBe(1);
    expect(mockUpdater.mock.lastCall[0][0]).to
    expect(mockUpdater.mock.lastCall[0][0].NodeName).toBe('ListBlock');
  })

  it('should call a function to insert a numbered list', async () => {

    const mockUpdater = vi.fn();

    render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;
    await act (() => {
      editorData.emitEvent('InsertNumbered', 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739', null);
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
    expect(mockUpdater.mock.lastCall[0].length).toBe(1);
    expect(mockUpdater.mock.lastCall[0][0]).to
    expect(mockUpdater.mock.lastCall[0][0].NodeName).toBe('ListBlock');
  })

  it('should call a function to insert a code block', async () => {

    const mockUpdater = vi.fn();

    render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;
    await act (() => {
      editorData.emitEvent('InsertFenced', 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739', null);
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
    expect(mockUpdater.mock.lastCall[0].length).toBe(1);
    expect(mockUpdater.mock.lastCall[0][0]).to
    expect(mockUpdater.mock.lastCall[0][0].NodeName).toBe('FencedCodeBlock');
  })

  it('should call a function to insert a quote block', async () => {

    const mockUpdater = vi.fn();

    render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;
    await act (() => {
      editorData.emitEvent('InsertQuote', 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739', null);
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
    expect(mockUpdater.mock.lastCall[0].length).toBe(1);
    expect(mockUpdater.mock.lastCall[0][0]).to
    expect(mockUpdater.mock.lastCall[0][0].NodeName).toBe('QuoteBlock');
  })

  it('should call a function to insert a horizontal rule', async () => {

    const mockUpdater = vi.fn();

    render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    const editorData: EditorDataType = EditorData;
    await act (() => {
      editorData.emitEvent('InsertHR', 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739', null);
    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
    expect(mockUpdater.mock.lastCall[0].length).toBe(1);
    expect(mockUpdater.mock.lastCall[0][0]).to
    expect(mockUpdater.mock.lastCall[0][0].NodeName).toBe('ThematicBreakBlock');
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

  it('given a null format and an h1 editor state and is focused, should handle special keys', async () => {
    const editorData: EditorDataType = EditorData;
    editorData.editorState = 'h1';
    const mockUpdater = vi.fn();
    const { container } = render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    
    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });

    expect(container.firstElementChild?.tagName).toBe('H1')

    await act(async () => {
      await userEvent.click(container.firstElementChild!);

      await fireEvent.keyDown(container.firstElementChild!, { key: 'z', ctrlKey: true });

      await fireEvent.keyDown(container.firstElementChild!, { key: 'Control' });

      await fireEvent.keyDown(container.firstElementChild!, { key: 'ArrowUp' });

    });

    expect(mockUpdater).toHaveBeenCalledTimes(0);
  })

  it('given a null format and an h1 editor state and is focused, should handle an enter press', async () => {
    const editorData: EditorDataType = EditorData;
    editorData.editorState = 'h1';
    const mockUpdater = vi.fn();
    const { container } = render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    
    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });

    expect(container.firstElementChild?.tagName).toBe('H1')

    await act(async () => {
      await userEvent.click(container.firstElementChild!);

      await fireEvent.keyDown(container.firstElementChild!, { key: 'Enter' });

    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
  })

  it('given a null format and an h1 editor state and is focused, should handle a backspace press', async () => {
    const editorData: EditorDataType = EditorData;
    editorData.editorState = 'h1';
    const mockUpdater = vi.fn();
    const { container } = render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    
    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });

    expect(container.firstElementChild?.tagName).toBe('H1')

    await act(async () => {
      await userEvent.click(container.firstElementChild!);

      await fireEvent.keyDown(container.firstElementChild!, { key: 'a' });

      await fireEvent.keyDown(container.firstElementChild!, { key: 'Backspace' });

    });

    expect(mockUpdater).toHaveBeenCalledTimes(2);
  })

  it('given a null format and an h1 editor state and is focused, should handle a keypress', async () => {
    const editorData: EditorDataType = EditorData;
    editorData.editorState = 'h1';
    const mockUpdater = vi.fn();
    const { container } = render(
      <BlankLine 
        id={'e6b4cd51-3bf0-4eb9-94cf-7d56565de739'} 
        format={null} 
        self={{ Guid: 'e6b4cd51-3bf0-4eb9-94cf-7d56565de739' } as AstNode} 
        higherLevelContent={{ content: getMockData(), updater: mockUpdater }}        
      />,
    )

    
    const blankLineElement = container.firstElementChild;
    expect(blankLineElement).not.toBe(null);

    await act(async () => {
        await userEvent.click(blankLineElement!);
    });

    expect(container.firstElementChild?.tagName).toBe('H1')

    await act(async () => {
      await userEvent.click(container.firstElementChild!);

      await userEvent.type(container.firstElementChild!, 'm');

    });

    expect(mockUpdater).toHaveBeenCalledTimes(1);
  })
})
