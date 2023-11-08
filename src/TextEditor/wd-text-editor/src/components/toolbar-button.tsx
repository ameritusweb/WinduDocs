export interface ToolbarButtonProps {
    label: string;
    onClick: () => void;
}

export const ToolbarButton: React.FC<ToolbarButtonProps> = ({ label, onClick }) => (
    <button className="toolbar-button" onClick={onClick}>
      {label}
    </button>
  );