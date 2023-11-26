import { cleanup, render, screen, userEvent } from '../../utils/test-utils'
import Emphasis from './emphasis'
import { mockEmphasisData } from '../../__mocks__/editor-mocks'

afterEach(() => {
    cleanup();
  });
  
describe('Emphasis', async () => {
  it('should render the Emphasis', () => {
    render(
    <Emphasis 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]}  
        children={mockEmphasisData}   
      />,
    )
    const matchingElements = screen.getAllByText((content, nodes) => content.startsWith('bold and italic'));
    expect(matchingElements.length).toBe(1);
  })
})
