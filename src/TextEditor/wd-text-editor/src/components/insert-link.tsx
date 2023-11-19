import { useState } from "react";

interface InsertLinkProps {
    onInsert: (url: string, text: string) => void;
}

export const InsertLink: React.FC<InsertLinkProps> = ({ onInsert }) => {
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
  
    return (
      <div className="insert-link">
        <input
          type="text"
          className="outline-none"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <input
          type="text"
          className="outline-none"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="toolbar-button" onClick={() => onInsert(url, text)}>INSERT LINK</button>
      </div>
    );
  };
  