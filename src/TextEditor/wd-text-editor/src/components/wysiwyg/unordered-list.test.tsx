import { mockListData } from '../../__mocks__/editor-mocks';
import { cleanup, render, screen } from '../../utils/test-utils'
import { AstContext, AstNode } from './interface';
import UnorderedList from './unordered-list'

afterEach(() => {
    cleanup();
  });
  
describe('UnorderedList', async () => {
  it('should be visible', () => {
    const { container } = render(
        <UnorderedList 
            isTopLevel={true} 
            id={"B123456-123456-123456-123456"} 
            pathIndices={[]}
            children={mockListData}
            higherLevelChild={{} as AstNode}
            context={(() => { const c = {  } as AstContext; c.types = []; return c; }).call(this)}
        />,
    )

    const list = container.querySelector('#B123456-123456-123456-123456');
    expect(list).not.toBe(null);

    const firstMatchingElements = screen.getAllByText((content) => content.includes('First level'));
    expect(firstMatchingElements.length).toBe(2);

    const secondMatchingElements = screen.getAllByText((content) => content.includes('Second level'));
    expect(secondMatchingElements.length).toBe(1);
  })
})