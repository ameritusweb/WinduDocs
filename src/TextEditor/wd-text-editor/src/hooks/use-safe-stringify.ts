import { useRef } from "react";

/**
 * Custom React hook to attach the safeStringify function to the window object.
 */
export const useSafeStringify = () => {
  
    const nodeMap = useRef<Map<string, string>>(new Map());

    /**
     * Checks if a value is a DOM node.
     * @param value The value to be checked.
     * @returns True if the value is a DOM node, false otherwise.
     */
    const isDOMNode = (value: any): value is Node => typeof value === 'object' && value !== null && 'nodeType' in value;

    /**
     * Converts a DOM node to a POJO.
     * @param node The DOM node to be converted.
     * @returns A POJO representation of the DOM node.
     */
    const convertNodeToPOJO = (node: Node): object => {
        const commonProps = {
        nodeName: node.nodeName,
        childNodes: Array.from(node.childNodes).map(convertNodeToPOJO)
        };
        return node.nodeType === 3 ? { ...commonProps, textContent: node.textContent } : commonProps;
    };

    /**
     * A custom replacer function for JSON.stringify that handles DOM nodes.
     * @param key The key of the property being stringified.
     * @param value The value of the property being stringified.
     * @returns The value to be used in the JSON string.
     */
    const safeStringifyReplacer = (key: string, value: any) => {
    if (isDOMNode(value)) {
        const uniqueId = `@@DOMNODE_${nodeMap.current.size}@@`;
        nodeMap.current.set(uniqueId, JSON.stringify(convertNodeToPOJO(value), null, 2));
        return uniqueId;
    }
    return value;
    };
    
    /**
     * A safe stringify function that handles DOM nodes and pretty-prints the JSON.
     * @param value The value to be stringified.
     * @param space The number of spaces to use in the pretty-printed JSON.
     * @returns A pretty-printed JSON string representation of the value.
     */
    function safeStringify(value: any, space: number = 2): string {
        let jsonString = JSON.stringify(value, safeStringifyReplacer, space);

        jsonString = jsonString.replace(/"@@DOMNODE_(\d+)@@"/g, (match, id) => {
        return `mockCustomElement(${nodeMap.current.get(`@@DOMNODE_${id}@@`)})`;
        });
    
        // Optionally clear the map after use if it's no longer needed
        nodeMap.current.clear();
    
        return jsonString;
    }
    
        return {
        safeStringify
    };
}