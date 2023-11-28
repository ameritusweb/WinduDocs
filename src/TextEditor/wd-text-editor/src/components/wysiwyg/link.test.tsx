import { cleanup, render } from '../../utils/test-utils'
import { AstContext } from './interface';
import Link from './link'

afterEach(() => {
    cleanup();
  });
  
describe('Link', async () => {
  it('should render the Link', () => {

    const testUrl = 'https://test.com';

    const { container } = render(
      <Link 
        id={'B123456-123456-123456-123456'}
        pathIndices={[]}      
        version={'V0'}
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        url={testUrl}
        children={[]}
      />,
    )
    const linkElement = container.querySelector('#B123456-123456-123456-123456');
    expect(linkElement).not.toBe(null);

    expect(linkElement?.getAttribute('href')).toBe(testUrl)
  })
})