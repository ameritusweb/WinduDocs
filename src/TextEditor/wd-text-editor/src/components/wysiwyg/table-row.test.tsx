import { mockTableRowData } from '../../__mocks__/editor-mocks';
import { cleanup, render, screen } from '../../utils/test-utils'
import { AstContext } from './interface';
import TableRow from './table-row'

afterEach(() => {
    cleanup();
  });
  
describe('TableRow', async () => {
  it('should be visible', () => {
    render(
        <table>
            <tbody>
                    <TableRow  
                        pathIndices={[]}
                        children={mockTableRowData} 
                        isHeader={false} 
                        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}       
                     />
            </tbody>
        </table>,
    )

    const matchingElements = screen.getAllByText((content) => content.includes('Header'));
    expect(matchingElements.length).toBe(2);
  })
})