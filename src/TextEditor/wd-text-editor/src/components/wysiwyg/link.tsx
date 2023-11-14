import React from "react";

interface LinkProps {
    id: string;
    url: string;
    children: string | null;
}

const Link: React.FC<LinkProps> = ({ id, url, children }) => {
    return <a id={id} href={url}>{children}</a>;
};

export default Link;