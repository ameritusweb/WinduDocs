import React, { useState } from "react";
import { AstContext, AstNode } from "./interface";
import Paragraph from "./paragraph";
import UtilityContainer from "./utility-container";

interface AlertBlockProps {
    id: string;
    context: AstContext;
    pathIndices: number[];
    version: string;
    type: string; // Extracted from the language attribute
    children: AstNode[]; // The text content of the alert
    higherLevelChildren: AstNode[];
}

const AlertBlock: React.FC<AlertBlockProps> = ({ id, context, pathIndices, type, children }) => {
    
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};

    const getSvg = (type: string) => {
        
        switch (type) {
            case 'type-alert-success':
                // Return SVG for success
                return <svg data-testid="success-icon" xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke="#00a96f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            case 'type-alert-warning':
                // Return SVG for warning
                    return <svg data-testid="warning-icon" xmlns="http://www.w3.org/2000/svg" className="shrink-0 h-6 w-6" fill="#FFFF00" viewBox="0 0 24 24">
                    {/* Outer shape */}
                    <path stroke="#ffc22d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4z" />
                    {/* Exclamation mark */}
                    <path stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01" />
                </svg>
            case 'type-alert-info':
                // Return SVG for info
                return  <svg data-testid="info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
            case 'type-alert-error':
                // Return SVG for error
                return <svg data-testid="error-icon" xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke="#ff6f70" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            default:
                return null;
        }
    };

    return (
        <section id={`section_${id}`}
            className="relative"
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} // Make it focusable if needed
        >
        <div id={id} className="rich-alert flex">
            <div className="alert">
            {getSvg(type)}
            {children.map((child, index) => {
                    const childPathIndices = [...pathIndices, index];
                    switch (child.NodeName) {
                        case 'Text':
                            return <Paragraph<HTMLParagraphElement> key={child.Guid} id={child.Guid} context={{ ...context, isAlertBlock: true, types: [ ...context.types, 'alert' ] }} pathIndices={childPathIndices} version={child.Version || 'V0'} content={[child]} higherLevelContent={{ content: children }} render={props => <p {...props}></p>} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
        {(
                    <UtilityContainer 
                        show={isFocused}
                        onCopy={handleCopy} 
                        onCut={handleCut} 
                        onDelete={handleDelete} 
                        onPaste={handlePaste}
                    />
                )}
        </section>
    );
};

export default AlertBlock;
