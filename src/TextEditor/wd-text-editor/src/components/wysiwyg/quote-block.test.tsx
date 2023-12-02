import { mockQuoteBlockData } from '../../__mocks__/editor-mocks'
import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import { AstContext } from './interface';
import QuoteBlock from './quote-block'

afterEach(() => {
    cleanup();
  });
  
describe('QuoteBlock', async () => {
  it('should render the QuoteBlock', async () => {
    const { container } = render(
    <QuoteBlock 
        id={'B123456-123456-123456-123456'} 
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        pathIndices={[]}  
        children={mockQuoteBlockData}     
      />,
    );

    const quote = container.querySelector('#B123456-123456-123456-123456');
    expect(quote).not.toBe(null);

    await act(async () => {
      expect(quote).toBeTruthy();
      if (quote) 
        await userEvent.click(quote);
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
      if (quote) 
        await fireEvent.blur(quote);
    });

    const firstMatchingElements = screen.getAllByText((content) => content.includes('blockquote'));
    expect(firstMatchingElements.length).toBe(1);

    const secondMatchingElements = screen.getAllByText((content) => content.includes('can span'));
    expect(secondMatchingElements.length).toBe(1);
  })
})
