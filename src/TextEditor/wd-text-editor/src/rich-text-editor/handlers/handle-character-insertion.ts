import { AstNode, AstUpdate, IHistoryManager } from "../../components/wysiwyg/interface";
import { findNodeByGuid } from "../node-operations";
import { replaceText } from "../text-manipulation";

// Handle character insertion
const handleCharacterInsertion = (historyManager: IHistoryManager, container: Node, children: AstNode[], key: string, startOffset: number): AstUpdate | null => {
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
                const oldText = '' + child.TextContent;
                replaceText(container, child, startOffset, key);
                historyManager.recordChildTextUpdate(oldText, startOffset, child);
                return { type: 'insert', nodes: children.map((c) => {
                    return Object.assign({}, c)
                }) };
            } else {
                const index = Array.from(parent.childNodes).findIndex((c) => c === container);
                child = children[index];
                if (child) {
                    const oldText = '' + child.TextContent;
                    replaceText(container, child, startOffset, key);
                    historyManager.recordChildTextUpdate(oldText, startOffset, child);
                    return { type: 'insert', nodes: children.map((c, ind) => {
                        return ind === index ? Object.assign({}, c) : c
                    }) };
                }
            }
        }
    }

    return null;
};

export default handleCharacterInsertion;