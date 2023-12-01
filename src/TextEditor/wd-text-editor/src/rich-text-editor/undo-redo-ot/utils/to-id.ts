import { AstNode } from "../../../components/wysiwyg/interface";

const toId = (node: AstNode | null) => {

    if (!node)
        return null;
    if (node.NodeName === 'ParagraphBlock')
    {
        return `para_${node.Guid}`;
    }

    return node.Guid;

}

export default toId;