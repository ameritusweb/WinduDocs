import React from "react";

interface LinkProps {
    url: string;
    children: string | null;
}

const Link: React.FC<LinkProps> = ({ url, children }) => {
    return <a href={url}>{children}</a>;
};

export default Link;