import { AstNode } from "../../components/wysiwyg/interface";

const isNodeEmpty = (node: AstNode) => {

    return !node.TextContent && node.Children.length === 0;

}

export default isNodeEmpty;