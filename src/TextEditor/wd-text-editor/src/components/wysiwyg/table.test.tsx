import { mockTableData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { AstContext, AstNode } from './interface';
import Table from './table'

afterEach(() => {
    cleanup();
  });
  
describe('Table', async () => {
  it('should be visible', () => {
    const { container } = render(
        <Table  
            id={"B123456-123456-123456-123456"} 
            pathIndices={[]}
            children={mockTableData}
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        />,
    )

    const list = container.querySelector('#B123456-123456-123456-123456');
    expect(list).not.toBe(null);

    const matchingTrElements = list!.querySelectorAll('tr');
    expect(matchingTrElements.length).toBe(3);

    const matchingTdElements = list!.querySelectorAll('td');
    expect(matchingTdElements.length).toBe(4);

    const firstMatchingElements = screen.getAllByText((content, nodes) => content.includes('Header'));
    expect(firstMatchingElements.length).toBe(2);

    const secondMatchingElements = screen.getAllByText((content, nodes) => content.includes('Data'));
    expect(secondMatchingElements.length).toBe(2);

    const thirdMatchingElements = screen.getAllByText((content, nodes) => content.includes('Row'));
    expect(thirdMatchingElements.length).toBe(2);
  })
})