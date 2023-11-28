import { cleanup, render, screen} from '../../utils/test-utils'
import CodeInline from './code-inline'
import { AstContext } from './interface';

afterEach(() => {
    cleanup();
  });
  
describe('CodeInline', async () => {
  it('should render the CodeInline', () => {
    render(
    <CodeInline 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]}  
        children='x = 2'
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
      />,
    )
    const matchingElements = screen.getAllByText((content) => content.startsWith('x'));
    expect(matchingElements.length).toBe(1);
  })
})
