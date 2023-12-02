import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import HorizontalRule from './horizontal-rule'

afterEach(() => {
    cleanup();
  });
  
describe('HorizontalRule', async () => {
  it('should render the Horizontal Rule', async () => {
    const { container } = render(
      <HorizontalRule 
        id={'B123456-123456-123456-123456'}         
      />,
    )
    const hrElement = container.querySelector('#B123456-123456-123456-123456');
    expect(hrElement).not.toBe(null);

    await act(async () => {
      expect(hrElement).toBeTruthy();
      if (hrElement) 
        await userEvent.click(hrElement);
    });

    const utilityContainer = container.querySelector('.utility-container');
    expect(utilityContainer).toBeTruthy();

    await act(async () => {
        const del = await screen.findByTitle('Delete');
        expect(del).toBeTruthy();
        await userEvent.click(del);
    });

    await act(async () => {
      const cut = await screen.findByTitle('Cut');
      expect(cut).toBeTruthy();
      await userEvent.click(cut);
    });

    await act(async () => {
      const copy = await screen.findByTitle('Copy');
      expect(copy).toBeTruthy();
      await userEvent.click(copy);
    });

    await act(async () => {
      const paste = await screen.findByTitle('Paste');
      expect(paste).toBeTruthy();
      await userEvent.click(paste);
    });

    await act(async () => {
      if (hrElement) 
        await fireEvent.blur(hrElement);
    });

    expect(hrElement!.tagName).toBe('HR')
  })
})