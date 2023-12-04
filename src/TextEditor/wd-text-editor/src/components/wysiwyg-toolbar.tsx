import { useState } from 'react';
import { ToolbarTab } from './toolbar-tab';
import { ToolbarButton } from './toolbar-button';
import './wysiwyg-toolbar.css'; 
import rules from '../rules/wysiwyg-rules.json';
import { useEditorContext } from '../hooks/use-editor-context';
import EditorData, { EditorDataType } from '../hooks/editor-data';
import { InsertTable } from './insert-table';
import { InsertLink } from './insert-link';
import usePopunder from '../hooks/use-popunder';

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

export const WysiwygToolbar: React.FC<ToolbarProps> = () => {
    const groups = getUniqueGroups(rules);
    const [activeGroupName, setActiveGroupName] = useState(groups[0].groupName);
    const [ popUnderData, setPopUnderData ] = useState<{ content: string, style: any } | null>(null);
    usePopunder('toolbar', setPopUnderData);
    
    const {
        state,
        setState
      } = useEditorContext();

    const editorData: EditorDataType = EditorData;

    const renderTabContent = (rules: any[], groupName: string) => {
        
        const filteredRules = rules.filter(rule => rule.GroupName === groupName);
      
        return filteredRules.map((rule) => {
          if (rule.Name === 'Table') {
            return <InsertTable key={rule.Name} onInsert={(rows: number, cols: number) => {
              if (rule.Action) {
                editorData.emitEvent(rule.Action, 'broadcast', { rows, cols });
              }
            }} />;
          } else if (rule.Name === 'Link') {
            return <InsertLink key={rule.Name} onInsert={(url: string, text: string) => {
              if (rule.Action) {
                editorData.emitEvent(rule.Action, 'broadcast', { url, text });
              }
            }} />;
          } else {
            return (
              <div key={rule.Name}  className="inline relative">
                <ToolbarButton 
                  label={rule.Name.toUpperCase()}
                  isActive={rule.State === state}
                  onClick={() => {
                    if (rule.Action) {
                      editorData.emitEvent(rule.Action, 'broadcast', null);
                    }
                    if (rule.State) {
                      setState(rule.State);
                      editorData.editorState = rule.State;
                    }
                  }} 
                />
                {popUnderData && popUnderData.content && (
                  <div className="pop-under" style={popUnderData.style}>
                    {popUnderData.content || ''}
                  </div>
                )}
              </div>
            );
          }
        });
      };         

  const activeGroupRules = groups.find(group => group.groupName === activeGroupName)!.rules;

  return (
    <div className="toolbar shadow-md dark:text-sky-950">
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