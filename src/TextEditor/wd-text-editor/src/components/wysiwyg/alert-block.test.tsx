import { mockCodeBlockData, mockHigherLevelCodeBlockData, mockInvalidData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import AlertBlock from './alert-block'
import { AstContext } from './interface';

afterEach(() => {
    cleanup();
  });
  
describe('AlertBlock', async () => {

    it('should handle invalid data', () => {
        render(
            <AlertBlock 
            id={'123456-123456-123456-123456'} 
            pathIndices={[]} 
            version={'V0'} 
            type={'type-alert-invalid'} 
            children={mockInvalidData} 
            higherLevelChildren={mockHigherLevelCodeBlockData}     
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}   
            />,
        )
        const svgElement = screen.queryByTestId('invalid-icon');
        expect(svgElement).toBeNull();
        const matches = screen.queryAllByText((content) => content.includes('console'));
        expect(matches.length).toBe(0);
    })

    it('should display utilities', async () => {
        render(
            <AlertBlock 
            id={'123456-123456-123456-123456'} 
            pathIndices={[]} 
            version={'V0'} 
            type={'type-alert-success'} 
            children={mockCodeBlockData} 
            higherLevelChildren={mockHigherLevelCodeBlockData}     
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}   
            />,
        )
        const matches = screen.getAllByText((content) => content.includes('console'));
        expect(matches.length).toBe(2);
        await act(async () => {
            await userEvent.click(matches[0]);
        });

        const deleteIcon = screen.getByTitle('Delete');
        expect(deleteIcon).not.toBeNull();

        await act(async () => {
            await userEvent.click(deleteIcon);
        });

        const cutIcon = screen.getByTitle('Cut');
        expect(cutIcon).not.toBeNull();

        await act(async () => {
            await userEvent.click(cutIcon);
        });

        const copyIcon = screen.getByTitle('Copy');
        expect(copyIcon).not.toBeNull();

        await act(async () => {
            await userEvent.click(copyIcon);
        });

        const pasteIcon = screen.getByTitle('Paste');
        expect(pasteIcon).not.toBeNull();

        await act(async () => {
            await userEvent.click(pasteIcon);
        });

    })

    it('should render multiple text blocks', () => {
        render(
            <AlertBlock 
            id={'123456-123456-123456-123456'} 
            pathIndices={[]} 
            version={'V0'} 
            type={'type-alert-success'} 
            children={mockCodeBlockData} 
            higherLevelChildren={mockHigherLevelCodeBlockData}  
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}      
            />,
        )
        const matches = screen.getAllByText((content) => content.includes('console'));
        expect(matches.length).toBe(2);
        expect(matches[0]).toBeInstanceOf(HTMLParagraphElement);
        expect(matches[1]).toBeInstanceOf(HTMLParagraphElement);
        expect(matches[0]).toBeVisible()
        expect(matches[1]).toBeVisible()
    })

  it('should render the AlertBlock success icon', () => {
    render(
      <AlertBlock 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]} 
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        version={'V0'} 
        type={'type-alert-success'} 
        children={[]} 
        higherLevelChildren={[]}        
      />,
    )
    const svgElement = screen.getByTestId('success-icon');
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toBeVisible()
  })

  it('should render the AlertBlock warning icon', () => {
    render(
      <AlertBlock 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]} 
        version={'V0'} 
        type={'type-alert-warning'} 
        children={[]} 
        higherLevelChildren={[]}        
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
      />,
    )
    const svgElement = screen.getByTestId('warning-icon');
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toBeVisible()
  })

  it('should render the AlertBlock info icon', () => {
    render(
      <AlertBlock 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]} 
        version={'V0'} 
        type={'type-alert-info'} 
        children={[]} 
        higherLevelChildren={[]}   
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}     
      />,
    )
    const svgElement = screen.getByTestId('info-icon');
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toBeVisible()
  })

  it('should render the AlertBlock error icon', () => {
    render(
      <AlertBlock 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]} 
        version={'V0'} 
        type={'type-alert-error'} 
        children={[]} 
        higherLevelChildren={[]}
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}        
      />,
    )
    const svgElement = screen.getByTestId('error-icon');
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toBeVisible()
  })
})
