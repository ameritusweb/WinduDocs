import { AstNode } from "../../../components/wysiwyg/interface";

const replaceText = (container: Node, child: AstNode, start: number, key: string) => {

    if (container.textContent)
        child.TextContent = container.textContent.substring(0, start) + key + container.textContent.substring(start);
    else
        child.TextContent = container.textContent + key;

}

export default replaceText;