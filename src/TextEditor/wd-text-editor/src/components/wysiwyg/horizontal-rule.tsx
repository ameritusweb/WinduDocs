import React, { useState } from "react";
import UtilityContainer from "./utility-container";

export interface HorizontalRuleProps {
    id: string;
}

const HorizontalRule: React.FC<HorizontalRuleProps> = ({id}) => {

    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};

    return (
    <section className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            tabIndex={1} // Make it focusable if needed
        >
    <hr tabIndex={1} className="hr-inset" id={id} />
    {(
        <UtilityContainer 
            show={isFocused}
            onCopy={handleCopy} 
            onCut={handleCut} 
            onDelete={handleDelete} 
            onPaste={handlePaste}
        />
    )}
</section>);
};

export default HorizontalRule;
