import { ReactNode } from "react";

export interface TabPanelProps {
    content: ReactNode;
    isActive: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({ content, isActive }) => (
    <div
      className={`p-4 border-l-2 border-r-2 border-b-2 rounded-b-lg ${isActive ? 'block' : 'hidden'}`}
    >
      {content}
    </div>
  );
