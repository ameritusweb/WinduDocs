export interface ToolbarTabProps {
    name: string;
    isActive: boolean;
    onClick: () => void;
}

export const ToolbarTab: React.FC<ToolbarTabProps> = ({ name, isActive, onClick }) => (
  <button
    className={`tab ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {name}
  </button>
);
