import usePopunder from '../hooks/use-popunder';

export interface ToolbarButtonProps {
    label: string;
    onClick: () => void;
    isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ label, onClick, isActive }) => {

    const { showPopunder, hidePopunder } = usePopunder();
  
    return <button className={`toolbar-button${isActive ? ' active' : ''}`} 
      onClick={onClick}
      onMouseEnter={() => showPopunder(label)}
      onMouseLeave={hidePopunder}>
      {label}
    </button>
  };