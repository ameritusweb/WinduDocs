import React, { useRef, useState } from "react";
import EditorData, { EditorDataType } from "../../hooks/editor-data";

export interface BlankLineProps {
    format?: string | null;
}

export const BlankLine: React.FC<BlankLineProps> = ({ format }) => {
    
    const [lineFormat, setLineFormat] = useState<string | null | undefined>(format);
    const blankLineRef = useRef<HTMLElement | null>(null);

    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = lineFormat ? `h${lineFormat}` : 'p';
  
    const onFocus = () => {
      const editorData: EditorDataType = EditorData;
      if (editorData.editorState && editorData.editorState.startsWith('h'))
      {
        setLineFormat(editorData.editorState.substring(1));
        setTimeout(function(this: React.RefObject<HTMLElement | null>) {
          this.current?.focus();
        }.bind(blankLineRef), 1);
      }
    }

    const onBlur = () => {
      setLineFormat(null);
    }

    // Use React.createElement to dynamically create the element
    return React.createElement(
      Tag,
      { ref: blankLineRef, className: "blank-line", onFocus: onFocus, onBlur: onBlur, contentEditable: true, suppressContentEditableWarning: true },
      '\n'
    );
  };
  