import { mockCodeBlockData } from '../../__mocks__/editor-mocks'
import { cleanup, render, screen } from '../../utils/test-utils'
import CodeBlock from './code-block'
import { AstContext } from './interface';

afterEach(() => {
    cleanup();
  });
  
describe('CodeBlock', async () => {
  it('should render the CodeBlock', () => {
    render(
    <CodeBlock 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]} 
        language={'javascript'} 
        children={mockCodeBlockData}    
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)} 
      />,
    )
    const matchingElements = screen.getAllByText((content) => content.startsWith('console.log'));
    expect(matchingElements.length).toBe(2);
  })
})
