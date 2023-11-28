import { mockTableCellData } from '../../__mocks__/editor-mocks';
import { cleanup, render, screen } from '../../utils/test-utils'
import { AstContext } from './interface';
import TableCell from './table-cell'

afterEach(() => {
    cleanup();
  });
  
describe('TableCell', async () => {
  it('should be visible', () => {
    render(
        <table>
            <tbody>
                <tr>
                    <TableCell  
                        pathIndices={[]}
                        children={mockTableCellData}
                        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
                    />
                </tr>
            </tbody>
        </table>,
    )

    const matchingElements = screen.getAllByText((content) => content.includes('Header'));
    expect(matchingElements.length).toBe(1);
  })
})