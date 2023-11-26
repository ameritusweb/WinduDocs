import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import HorizontalRule from './horizontal-rule'

afterEach(() => {
    cleanup();
  });
  
describe('HorizontalRule', async () => {
  it('should render the Horizontal Rule', () => {
    const { container } = render(
      <HorizontalRule 
        id={'B123456-123456-123456-123456'}         
      />,
    )
    const hrElement = container.querySelector('#B123456-123456-123456-123456');
    expect(hrElement).not.toBe(null);

    expect(hrElement!.tagName).toBe('HR')
  })
})