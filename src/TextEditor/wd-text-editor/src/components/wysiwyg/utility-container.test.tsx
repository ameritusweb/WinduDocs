import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import UtilityContainer from './utility-container'

afterEach(() => {
    cleanup();
  });
  
describe('UtilityContainer', async () => {
  it('should be at full opacity if show is true', () => {
    const { container } = render(
        <UtilityContainer 
            show={true} 
            onCopy={() => {}} 
            onCut={() => {}} 
            onDelete={() => {}} 
            onPaste={() => {}} 
        />,
    )
    const utilityContainer = container.querySelector('.utility-container');
    expect(utilityContainer).not.toBe(null);

    expect(utilityContainer!).toHaveClass('opacity-100');
  })

  it('should be at zero opacity if show is false', () => {
    const { container } = render(
        <UtilityContainer 
            show={false} 
            onCopy={() => {}} 
            onCut={() => {}} 
            onDelete={() => {}} 
            onPaste={() => {}} 
        />,
    )
    const utilityContainer = container.querySelector('.utility-container');
    expect(utilityContainer).not.toBe(null);

    expect(utilityContainer!).toHaveClass('opacity-0');
  })
})