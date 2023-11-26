import { cleanup, render, screen, userEvent } from '../../utils/test-utils'
import AlertBlock from './alert-block'

afterEach(() => {
    cleanup();
  });
  
describe('AlertBlock', async () => {
  it('should render the AlertBlock success icon', () => {
    render(
      <AlertBlock 
        id={'123456-123456-123456-123456'} 
        pathIndices={[]} 
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
      />,
    )
    const svgElement = screen.getByTestId('error-icon');
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toBeVisible()
  })
})
