import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
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
        url={testUrl}
        children={[]}
      />,
    )
    const linkElement = container.querySelector('#B123456-123456-123456-123456');
    expect(linkElement).not.toBe(null);

    expect(linkElement?.getAttribute('href')).toBe(testUrl)
  })
})