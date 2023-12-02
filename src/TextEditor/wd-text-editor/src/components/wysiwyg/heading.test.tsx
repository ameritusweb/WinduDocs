import { mockHeadingData } from '../../__mocks__/editor-mocks';
import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import Heading from './heading'
import { AstContext } from './interface';

afterEach(() => {
    cleanup();
  });
  
describe('Heading', async () => {
  it('should render the Heading', async () => {
    const { container } = render(
      <Heading 
        id={'H123456-123456-123456-123456'} 
        pathIndices={[]} 
        level={'1'}
        version={'V0'} 
        children={mockHeadingData}
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)} 
        higherLevelChildren={[]}
        rootUpdater={() => {  }}        
      />,
    )
    const matchingElements = screen.getAllByText((content) => content.includes('Markdown'));
    expect(matchingElements.length).toBe(1);

    const heading = container.querySelector('#H123456-123456-123456-123456');
    expect(heading).not.toBe(null);

    await act(async () => {
      expect(heading).toBeTruthy();
      if (heading) 
        await userEvent.click(heading);
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
      if (heading) 
        await fireEvent.blur(heading);
    });
  })

  it.each([
    ['1', 'H1'],
    ['2', 'H2'],
    ['3', 'H3'],
    ['4', 'H4'],
    ['5', 'H5'],
    ['6', 'H6'],
    ['', 'P'],
  ])('given a level of %s, should display with a %s tag', async (inputState: string, expectedOutput: string) => {
    const { container } = render(
        <Heading 
        id={'B123456-123456-123456-123456'} 
        pathIndices={[]} 
        level={inputState}
        version={'V0'} 
        children={mockHeadingData} 
        higherLevelChildren={[]}
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        rootUpdater={() => {  }}        
      />,
    )
    
    const headingElement = container.querySelector('#B123456-123456-123456-123456');
    expect(headingElement).not.toBe(null);

    expect(headingElement!.tagName).toBe(expectedOutput)
  })
})