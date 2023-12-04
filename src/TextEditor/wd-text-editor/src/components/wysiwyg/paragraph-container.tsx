import { ReactElement, useState } from "react";
import UtilityContainer from "./utility-container";

interface ParagraphContainerProps {
    renderParagraph: (paragraphProps: RenderParagraphProps) => ReactElement;
    paragraphId: string;
}

interface RenderParagraphProps {
    handleFocus: (event: React.FocusEvent<HTMLElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLElement>) => void;
}

const ParagraphContainer: React.FC<ParagraphContainerProps> = ({ renderParagraph, paragraphId }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const handleDelete = () => {/* Implement deletion logic */};
    const handleCut = () => {/* Implement cut logic */};
    const handleCopy = () => {/* Implement copy logic */};
    const handlePaste = () => {/* Implement paste logic */};

    return (
        <section 
            id={`section_${paragraphId}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="relative"
            tabIndex={1} 
        >
            {renderParagraph({ handleFocus, handleBlur })}
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

export default ParagraphContainer;