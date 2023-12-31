import React, { useEffect, useRef, useState } from "react";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { AstNode, HigherLevelProps } from "./interface";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { createListBlock, createTable, deepCopyAstNode } from "../../rich-text-editor/node-operations";
import HistoryBuilder from "../../rich-text-editor/undo-redo-ot/history/history-builder";

export interface BlankLineProps {
    id: string;
    higherLevelContent: HigherLevelProps;
    self: AstNode;
    format?: string | null;
}

const BlankLine: React.FC<BlankLineProps> = ({ id, format, self, higherLevelContent }) => {
    
    const [lineFormat, setLineFormat] = useState<string | null | undefined>(format);
    const blankLineRef = useRef<HTMLElement | null>(null);
    const higherLevelContentRef = useRef<AstNode[]>(higherLevelContent.content);
    const { createNewAstNode, createNewAstNodeFromFormat, historyManager } = useRichTextEditor();
    const editorData: EditorDataType = EditorData;

    useEffect(() => {

      higherLevelContentRef.current = higherLevelContent.content;

    }, [higherLevelContent]);
    
    const handleInsertQuote = () => {
      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newText = createNewAstNode('Text', 0, 0, '\n');
          const newParagraph = createNewAstNode('ParagraphBlock', 0, 0, null, [newText]);
          const newLine = createNewAstNode('QuoteBlock', 0, 0, null, [newParagraph]);
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1, newLine);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
          historyBuilder.addFinalCursorPosition(newParagraph, 0, 0);
          historyBuilder.addReplaceCommand(oldNode, newLine);
          historyBuilder.applyTo(historyManager);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }
    };

    const handleInsertFenced = () => {
      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newText = createNewAstNode('Text', 0, 0, '\n');
          const newCodeBlock = createNewAstNode('FencedCodeBlock', 0, 0, null, [newText]);
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1, newCodeBlock);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
          historyBuilder.addFinalCursorPosition({ ...newText, NodeName: 'ParagraphBlock' }, 0, 0);
          historyBuilder.addReplaceCommand(oldNode, newCodeBlock);
          historyBuilder.applyTo(historyManager);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }
    };

    const handleInsertHR = () => {
      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newHR = createNewAstNode('ThematicBreakBlock', 0, 0, null);
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1, newHR);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
          historyBuilder.addFinalCursorPosition(newHR, 0, 0);
          historyBuilder.addReplaceCommand(oldNode, newHR);
          historyBuilder.applyTo(historyManager);
          
          higherLevelContent.updater(higherLevelContentCopy, true);
      }
    };

    type TablePayload = { rows: number, cols: number };

    function isTablePayload(payload: any): payload is TablePayload {
        return payload && typeof payload === 'object' && 'rows' in payload && 'cols' in payload;
    }

    const handleInsertTable = (payload: { rows: number, cols: number } | object) => {
      
      if (higherLevelContent && higherLevelContent.updater && payload && isTablePayload(payload)) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newTable = createTable(payload.rows, payload.cols);
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1, newTable);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
          historyBuilder.addFinalCursorPosition(newTable, 0, 0);
          historyBuilder.addReplaceCommand(oldNode, newTable);
          historyBuilder.applyTo(historyManager);
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
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1, newCodeBlock);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
          historyBuilder.addFinalCursorPosition({ ...newText, NodeName: 'ParagraphBlock' }, 0, 0);
          historyBuilder.addReplaceCommand(oldNode, newCodeBlock);
          historyBuilder.applyTo(historyManager);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }

    }

    const handleNumberedList = () => {

      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newListBlock = createListBlock(1, true);
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1, newListBlock);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
          historyBuilder.addFinalCursorPosition(newListBlock.Children[0].Children[0], 0, 0);
          historyBuilder.addReplaceCommand(oldNode, newListBlock);
          historyBuilder.applyTo(historyManager);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }

    }

    const handleBulletedList = () => {

      if (higherLevelContent && higherLevelContent.updater) {
        const higherLevelContentCopy = higherLevelContentRef.current.map((h) => deepCopyAstNode(h));
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newListBlock = createListBlock(1, false);
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1, newListBlock);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 0);
          historyBuilder.addFinalCursorPosition(newListBlock.Children[0].Children[0], 0, 0);
          historyBuilder.addReplaceCommand(oldNode, newListBlock);
          historyBuilder.applyTo(historyManager);
          higherLevelContent.updater(higherLevelContentCopy, true);
      }

    }

    useEffect(() => {

      
      editorData.events.subscribe(id, 'InsertHR', handleInsertHR);

      
      editorData.events.subscribe(id, 'InsertQuote', handleInsertQuote);

      editorData.events.subscribe(id, 'InsertTable', handleInsertTable);

      editorData.events.subscribe(id, 'InsertNumbered', handleNumberedList);

      editorData.events.subscribe(id, 'InsertBulleted', handleBulletedList);

      
      editorData.events.subscribe(id, 'InsertFenced', handleInsertFenced);

      editorData.events.subscribe(id, 'InsertWarningAlert', () => handleInsertAlert('type-alert-warning'));

      editorData.events.subscribe(id, 'InsertSuccessAlert', () => handleInsertAlert('type-alert-success'));

      editorData.events.subscribe(id, 'InsertInfoAlert', () => handleInsertAlert('type-alert-info'));

      editorData.events.subscribe(id, 'InsertErrorAlert', () => handleInsertAlert('type-alert-error'));

      return () => {
          
          editorData.events.unsubscribe(id);
      };
  }, [id]); 

  const onFocus = () => {
    const editorData: EditorDataType = EditorData;
    const currentFocus: HTMLElement = document.activeElement as HTMLElement;
  
    if (editorData.editorState) {
      const currentFocusId = currentFocus.id;
  
      setLineFormat(prev => {
        if (prev !== editorData.editorState) {
          
          requestAnimationFrame(() => {
            const elementToFocus = document.getElementById(currentFocusId);
            if (elementToFocus) {
              elementToFocus.focus();
            }
          });
        }
        return editorData.editorState;
      });
    }
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
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(higherLevelContentCopy[index], 0, 0);
          historyBuilder.addFinalCursorPosition(newLine, 0, 0);
          historyBuilder.addInsertAfterCommand(higherLevelContentCopy[index], newLine);
          historyBuilder.applyTo(historyManager);
          higherLevelContent.updater(higherLevelContentCopy, true);
        } else if (event.key === 'Backspace') {
          event.preventDefault();
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          higherLevelContentCopy.splice(index, 1);
          higherLevelContent.updater(higherLevelContentCopy, true);
        } else if (event.key.length === 1) {
          event.preventDefault();
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const oldNode = deepCopyAstNode(higherLevelContentCopy[index]);
          higherLevelContentCopy.splice(index, 1);
          const newNode = createNewAstNodeFromFormat(lineFormat!, event.key);
          higherLevelContentCopy.splice(index, 0, newNode);
          const historyBuilder = new HistoryBuilder();
          historyBuilder.addInitialCursorPosition(oldNode, 0, 1);
          historyBuilder.addFinalCursorPosition(newNode, 0, 1);
          historyBuilder.addReplaceCommand(oldNode, newNode);
          historyBuilder.applyTo(historyManager);
          higherLevelContent.updater(higherLevelContentCopy, true);
        }

        event.stopPropagation();
      }

    }

    
    const Tag = lineFormat && lineFormat !== 'unselected' && typeof lineFormat === 'string' && lineFormat.startsWith('h') && !Array.isArray(lineFormat) ? lineFormat : 'p';

    
    return React.createElement(
      Tag,
      { ref: blankLineRef, id, className: "blank-line", onFocus: onFocus, onKeyDown: onKeyDown, contentEditable: true, suppressContentEditableWarning: true },
      '\n'
    );
  };
  
  export default BlankLine;