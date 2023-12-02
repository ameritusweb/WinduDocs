import { mockListData } from '../../__mocks__/editor-mocks';
import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import { AstContext, AstNode } from './interface';
import UnorderedList from './unordered-list';

afterEach(() => {
    cleanup();
  });
  
describe('UnorderedList', async () => {
  it('should render a lower level unordered list', async () => {
    const { container } = render(
        <UnorderedList 
            isTopLevel={false} 
            id={"B123456-123456-123456-123456"} 
            pathIndices={[]}
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
            children={mockListData}
            higherLevelChild={{} as AstNode}
        />,
    )

    const list = container.querySelector('#B123456-123456-123456-123456');
    expect(list).not.toBe(null);

    await act(async () => {
      expect(list).toBeTruthy();
      if (list) 
        await userEvent.click(list);
    });

    const firstMatchingElements = screen.getAllByText((content) => content.includes('First level'));
    expect(firstMatchingElements.length).toBe(2);

    const secondMatchingElements = screen.getAllByText((content) => content.includes('Second level'));
    expect(secondMatchingElements.length).toBe(1);
  })

  it('should render a top level ordered list', async () => {
    const { container } = render(
        <UnorderedList 
            isTopLevel={true} 
            id={"B123456-123456-123456-123456"} 
            pathIndices={[]}
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
            children={mockListData}
            higherLevelChild={{} as AstNode}
        />,
    )

    const list = container.querySelector('#B123456-123456-123456-123456');
    expect(list).not.toBe(null);

    await act(async () => {
      expect(list).toBeTruthy();
      if (list) 
        await userEvent.click(list);
    });

    const utilityContainer = container.querySelector('.utility-container');
    expect(utilityContainer).toBeTruthy();

    await act(async () => {
        const del = await screen.findByTitle('Delete');
        expect(del).toBeTruthy();
        await userEvent.click(del);
    });

    await act(async () => {
      const cut = await screen.findByTitle('Cut');
      expect(cut).toBeTruthy();
      await userEvent.click(cut);
    });

    await act(async () => {
      const copy = await screen.findByTitle('Copy');
      expect(copy).toBeTruthy();
      await userEvent.click(copy);
    });

    await act(async () => {
      const paste = await screen.findByTitle('Paste');
      expect(paste).toBeTruthy();
      await userEvent.click(paste);
    });

    await act(async () => {
      if (list) 
        await fireEvent.blur(list);
    });

    const firstMatchingElements = screen.getAllByText((content) => content.includes('First level'));
    expect(firstMatchingElements.length).toBe(2);

    const secondMatchingElements = screen.getAllByText((content) => content.includes('Second level'));
    expect(secondMatchingElements.length).toBe(1);
  })
})