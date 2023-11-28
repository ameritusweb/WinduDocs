import { mockQuoteBlockData } from '../../__mocks__/editor-mocks'
import { cleanup, render, screen } from '../../utils/test-utils'
import { AstContext } from './interface';
import QuoteBlock from './quote-block'

afterEach(() => {
    cleanup();
  });
  
describe('QuoteBlock', async () => {
  it('should render the QuoteBlock', () => {
    render(
    <QuoteBlock 
        id={'B123456-123456-123456-123456'} 
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        pathIndices={[]}  
        children={mockQuoteBlockData}     
      />,
    )
    const firstMatchingElements = screen.getAllByText((content) => content.includes('blockquote'));
    expect(firstMatchingElements.length).toBe(1);

    const secondMatchingElements = screen.getAllByText((content) => content.includes('can span'));
    expect(secondMatchingElements.length).toBe(1);
  })
})
