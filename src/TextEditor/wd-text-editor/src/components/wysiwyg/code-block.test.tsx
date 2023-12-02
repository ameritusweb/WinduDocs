import { mockCodeBlockData } from '../../__mocks__/editor-mocks'
import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import CodeBlock from './code-block'
import { AstContext } from './interface';

afterEach(() => {
    cleanup();
  });
  
describe('CodeBlock', async () => {
  it('should render the CodeBlock', async () => {
    const { container } = render(
    <CodeBlock 
        id={'C123456-123456-123456-123456'} 
        pathIndices={[]} 
        language={'javascript'} 
        children={mockCodeBlockData}    
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)} 
      />,
    )

    const code = container.querySelector('#C123456-123456-123456-123456');
    expect(code).not.toBe(null);

    await act(async () => {
      expect(code).toBeTruthy();
      if (code) 
        await userEvent.click(code);
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
      if (code) 
        await fireEvent.blur(code);
    });

    const matchingElements = screen.getAllByText((content) => content.startsWith('console.log'));
    expect(matchingElements.length).toBe(2);
  })
})
