import { AstNode } from "../../components/wysiwyg/interface";
import { findNodeByGuid } from "../node-operations";
import { replaceText } from "../text-manipulation";

// Handle character insertion
const handleCharacterInsertion = (container: Node, children: AstNode[], key: string, startOffset: number) => {
    if (container.nodeName === '#text')
    {
        const parent = container.parentElement;
        if (parent) {
            const parentId = parent.id;
            let child = findNodeByGuid(children, parentId);
            if (child) {
                if (child.Children.length) {
                    const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                    child = child.Children[index];
                }
                replaceText(container, child, startOffset, key);
                return { type: 'insert', nodes: children.map((c) => {
                    return Object.assign({}, c)
                }) };
            } else {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                child = children[index];
                if (child) {
                    replaceText(container, child, startOffset, key);
                    return { type: 'insert', nodes: children.map((c, ind) => {
                        return ind === index ? Object.assign({}, c) : c
                    }) };
                }
            }
        }
    }
};

export default handleCharacterInsertion;