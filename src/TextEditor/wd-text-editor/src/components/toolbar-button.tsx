export interface ToolbarButtonProps {
    label: string;
    onClick: () => void;
    isActive?: boolean;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ label, onClick, isActive }) => (
    <button className={`toolbar-button${isActive ? ' active' : ''}`} onClick={onClick}>
      {label}
    </button>
  );