import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { AstContext, AstNode } from "./interface";
import Strong from "./strong";
import Emphasis from "./emphasis";
import CodeInline from "./code-inline";
import Link from "./link";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { HigherLevelProps } from './interface';
import { deepCopyAstNode } from "../../rich-text-editor/node-operations";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { useParagraph } from "../../hooks/use-paragraph";

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
    const higherLevelCopyPropsRef = useRef<HigherLevelProps | null>(props.higherLevelContent || null);
    const pathIndicesRef = useRef<number[]>(props.pathIndices);
    const { updateAst } = useRichTextEditor();
    const { handleMakeBold, handleMakeItalic, handleInsertLink, handleInsertInline, handleIndent } = useParagraph();
    const paraRef = useRef<T | null>(null);
    const editorData: EditorDataType = EditorData;

    useEffect(() => {

      higherLevelCopyPropsRef.current = { ...{ ...props.higherLevelContent, content: (props.higherLevelContent?.content || []).map(h => deepCopyAstNode(h)) }, children: props.content.map(c => deepCopyAstNode(c)) } || null;

      pathIndicesRef.current = props.pathIndices;

    }, [props.higherLevelContent, props.pathIndices]);

    useEffect(() => {

      const onInsertLink = (payload: { url: string, text: string }) => {
          const higherLevelAstCopy = higherLevelCopyPropsRef.current?.content;
          if (higherLevelAstCopy)
            handleInsertLink(higherLevelAstCopy, payload.text, payload.url, pathIndicesRef.current);
      };

      
      editorData.events.subscribe(`para_${props.id}`, 'InsertLink', onInsertLink);

      const onInsertInline = () => {
        const higherLevelAstCopy = higherLevelCopyPropsRef.current?.content;
        if (higherLevelAstCopy)
          handleInsertInline(higherLevelAstCopy, pathIndicesRef.current);
    };

      editorData.events.subscribe(`para_${props.id}`, 'InsertInline', onInsertInline);

      const onIndent = () => {
        const higherLevelAst = higherLevelCopyPropsRef.current?.content || [];
        const higherLevelChild = higherLevelCopyPropsRef.current?.contentParent;
        if (higherLevelChild)
          handleIndent(higherLevelAst, higherLevelChild, pathIndicesRef.current);
      };

      
      editorData.events.subscribe(`para_${props.id}`, 'Indent', onIndent);

      const onOutdent = () => {
          
      };

      
      editorData.events.subscribe(`para_${props.id}`, 'Outdent', onOutdent);

      const onMakeBold = () => {
          
        const astCopy = higherLevelCopyPropsRef.current?.children;
        const higherLevelAstCopy = higherLevelCopyPropsRef.current?.content;
        if (astCopy && higherLevelAstCopy)
          handleMakeBold(astCopy, higherLevelAstCopy, props.context, pathIndicesRef.current);

      };

      
      editorData.events.subscribe(`para_${props.id}`, 'MakeBold', onMakeBold);

      const onMakeItalic = () => {
          
        const astCopy = higherLevelCopyPropsRef.current?.children;
        const higherLevelAstCopy = higherLevelCopyPropsRef.current?.content;
        if (astCopy && higherLevelAstCopy)
          handleMakeItalic(astCopy, higherLevelAstCopy, props.context, pathIndicesRef.current);

      };

      
      editorData.events.subscribe(`para_${props.id}`, 'MakeItalic', onMakeItalic);

      const onMakeBoldAndItalic = () => {
          
      };

      
      editorData.events.subscribe(`para_${props.id}`, 'MakeBoldAndItalic', onMakeBoldAndItalic);

      const onMakeNormal = () => {
          
      };

      
      editorData.events.subscribe(`para_${props.id}`, 'MakeNormal', onMakeNormal);

      editorData.events.subscribe(`para_${props.id}`, '*', (payload: any) => { editorData.emitEvent(payload.event, `para_${props.id}`, payload); });

      return () => {
          
          editorData.events.unsubscribe(`para_${props.id}`);
      };
  }, [props.id]); 

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

        const update = updateAst(event, astCopy, higherLevelAstCopy, editorData, props.context, props.pathIndices, props.higherLevelContent?.higherLevelIndex);
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
            return <Strong key={item.Guid + (item.Version || '0')} parentId={`para_${props.id}`} context={props.context} pathIndices={childPathIndices} id={item.Guid}>{item.Children}</Strong>;
          case 'Emphasis':
            return <Emphasis key={item.Guid + (item.Version || '0')} parentId={`para_${props.id}`} context={props.context} pathIndices={childPathIndices} id={item.Guid}>{item.Children}</Emphasis>;
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