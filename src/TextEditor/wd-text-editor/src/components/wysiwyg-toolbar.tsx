import { useState } from 'react';
import { ToolbarTab } from './toolbar-tab';
import { ToolbarButton } from './toolbar-button';
import './wysiwyg-toolbar.css'; // Import the CSS stylesheet
import rules from '../rules/wysiwyg-rules.json';
import { useEditorContext } from '../hooks/use-editor-context';
import EditorData, { EditorDataType } from '../hooks/editor-data';
import { InsertTable } from './insert-table';
import { InsertLink } from './insert-link';

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

    const editorData: EditorDataType = EditorData;

    const renderTabContent = (rules: any[], groupName: string) => {
        // Filter rules based on the active group
        const filteredRules = rules.filter(rule => rule.GroupName === groupName);

        const editor = document.getElementById('richTextEditor');
      
        return filteredRules.map((rule) => {
          if (rule.Name === 'Table') {
            return <InsertTable key={rule.Name} onInsert={(rows: number, cols: number) => {
              if (rule.Action) {
                editorData.emitEvent(rule.Action, editor?.id || '', { rows, cols });
              }
            }} />;
          } else if (rule.Name === 'Link') {
            return <InsertLink key={rule.Name} onInsert={(url: string, text: string) => {
              if (rule.Action) {
                editorData.emitEvent(rule.Action, editor?.id || '', { url, text });
              }
            }} />;
          } else {
            return (
              <ToolbarButton 
                key={rule.Name} 
                label={rule.Name.toUpperCase()}
                isActive={rule.State === state}
                onClick={() => {
                  if (rule.Action) {
                    editorData.emitEvent(rule.Action, editor?.id || '', null);
                  }
                  else if (rule.State) {
                    setState(rule.State);
                    editorData.editorState = rule.State;
                  }
                }} 
              />
            );
          }
        });
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