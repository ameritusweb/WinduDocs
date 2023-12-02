import { AstNode } from "../../components/wysiwyg/interface";

/**
 * Finds the top-level index of a node with the specified GUID in a tree structure.
 * @param {AstNode[]} nodes - The array of AstNodes to search through.
 * @param {string} guid - The GUID to search for.
 * @returns {number | null} - The index of the node with the specified GUID, or null if not found.
 */
const findNodeIndexByGuid = (nodes: AstNode[], guid: string): number | null => {
    return nodes.findIndex(node => {
        // Check if the current node matches the GUID
        if (node.Guid === guid) return true;
        
        // Recursively search in the children of the current node
        const childIndex = findNodeIndexByGuid(node.Children, guid);
        return childIndex !== null && childIndex >= 0;
    });
}

export default findNodeIndexByGuid;