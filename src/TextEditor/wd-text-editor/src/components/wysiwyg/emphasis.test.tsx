import { cleanup, render, screen } from '../../utils/test-utils'
import Emphasis from './emphasis'
import { mockEmphasisData } from '../../__mocks__/editor-mocks'
import { AstContext } from './interface';

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
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
      />,
    )
    const matchingElements = screen.getAllByText((content) => content.startsWith('bold and italic'));
    expect(matchingElements.length).toBe(1);
  })
})
