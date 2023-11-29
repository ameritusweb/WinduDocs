import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import editorData from './editor-data';

const usePopunder = (id: string, setState: Dispatch<SetStateAction<{ content: string; style: any; } | null>>) => {

  const getPopunderContentAndStyle = (label: string) => {
    switch (label) {
      case 'H1':
        return { content: 'Heading', style: { fontSize: '2rem', fontWeight: 'bold' } };
      case 'H2':
        return { content: 'Heading', style: { fontSize: '1.5rem', fontWeight: 'bold' } };
      case 'H3':
        return { content: 'Heading', style: { fontSize: '1.17rem', fontWeight: 'bold' } };
      case 'H4':
        return { content: 'Heading', style: { fontSize: '1rem', fontWeight: 'bold' } };
      case 'H5':
        return { content: 'Heading', style: { fontSize: '0.83em', fontWeight: 'bold' } };
      case 'H6':
        return { content: 'Heading', style: { fontSize: '0.67em', fontWeight: 'bold' } };
      case 'BOLD':
        return { content: 'Bold', style: { fontWeight: 'bold' } };
      case 'ITALIC':
        return { content: 'Italic', style: { fontStyle: 'italic' } };
      case 'NORMAL':
        return { content: 'Normal', style: { fontStyle: 'normal' } };
      case 'BOLD + ITALIC':
        return { content: 'Bold + Italic', style: { fontWeight: 'bold', fontStyle: 'italic' } };
      // Add more cases as needed
      default:
        return { content: '', style: {} };
    }
  };

  useEffect(() => {

    editorData.events.subscribe(id, 'open', (content: { label: string }) => {
      setState(getPopunderContentAndStyle(content.label));
    });

    return () => {
        editorData.events.unsubscribe(id);
    }

}, []);

  return { };
};

export default usePopunder;
