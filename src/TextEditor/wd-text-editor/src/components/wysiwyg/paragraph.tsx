import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { AstContext, AstNode } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { HigherLevelProps } from './interface';
import { createListBlock, createNewAstNode, deepCopyAstNode, findNodeByGuid, indentListItem } from "../../rich-text-editor/node-operations";
import EditorData, { EditorDataType } from "../../hooks/editor-data";

interface ParagraphProps<T extends HTMLElement> {
  id: string;
  content: AstNode[];
  context: AstContext;
  pathIndices: number[];
  version: string;
  render: (props: RenderProps<T>) => JSX.Element;
  higherLevelContent?: HigherLevelProps;
}

interface RenderProps<T extends HTMLElement> {
  id: string;
  ref: MutableRefObject<T | null>;
  className: string;
  version: string;
  tabIndex: number;
  contentEditable: boolean;
  suppressContentEditableWarning: boolean;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const Paragraph = <T extends HTMLElement>(props: ParagraphProps<T>) => {

    const [ast, setAst] = useState<AstNode[]>(props.content);
    const [higherLevelAst, setHigherLevelAst] = useState<AstNode[]>(props.higherLevelContent?.content || []);
    const higherLevelPropsRef = useRef<HigherLevelProps | null>(props.higherLevelContent || null);
    const { updateAst } = useRichTextEditor();
    const paraRef = useRef<T | null>(null);
    const editorData: EditorDataType = EditorData;

    useEffect(() => {

      higherLevelPropsRef.current = props.higherLevelContent || null;;

    }, [props.higherLevelContent]);

    useEffect(() => {

      const handleInsertLink = (payload: { url: string, text: string }) => {
          const higherLevelAstCopy = (higherLevelPropsRef.current?.content || []).map((p) => deepCopyAstNode(p));
          const textNode = createNewAstNode('Text', 0, 0, payload.text);
          const linkNode = createNewAstNode('Link', 0, 0, null, [textNode]);
          linkNode.Attributes.Url = payload.url;
          const selection = window.getSelection();
          if (selection)
          {
            const range = selection.getRangeAt(0);
            const container = range.startContainer;
            const parent = container.parentElement;
            if (parent) {
              const [foundNode] = findNodeByGuid(higherLevelAstCopy, parent.id, null);
              if (foundNode) {
                const childIndex = Array.from(parent.childNodes).findIndex((c) => c === container);
                foundNode.Children.splice(childIndex + 1, 0, linkNode);
                editorData.emitEvent('update', 'richTextEditor', { type: 'insertLink', nodes: foundNode.Children, pathIndices: props.pathIndices });
              }
            }
          }
      };

      // Subscribe with the provided GUID
      editorData.events.subscribe(`para_${props.id}`, 'InsertLink', handleInsertLink);

      const handleInsertInline = (payload: any) => {
        const higherLevelAstCopy = (higherLevelPropsRef.current?.content || []).map((p) => deepCopyAstNode(p));
        const inlineNode = createNewAstNode('CodeInline', 0, 0, '\n');
        const selection = window.getSelection();
        if (selection)
        {
          const range = selection.getRangeAt(0);
          const container = range.startContainer;
          const parent = container.parentElement;
          if (parent) {
            const [foundNode] = findNodeByGuid(higherLevelAstCopy, parent.id, null);
            if (foundNode) {
              const childIndex = Array.from(parent.childNodes).findIndex((c) => c === container);
              foundNode.Children.splice(childIndex + 1, 0, inlineNode);
              editorData.emitEvent('update', 'richTextEditor', { type: 'insertInline', nodes: foundNode.Children, pathIndices: props.pathIndices });
            }
          }
        }
    };

      editorData.events.subscribe(`para_${props.id}`, 'InsertInline', handleInsertInline);

      const handleIndent = () => {
        const higherLevelAst = higherLevelPropsRef.current?.content || [];
        const higherLevelChild = higherLevelPropsRef.current?.contentParent;
        if (higherLevelChild)
        {
          const newListBlock = createListBlock(1, higherLevelChild.Attributes.IsOrdered === 'True');
          const selection = window.getSelection();
          if (selection)
          {
            const range = selection.getRangeAt(0);
            const container = range.startContainer;
            const parent = container.parentElement;
            if (parent) {
              const [foundNode, immediateChild] = findNodeByGuid(higherLevelAst, parent.id, null);
              if (foundNode && immediateChild) {
                const index = higherLevelAst.findIndex(h => h === immediateChild);
                const res = indentListItem(deepCopyAstNode(higherLevelChild), index);
                if (res) {
                  editorData.emitEvent('update', 'richTextEditor', { type: 'higherLevelIndent', nodes: res.Children, pathIndices: props.pathIndices });
                }
              }
            }
          }
        }
      };

      // Subscribe with the provided GUID
      editorData.events.subscribe(`para_${props.id}`, 'Indent', handleIndent);

      const handleOutdent = () => {
          
      };

      // Subscribe with the provided GUID
      editorData.events.subscribe(`para_${props.id}`, 'Outdent', handleOutdent);

      return () => {
          // Unsubscribe the GUID on component unmount
          editorData.events.unsubscribe(`para_${props.id}`);
      };
  }, [props.id]); // Depend on the GUID prop

    useEffect(() => {

      setAst(props.content);
      if (props.higherLevelContent)
        setHigherLevelAst(props.higherLevelContent.content);

    }, [props.content, props.higherLevelContent, props.higherLevelContent?.content]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

      const astCopy = ast.map((p) => deepCopyAstNode(p));
      const higherLevelAstCopy = higherLevelAst.map((p) => deepCopyAstNode(p));

      if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt')
      {
        return;
      }

      if ((event.key === 'z' || event.key === 'y') && event.ctrlKey)
      {
        return;
      }

      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight')
      {
          return;
      }

      if (event.key === 'Delete')
      {
        event.preventDefault();
        return;
      }

        const update = updateAst(event, astCopy, higherLevelAstCopy, editorData, props.pathIndices, props.higherLevelContent?.id);
        if (update.type === 'none')
        {
          return;
        }

        if (event.code === 'Space') {
          return;
        }
        event.stopPropagation();

    }

    const renderProps: RenderProps<T> = {
      id: `para_${props.id}`,
      ref: paraRef,
      className: "rich-para",
      version: props.version,
      tabIndex: 1,
      contentEditable: true,
      suppressContentEditableWarning: true,
      onKeyDown,
      children: props.content.map((item, index) => {
        const childPathIndices = [...props.pathIndices, index];
        switch (item.NodeName) {
          case 'Strong':
            return <Strong key={item.Guid + (item.Version || '0')} context={props.context} pathIndices={childPathIndices} id={item.Guid}>{item.Children}</Strong>;
          case 'Emphasis':
            return <Emphasis key={item.Guid + (item.Version || '0')} context={props.context} pathIndices={childPathIndices} id={item.Guid}>{item.Children}</Emphasis>;
          case 'CodeInline':
            return <CodeInline key={item.Guid + (item.Version || '0')} context={props.context} pathIndices={childPathIndices} id={item.Guid}>{item.TextContent}</CodeInline>;
          case 'Link':
            return <Link key={item.Guid + (item.Version || '0')} context={props.context} pathIndices={childPathIndices} id={item.Guid} version={item.Version || 'V0'} url={item.Attributes.Url || ''}>{item.Children}</Link>
          case 'Text':
          default:
            return <React.Fragment key={item.Guid}>{item.TextContent || '\n'}</React.Fragment>;
        }
      })
  };

  return props.render(renderProps);
  };
  
  export default Paragraph;