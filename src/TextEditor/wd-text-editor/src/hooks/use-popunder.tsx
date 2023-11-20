import { useState } from 'react';

const usePopunder = () => {
  const [popUnderData, setPopUnderData] = useState({ content: '', style: {} });

  const getPopunderContentAndStyle = (label: string) => {
    switch (label) {
      case 'H1':
        return { content: 'Heading', style: { fontSize: '32px', fontWeight: 'bold' } };
      case 'H2':
        return { content: 'Heading', style: { fontSize: '32px', fontWeight: 'bold' } };
      case 'H3':
        return { content: 'Heading', style: { fontSize: '32px', fontWeight: 'bold' } };
      case 'H4':
        return { content: 'Heading', style: { fontSize: '32px', fontWeight: 'bold' } };
      case 'H5':
        return { content: 'Heading', style: { fontSize: '32px', fontWeight: 'bold' } };
      case 'H6':
        return { content: 'Heading', style: { fontSize: '32px', fontWeight: 'bold' } };
      case 'BOLD':
        return { content: 'Bold', style: { fontWeight: 'bold' } };
      case 'ITALIC':
        return { content: 'Italic', style: { fontStyle: 'italic' } };
      // Add more cases as needed
      default:
        return { content: '', style: {} };
    }
  };

  const showPopunder = (label: string) => {
    const { content, style } = getPopunderContentAndStyle(label);
    setPopUnderData({ content, style });
  };

  const hidePopunder = () => {
    setPopUnderData({ content: '', style: {} });
  };

  return { popUnderData, showPopunder, hidePopunder };
};

export default usePopunder;
