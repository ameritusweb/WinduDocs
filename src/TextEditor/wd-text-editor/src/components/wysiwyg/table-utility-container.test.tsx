import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import TableUtilityContainer from './table-utility-container'

afterEach(() => {
    cleanup();
  });
  
describe('TableUtilityContainer', async () => {
  it('should be at full opacity if show is true', () => {
    const { container } = render(
        <TableUtilityContainer 
            show={true} 
            onAddRow={() => {}} 
            onAddColumn={() => {}}
        />,
    )
    const utilityContainer = container.querySelector('.table-utility-container');
    expect(utilityContainer).not.toBe(null);

    expect(utilityContainer!).toHaveClass('opacity-100');
  })

  it('should be at zero opacity if show is false', () => {
    const { container } = render(
        <TableUtilityContainer 
            show={false} 
            onAddRow={() => {}} 
            onAddColumn={() => {}} 
        />,
    )
    const utilityContainer = container.querySelector('.table-utility-container');
    expect(utilityContainer).not.toBe(null);

    expect(utilityContainer!).toHaveClass('opacity-0');
  })
})