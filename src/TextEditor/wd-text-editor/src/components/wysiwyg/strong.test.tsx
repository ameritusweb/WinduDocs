import { cleanup, render, screen, userEvent } from '../../utils/test-utils'
import Strong from './strong'
import { mockStrongData } from '../../__mocks__/editor-mocks'

afterEach(() => {
    cleanup();
  });
  
describe('Strong', async () => {
  it('should render the Strong', () => {
    render(
    <Strong 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]}  
        children={mockStrongData}   
      />,
    )
    const matchingElements = screen.getAllByText((content, nodes) => content.startsWith('bold and italic'));
    expect(matchingElements.length).toBe(1);
  })
})
