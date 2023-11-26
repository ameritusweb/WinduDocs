import { mockListData } from '../../__mocks__/editor-mocks';
import { act, cleanup, render, screen, userEvent } from '../../utils/test-utils'
import { AstNode } from './interface';
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
        />,
    )

    const list = container.querySelector('#B123456-123456-123456-123456');
    expect(list).not.toBe(null);

    const firstMatchingElements = screen.getAllByText((content, nodes) => content.includes('First level'));
    expect(firstMatchingElements.length).toBe(2);

    const secondMatchingElements = screen.getAllByText((content, nodes) => content.includes('Second level'));
    expect(secondMatchingElements.length).toBe(1);
  })
})