import { useState } from 'react';
import { ToolbarTab } from './toolbar-tab';
import { ToolbarButton } from './toolbar-button';
import './wysiwyg-toolbar.css'; // Import the CSS stylesheet
import rules from '../rules/wysiwyg-rules.json';
import { useEditorContext } from '../hooks/use-editor-context';

interface ToolbarProps {

}

// Utility function to get unique groups from DSL rules
const getUniqueGroups = (dslRules: any[]) => {
    const groupMap = new Map();
  
    dslRules.forEach((rule) => {
      const groupName = rule.GroupName || rule.Name;
      if (!groupMap.has(groupName)) {
        groupMap.set(groupName, []);
      }
      groupMap.get(groupName).push(rule);
    });
  
    return Array.from(groupMap).map(([groupName, rules]) => ({
      groupName,
      rules
    }));
  };

export const WysiwygToolbar: React.FC<ToolbarProps> = () => {
    const groups = getUniqueGroups(rules);
    const [activeGroupName, setActiveGroupName] = useState(groups[0].groupName);

    const {
        state,
        setState
      } = useEditorContext();

    const renderTabContent = (rules: any[], groupName: string) => {
        // Filter rules based on the active group
        const filteredRules = rules.filter(rule => rule.GroupName === groupName);
      
        // Dynamically create buttons for each rule in the group
        return filteredRules.map((rule) => (
          <ToolbarButton 
            key={rule.Name} 
            label={rule.Name.toUpperCase()}
            isActive={rule.State === state}
            onClick={() => setState(rule.State)} 
          />
        ));
      };         

  const activeGroupRules = groups.find(group => group.groupName === activeGroupName)!.rules;

  return (
    <div className="toolbar shadow-md">
      <div className="tabs">
        {groups.map(({ groupName }) => (
          <ToolbarTab
            key={groupName}
            name={groupName}
            isActive={activeGroupName === groupName}
            onClick={() => setActiveGroupName(groupName)}
          />
        ))}
      </div>
      <div className="tab-content">
        <div className="button-container" style={{ textAlign: 'left' }}>
          {renderTabContent(activeGroupRules, activeGroupName)}
        </div>
      </div>
    </div>
  );
};