import { generateKey } from ".";
import { AstNode } from "../../../components/wysiwyg/interface";

const createNewAstNode = (name: string, index: number, depth: number, text: string | null, children?: AstNode[]): AstNode => {

    const astNode: AstNode = {
        NodeName: name,
        Guid: generateKey(),
        Attributes: {},
        ChildIndex: index,
        Depth: depth,
        Children: children || [],
        TextContent: text
    };

    return astNode;

}

export default createNewAstNode;