import { mockCodeBlockData } from '../../__mocks__/editor-mocks'
import { cleanup, render, screen, userEvent } from '../../utils/test-utils'
import CodeBlock from './code-block'

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
      />,
    )
    const matchingElements = screen.getAllByText((content, nodes) => content.startsWith('console.log'));
    expect(matchingElements.length).toBe(2);
  })
})
