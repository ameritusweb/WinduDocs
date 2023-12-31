import { useState } from 'react';
import { ToolbarTab } from './toolbar-tab';
import { ToolbarButton } from './toolbar-button';
import './toolbar.css'; 
import dslRules from '../rules/dsl-rules.json';

interface ToolbarProps {

}


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

export const Toolbar: React.FC<ToolbarProps> = () => {
    const groups = getUniqueGroups(dslRules);
    const [activeGroupName, setActiveGroupName] = useState(groups[0].groupName);

  const renderTabContent = (rules: any[], groupName?: string) => {
    
    
    if (rules.length === 1)
    {
        const rule = rules[0];
        if (rule.Name === 'Header') {
            return ['h1', 'h2', 'h3', 'h4', 'h5'].map((level) => (
                <ToolbarButton key={level} label={level.toUpperCase()} onClick={() => console.log(`Apply ${level}`)} />
            ));
        }
        
    }
    else
    {
        if (groupName === 'Text Styles')
        {
            return ['bold-italic', 'bold', 'italic'].map((level) => (
                <ToolbarButton key={level} label={level.toUpperCase()} onClick={() => console.log(`Apply ${level}`)} />
            ));
        }
        
    }
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