import { mockListItemData } from '../../__mocks__/editor-mocks';
import { cleanup, render, screen, toMockAst } from '../../utils/test-utils'
import { AstContext } from './interface';
import ListItem from './list-item';

afterEach(() => {
    cleanup();
  });
  
describe('ListItem', async () => {
  it('should render the ListItem', async () => {
    const { container } = render(
    <ListItem 
        id={'B123456-123456-123456-123456'} 
        context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        pathIndices={[]}  
        children={mockListItemData}     
        higherLevelChildren={[]}
        higherLevelChild={toMockAst({})}
        higherLevelIndex={0}
      />,
    );

    const listItem = container.querySelector('#B123456-123456-123456-123456');
    expect(listItem).not.toBe(null);

    const firstMatchingElements = screen.getAllByText((content) => content.includes('First level'));
    expect(firstMatchingElements.length).toBe(2);

    const secondMatchingElements = screen.getAllByText((content) => content.includes('Another first level'));
    expect(secondMatchingElements.length).toBe(1);
  })
})
