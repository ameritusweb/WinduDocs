import { AstNode } from "../../components/wysiwyg/interface";

const removeText = (container: Node, child: AstNode, start: number, end: number) => {
    const diff = end - start;
    if (container.textContent) {
        const subStart = diff > 0 ? start : start - 1;
        const newText = container.textContent.substring(0, subStart) + container.textContent.substring(start + diff);
        child.TextContent = newText;
    }
}

export default removeText;