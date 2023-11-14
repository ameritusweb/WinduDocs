import React from "react";

export interface HorizontalRuleProps {
    id: string;
}

const HorizontalRule: React.FC<HorizontalRuleProps> = ({id}) => {
    return <hr id={id} />;
};

export default HorizontalRule;
