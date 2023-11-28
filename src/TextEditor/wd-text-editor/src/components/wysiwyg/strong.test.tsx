import { cleanup, render, screen } from '../../utils/test-utils'
import Strong from './strong'
import { mockStrongData } from '../../__mocks__/editor-mocks'
import { AstContext } from './interface';

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
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
      />,
    )
    const matchingElements = screen.getAllByText((content) => content.startsWith('bold and italic'));
    expect(matchingElements.length).toBe(1);
  })
})
