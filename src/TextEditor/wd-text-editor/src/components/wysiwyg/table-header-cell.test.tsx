import { mockTableCellData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import TableHeaderCell from './table-header-cell'

afterEach(() => {
    cleanup();
  });
  
describe('TableHeaderCell', async () => {
  it('should be visible', () => {
    const { container } = render(
        <table>
            <tbody>
                <tr>
                    <TableHeaderCell  
                        pathIndices={[]}
                        children={mockTableCellData}
                    />
                </tr>
            </tbody>
        </table>,
    )

    const matchingElements = screen.getAllByText((content, nodes) => content.includes('Header'));
    expect(matchingElements.length).toBe(1);
  })
})