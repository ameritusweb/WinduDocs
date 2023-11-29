import { AstContext, AstNode } from "../components/wysiwyg/interface";
import { createListBlock, createNewAstNode, deepCopyAstNode, findNodeByGuid, indentListItem } from "../rich-text-editor/node-operations";
import EditorData, { EditorDataType } from "./editor-data";
import { useRichTextEditor } from "./use-rich-text-editor";

export const useParagraph = () => {

    const { gatherUpdateData } = useRichTextEditor();
    const editorData: EditorDataType = EditorData;

    const handleMakeBold = (astCopy: AstNode[], higherLevelAstCopy: AstNode[], context: AstContext) => {
          
        const gatherRes = gatherUpdateData(astCopy, higherLevelAstCopy);
        if (gatherRes)
        {
          const { updateData, container, endContainer, range, startOffset } = gatherRes;
          if (container === endContainer) {
                const { parent } = updateData;
                if (parent) {
                if (context.types.length === 0 && parent.nodeName === 'P')
                {
                    const higherLevelChildren = higherLevelAstCopy;
                }
                }
            }
        }
    };

    const handleInsertLink = (higherLevelChildren: AstNode[], text: string, url: string, pathIndices: number[]) => {
        const textNode = createNewAstNode('Text', 0, 0, text);
        const linkNode = createNewAstNode('Link', 0, 0, null, [textNode]);
        linkNode.Attributes.Url = url;
        const selection = window.getSelection();
        if (selection)
        {
          const range = selection.getRangeAt(0);
          const container = range.startContainer;
          const parent = container.parentElement;
          if (parent) {
            const [foundNode] = findNodeByGuid(higherLevelChildren, parent.id, null);
            if (foundNode) {
              const childIndex = Array.from(parent.childNodes).findIndex((c) => c === container);
              foundNode.Children.splice(childIndex + 1, 0, linkNode);
              editorData.emitEvent('update', 'richTextEditor', { type: 'insertLink', nodes: foundNode.Children, pathIndices });
            }
          }
        }
    }

    const handleInsertInline = (higherLevelChildren: AstNode[], pathIndices: number[]) => {
        const inlineNode = createNewAstNode('CodeInline', 0, 0, '\n');
        const selection = window.getSelection();
        if (selection)
        {
          const range = selection.getRangeAt(0);
          const container = range.startContainer;
          const parent = container.parentElement;
          if (parent) {
            const [foundNode] = findNodeByGuid(higherLevelChildren, parent.id, null);
            if (foundNode) {
              const childIndex = Array.from(parent.childNodes).findIndex((c) => c === container);
              foundNode.Children.splice(childIndex + 1, 0, inlineNode);
              editorData.emitEvent('update', 'richTextEditor', { type: 'insertInline', nodes: foundNode.Children, pathIndices });
            }
          }
        }
    }

    const handleIndent = (higherLevelChildren: AstNode[], higherLevelChild: AstNode, pathIndices: number[]) => {
        const newListBlock = createListBlock(1, higherLevelChild.Attributes.IsOrdered === 'True');
        const selection = window.getSelection();
        if (selection)
        {
            const range = selection.getRangeAt(0);
            const container = range.startContainer;
            const parent = container.parentElement;
            if (parent) {
                    const [foundNode, immediateChild] = findNodeByGuid(higherLevelChildren, parent.id, null);
                    if (foundNode && immediateChild) {
                    const index = higherLevelChildren.findIndex(h => h === immediateChild);
                    const res = indentListItem(deepCopyAstNode(higherLevelChild), index);
                    if (res) {
                        editorData.emitEvent('update', 'richTextEditor', { type: 'higherLevelIndent', nodes: res.Children, pathIndices });
                    }
                }
            }
        }
    }

    return {
        handleMakeBold,
        handleInsertLink,
        handleInsertInline,
        handleIndent
      };
}