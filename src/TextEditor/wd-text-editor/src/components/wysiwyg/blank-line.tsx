import React, { useRef, useState } from "react";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { AstNode, HigherLevelProps } from "./interface";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";
import { deepCopyAstNode } from "../../rich-text-editor/node-operations";

export interface BlankLineProps {
    higherLevelContent: HigherLevelProps;
    self: AstNode;
    format?: string | null;
}

export const BlankLine: React.FC<BlankLineProps> = ({ format, self, higherLevelContent }) => {
    
    const [lineFormat, setLineFormat] = useState<string | null | undefined>(format);
    const blankLineRef = useRef<HTMLElement | null>(null);
    const { createNewAstNode, createNewAstNodeFromFormat } = useRichTextEditor();

    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = lineFormat && lineFormat !== 'unselected' && !Array.isArray(lineFormat) ? lineFormat : 'p';
  
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
      setLineFormat(null);
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
      
      event.preventDefault();

      if (higherLevelContent.updater)
      {
        const higherLevelContentCopy = higherLevelContent.content.map((h) => deepCopyAstNode(h));
        if (event.key === 'Enter') {
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          const newLine = createNewAstNode('BlankLine', 0, 0, null);
          higherLevelContentCopy.splice(index + 1, 0, newLine);
          higherLevelContent.updater(higherLevelContentCopy, '');
        } else if (event.key === 'Backspace') {
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          higherLevelContentCopy.splice(index, 1);
          higherLevelContent.updater(higherLevelContentCopy, '');
        } else if (event.key.length === 1) {
          const index = higherLevelContentCopy.findIndex((c) => c.Guid === self.Guid);
          higherLevelContentCopy.splice(index, 1);
          const newNode = createNewAstNodeFromFormat(lineFormat || '', event.key);
          higherLevelContentCopy.splice(index, 0, newNode);
          higherLevelContent.updater(higherLevelContentCopy, '');
        }

        event.stopPropagation();
      }

    }

    // Use React.createElement to dynamically create the element
    return React.createElement(
      Tag,
      { ref: blankLineRef, className: "blank-line", onFocus: onFocus, onBlur: onBlur, onKeyDown: onKeyDown, contentEditable: true, suppressContentEditableWarning: true },
      '\n'
    );
  };
  