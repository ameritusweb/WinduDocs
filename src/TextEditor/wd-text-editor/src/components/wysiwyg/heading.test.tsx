import { mockHeadingData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import Heading from './heading'

afterEach(() => {
    cleanup();
  });
  
describe('Heading', async () => {
  it('should render the Heading', () => {
    render(
      <Heading 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]} 
        level={'1'}
        version={'V0'} 
        children={mockHeadingData} 
        higherLevelChildren={[]}
        rootUpdater={() => {  }}        
      />,
    )
    const matchingElements = screen.getAllByText((content, nodes) => content.includes('Markdown'));
    expect(matchingElements.length).toBe(1);
  })

  it.each([
    ['1', 'H1'],
    ['2', 'H2'],
    ['3', 'H3'],
    ['4', 'H4'],
    ['5', 'H5'],
    ['6', 'H6'],
  ])('given a level of %s, should display with a %s tag', async (inputState: string, expectedOutput: string) => {
    const { container } = render(
        <Heading 
        id={'B123456-123456-123456-123456'} 
        pathIndices={[]} 
        level={inputState}
        version={'V0'} 
        children={mockHeadingData} 
        higherLevelChildren={[]}
        rootUpdater={() => {  }}        
      />,
    )
    
    const headingElement = container.querySelector('#B123456-123456-123456-123456');
    expect(headingElement).not.toBe(null);

    expect(headingElement!.tagName).toBe(expectedOutput)
  })
})