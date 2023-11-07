export interface TabProps {
    name: string;
    isActive: boolean;
    onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ name , isActive, onClick }) => (
    <button
      className={`px-4 py-2 font-semibold rounded-t-lg ${isActive ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
      onClick={onClick}
    >
      {name}
    </button>
  );