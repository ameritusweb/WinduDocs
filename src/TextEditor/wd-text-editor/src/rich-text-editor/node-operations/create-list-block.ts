import { createListItem, createNewAstNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const createListBlock = (numberOfItems: number, isOrdered: boolean): AstNode => {
    const listItems = Array.from({ length: numberOfItems }, (_, index) =>
        createListItem(index, 3, `First Level Item ${index + 1}`)
    );
    const listBlock = createNewAstNode('ListBlock', 20, 1, null, listItems);
    if (isOrdered)
    {
        listBlock.Attributes.IsOrdered = 'True';
    }
    return listBlock;
}

export default createListBlock;

