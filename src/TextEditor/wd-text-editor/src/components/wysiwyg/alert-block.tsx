import React from "react";

interface AlertBlockProps {
    type: string; // Extracted from the language attribute
    text: string; // The text content of the alert
}

const AlertBlock: React.FC<AlertBlockProps> = ({ type, text }) => {
    const getSvg = (type: string) => {
        switch (type) {
            case 'type-alert-success':
                // Return SVG for success
                return <svg /* ...success SVG props... */ />;
            case 'type-alert-warning':
                // Return SVG for warning
                return <svg /* ...warning SVG props... */ />;
            case 'type-alert-info':
                // Return SVG for info
                return <svg /* ...info SVG props... */ />;
            case 'type-alert-error':
                // Return SVG for error
                return <svg /* ...error SVG props... */ />;
            default:
                return null;
        }
    };

    return (
        <div className={`alert alert-${type}`}>
            {getSvg(type)}
            <span>{text}</span>
        </div>
    );
};

export default AlertBlock;
