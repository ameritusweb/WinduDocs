import editorData from '../hooks/editor-data';

export interface ToolbarButtonProps {
    label: string;
    onClick: () => void;
    isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ label, onClick, isActive }) => {
  
    return <button className={`toolbar-button${isActive ? ' active' : ''}`} 
      onClick={onClick}
      onMouseEnter={() => editorData.events.emit('open', 'toolbar', { label })}
      >
      {label}
    </button>
  };