import React, { useEffect, useCallback, useRef, useState } from "react";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { AstNode, HigherLevelProps } from "./interface";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { createListBlock, createTable, deepCopyAstNode } from "../../rich-text-editor/node-operations";

export interface BlankLineProps {
    id: string;
    higherLevelContent: HigherLevelProps;
    self: AstNode;
    format?: string | null;
}

export const BlankLine: React.FC<BlankLineProps> = ({ id, format, self, higherLevelContent }) => {
    
    const [lineFormat, setLineFormat] = useState<string | null | undefined>(format);
    const blankLineRef = useRef<HTMLElement | null>(null);
    const higherLevelContentRef = useRef<AstNode[]>(higherLevelContent.content);
    const { createNewAstNode, createNewAstNodeFromFormat } = useRichTextEditor();
    const editorData: EditorDataType = EditorData;

    useEffect(() => {

      higherLevelContentRef.current = higherLevelContent.content;

    }, [higherLevelContent]);
    
    const handleInsertQuote = (payload: any) => {
      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newText = createNewAstNode('Text', 0, 0, '\n');
          const newParagraph = createNewAstNode('ParagraphBlock', 0, 0, null, [newText]);
          const newLine = createNewAstNode('QuoteBlock', 0, 0, null, [newParagraph]);
          higherLevelContentCopy.splice(index, 1, newLine);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }
    };

    const handleInsertFenced = (payload: any) => {
      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newText = createNewAstNode('Text', 0, 0, '\n');
          const newCodeBlock = createNewAstNode('FencedCodeBlock', 0, 0, null, [newText]);
          higherLevelContentCopy.splice(index, 1, newCodeBlock);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }
    };

    const handleInsertHR = (payload: any) => {
      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newHR = createNewAstNode('ThematicBreakBlock', 0, 0, null);
          higherLevelContentCopy.splice(index, 1, newHR);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }
    };

    const handleInsertTable = (payload: { rows: number, cols: number }) => {
      
      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newTable = createTable(payload.rows, payload.cols);
          higherLevelContentCopy.splice(index, 1, newTable);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }

    };

    const handleInsertAlert = (type: string) => {

      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newText = createNewAstNode('Text', 0, 0, '\n');
          const newCodeBlock = createNewAstNode('FencedCodeBlock', 0, 0, null, [newText]);
          newCodeBlock.Attributes.Language = type;
          higherLevelContentCopy.splice(index, 1, newCodeBlock);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }

    }

    const handleNumberedList = () => {

      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newListBlock = createListBlock(1, true);
          higherLevelContentCopy.splice(index, 1, newListBlock);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }

    }

    const handleBulletedList = () => {

      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newListBlock = createListBlock(1, false);
          higherLevelContentCopy.splice(index, 1, newListBlock);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }

    }

    useEffect(() => {

      // Subscribe with the provided GUID
      editorData.events.subscribe(id, 'InsertHR', handleInsertHR);

      // Subscribe with the provided GUID
      editorData.events.subscribe(id, 'InsertQuote', handleInsertQuote);

      editorData.events.subscribe(id, 'InsertTable', handleInsertTable);

      editorData.events.subscribe(id, 'InsertNumbered', handleNumberedList);

      editorData.events.subscribe(id, 'InsertBulleted', handleBulletedList);

      // Subscribe with the provided GUID
      editorData.events.subscribe(id, 'InsertFenced', handleInsertFenced);

      editorData.events.subscribe(id, 'InsertWarningAlert', () => handleInsertAlert('type-alert-warning'));

      editorData.events.subscribe(id, 'InsertSuccessAlert', () => handleInsertAlert('type-alert-success'));

      editorData.events.subscribe(id, 'InsertInfoAlert', () => handleInsertAlert('type-alert-info'));

      editorData.events.subscribe(id, 'InsertErrorAlert', () => handleInsertAlert('type-alert-error'));

      return () => {
          // Unsubscribe the GUID on component unmount
          editorData.events.unsubscribe(id);
      };
  }, [id]); // Depend on the GUID prop

    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = lineFormat && lineFormat !== 'unselected' && typeof lineFormat === 'string' && lineFormat.startsWith('h') && !Array.isArray(lineFormat) ? lineFormat : 'p';
  
    const onFocus = () => {
      const editorData: EditorDataType = EditorData;
      if (editorData.editorState)
      {
        setLineFormat(editorData.editorState);
        setTimeout(function(this: React.RefObject<HTMLElement | null>) {
          this.current?.focus();
        }.bind(blankLineRef), 1);
      }
    }

    const onBlur = () => {
      //setLineFormat(null);
    }

    const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {

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

      if (higherLevelContent.updater)
      {
        const higherLevelContentCopy = higherLevelContent.content.map((h) => deepCopyAstNode(h));
        if (event.key === 'Enter') {
          event.preventDefault();
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newLine = createNewAstNode('BlankLine', 0, 0, null);
          higherLevelContentCopy.splice(index + 1, 0, newLine);
          higherLevelContent.updater(higherLevelContentCopy, true);
        } else if (event.key === 'Backspace') {
          event.preventDefault();
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          higherLevelContentCopy.splice(index, 1);
          higherLevelContent.updater(higherLevelContentCopy, true);
        } else if (event.key.length === 1) {
          event.preventDefault();
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          higherLevelContentCopy.splice(index, 1);
          const newNode = createNewAstNodeFromFormat(lineFormat || '', event.key);
          higherLevelContentCopy.splice(index, 0, newNode);
          higherLevelContent.updater(higherLevelContentCopy, true);
        }

        event.stopPropagation();
      }

    }

    // Use React.createElement to dynamically create the element
    return React.createElement(
      Tag,
      { ref: blankLineRef, id, className: "blank-line", onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, contentEditable: true, suppressContentEditableWarning: true },
      '\n'
    );
  };
  