import { mockTableData } from '../../__mocks__/editor-mocks';
import { act, cleanup, fireEvent, render, screen, userEvent } from '../../utils/test-utils'
import { AstContext } from './interface';
import Table from './table'

afterEach(() => {
    cleanup();
  });
  
describe('Table', async () => {
  it('should be visible', async () => {
    const { container } = render(
        <Table  
            id={"T123456-123456-123456-123456"} 
            pathIndices={[]}
            children={mockTableData}
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        />,
    )

    const table = container.querySelector('#T123456-123456-123456-123456');
    expect(table).not.toBe(null);

    await act(async () => {
      expect(table).toBeTruthy();
      if (table) 
        await userEvent.click(table);
    });

    const tableUtilityContainer = container.querySelector('.table-utility-container');
    expect(tableUtilityContainer).toBeTruthy();

    await act(async () => {
      const addRow = await screen.findByTitle('Add Row');
      expect(addRow).toBeTruthy();
      await userEvent.click(addRow);
  });

  await act(async () => {
    const addColumn = await screen.findByTitle('Add Column');
    expect(addColumn).toBeTruthy();
    await userEvent.click(addColumn);
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
      if (table) 
        await fireEvent.blur(table);
    });

    const matchingTrElements = table!.querySelectorAll('tr');
    expect(matchingTrElements.length).toBe(3);

    const matchingTdElements = table!.querySelectorAll('td');
    expect(matchingTdElements.length).toBe(4);

    const firstMatchingElements = screen.getAllByText((content) => content.includes('Header'));
    expect(firstMatchingElements.length).toBe(2);

    const secondMatchingElements = screen.getAllByText((content) => content.includes('Data'));
    expect(secondMatchingElements.length).toBe(2);

    const thirdMatchingElements = screen.getAllByText((content) => content.includes('Row'));
    expect(thirdMatchingElements.length).toBe(2);
  })
})