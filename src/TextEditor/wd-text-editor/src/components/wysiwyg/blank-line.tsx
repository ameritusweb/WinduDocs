import React, { useRef, useState } from "react";
import EditorData, { EditorDataType } from "../../hooks/editor-data";
import { AstNode, HigherLevelProps } from "./interface";
import { useRichTextEditor } from "../../hooks/use-rich-text-editor";

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
    const Tag = lineFormat && lineFormat !== 'unselected' ? lineFormat : 'p';
  
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

      event.preventDefault();

      if (higherLevelContent.updater)
      {
        if (event.key === 'Enter') {
          const index = higherLevelContent.content.findIndex((c) => c === self);
          const newLine = createNewAstNode('BlankLine', 0, 0, null);
          higherLevelContent.content.splice(index + 1, 0, newLine);
          higherLevelContent.updater(higherLevelContent.content, '');
        } else if (event.key === 'Backspace') {
          const index = higherLevelContent.content.findIndex((c) => c === self);
          higherLevelContent.content.splice(index, 1);
          higherLevelContent.updater(higherLevelContent.content, '');
        } else if (event.key.length === 1) {
          const index = higherLevelContent.content.findIndex((c) => c === self);
          higherLevelContent.content.splice(index, 1);
          const newNode = createNewAstNodeFromFormat(lineFormat || '', event.key);
          higherLevelContent.content.splice(index, 0, newNode);
          higherLevelContent.updater(higherLevelContent.content, '');
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
  