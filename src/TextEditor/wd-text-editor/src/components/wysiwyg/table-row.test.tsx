import { mockTableRowData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import TableRow from './table-row'

afterEach(() => {
    cleanup();
  });
  
describe('TableRow', async () => {
  it('should be visible', () => {
    const { container } = render(
        <table>
            <tbody>
                    <TableRow  
                        pathIndices={[]}
                        children={mockTableRowData} 
                        isHeader={false}        
                     />
            </tbody>
        </table>,
    )

    const matchingElements = screen.getAllByText((content, nodes) => content.includes('Header'));
    expect(matchingElements.length).toBe(2);
  })
})