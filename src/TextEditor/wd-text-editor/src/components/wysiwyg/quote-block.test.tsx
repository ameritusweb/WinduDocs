import { mockQuoteBlockData } from '../../__mocks__/editor-mocks'
import { cleanup, render, screen, userEvent } from '../../utils/test-utils'
import QuoteBlock from './quote-block'

afterEach(() => {
    cleanup();
  });
  
describe('QuoteBlock', async () => {
  it('should render the QuoteBlock', () => {
    render(
    <QuoteBlock 
        id={'B123456-123456-123456-123456'} 
        pathIndices={[]}  
        children={mockQuoteBlockData}     
      />,
    )
    const firstMatchingElements = screen.getAllByText((content, nodes) => content.includes('blockquote'));
    expect(firstMatchingElements.length).toBe(1);

    const secondMatchingElements = screen.getAllByText((content, nodes) => content.includes('multiple lines'));
    expect(secondMatchingElements.length).toBe(1);
  })
})
