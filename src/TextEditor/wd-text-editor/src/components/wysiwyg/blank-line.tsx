import React from "react";

export interface BlankLineProps {
    format?: string | null;
}

export const BlankLine: React.FC<BlankLineProps> = ({ format }) => {
    // Determine the tag based on the format. Default to 'p' for plain text.
    const Tag = format ? `h${format}` : 'p';
  
    // Use React.createElement to dynamically create the element
    return React.createElement(
      Tag,
      { className: "blank-line" },
      '\n'
    );
  };
  