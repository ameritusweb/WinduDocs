import { createNewAstNode } from ".";
import { AstNode } from "../../components/wysiwyg/interface";

const createTableCell = (childIndex: number, depth: number, content: string): AstNode => {
    const textNode = createNewAstNode('Text', 0, depth + 2, content, []);
    const paragraphBlock = createNewAstNode('ParagraphBlock', 0, depth + 1, null, [textNode]);
    return createNewAstNode('TableCell', childIndex, depth, null, [paragraphBlock]);
}

export default createTableCell;
