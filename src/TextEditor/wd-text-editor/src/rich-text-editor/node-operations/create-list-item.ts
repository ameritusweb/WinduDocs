import { createNewAstNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const createListItem = (childIndex: number, depth: number, content: string): AstNode => {
    const textNode = createNewAstNode('Text', 0, depth + 1, content);
    const paragraphBlock = createNewAstNode('ParagraphBlock', 0, depth, null, [textNode]);
    return createNewAstNode('ListItemBlock', childIndex, depth - 1, null, [paragraphBlock]);
}

export default createListItem;