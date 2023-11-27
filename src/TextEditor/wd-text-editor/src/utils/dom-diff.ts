export interface TestMutationRecord {
    type: MutationRecordType;
    addedNodes: Node[];
    removedNodes: Node[];
    nodeName: string;
    id: string | null;
    oldTextContent: string | null;
    newTextContent: string | null;
}

class DomDiff {
    compareTrees(oldTree: Node, newTree: Node): TestMutationRecord[] {
        // Start the comparison process and return the results directly
        return this.traverseNodes(oldTree, newTree);
    }

    traverseNodes(oldNode: Node, newNode: Node, mutations: TestMutationRecord[] = []) {
        // Compare the current pair of nodes
        if (this.nodesAreDifferent(oldNode, newNode)) {
            this.recordMutation(oldNode, newNode, mutations);
            // Stop further traversal as the parent nodes are different
            return mutations;
        }

        // Continue with child nodes only if parent nodes are similar
        const oldChildren = oldNode.hasChildNodes() ? Array.from(oldNode.childNodes) : [];
        const newChildren = newNode.hasChildNodes() ? Array.from(newNode.childNodes) : [];
        const maxLength = Math.max(oldChildren.length, newChildren.length);

        // Recursively compare the children
        for (let i = 0; i < maxLength; i++) {
            // Check if both nodes have a child at this index
            if (i < oldChildren.length && i < newChildren.length) {
                this.traverseNodes(oldChildren[i], newChildren[i], mutations);
            } else if (i < oldChildren.length) {
                // oldNode has a child, but newNode does not - record removal
                this.recordNodeRemoval(oldChildren[i], mutations);
            } else if (i < newChildren.length) {
                // newNode has a child, but oldNode does not - record addition
                this.recordNodeAddition(newChildren[i], mutations);
            }
        }

        return mutations;
    }

    nodesAreDifferent(oldNode: Node, newNode: Node) {
        // Logic to determine if two nodes are different
        // Consider nodeName and textContent for comparison
        return oldNode?.nodeName !== newNode?.nodeName ||
               oldNode?.textContent !== newNode?.textContent;
    }

    recordMutation(oldNode: Node, newNode: Node, mutations: TestMutationRecord[]) {
        // Character data mutation: when text content changes
        if (oldNode?.nodeName === newNode?.nodeName) {
            mutations.push({
                type: 'characterData',
                addedNodes: [],
                removedNodes: [],
                nodeName: oldNode.nodeName,
                id: null,
                oldTextContent: oldNode.textContent,
                newTextContent: newNode.textContent,
            });
        } else {
            // Child list mutation: when there's a structural change (addition/removal of nodes)
            const addedNodes = Array.from(newNode.childNodes).filter(n => !Array.from(oldNode.childNodes).includes(n));
            const removedNodes = Array.from(oldNode.childNodes).filter(n => !Array.from(newNode.childNodes).includes(n));

            mutations.push({
                type: 'childList',
                addedNodes: addedNodes,
                removedNodes: removedNodes,
                nodeName: newNode.nodeName, // Reflects the node where the change occurred
                id: (newNode as HTMLElement).id,
                oldTextContent: null,
                newTextContent: null,
            });
        }
    }

    recordNodeRemoval(node: Node, mutations: TestMutationRecord[]) {
        // Create a mutation record for a removed node
        mutations.push({
            type: 'childList', // Indicates a structural change
            addedNodes: [], // No nodes added
            removedNodes: [node], // The removed node
            nodeName: node.nodeName, // Node name of the removed node
            id: (node as HTMLElement).id, // ID if it's an HTMLElement
            oldTextContent: node.textContent, // Text content of the removed node
            newTextContent: null, // No new text content as the node is removed
        });
    }

    recordNodeAddition(node: Node, mutations: TestMutationRecord[]) {
        // Create a mutation record for an added node
        mutations.push({
            type: 'childList', // Indicates a structural change
            addedNodes: [node], // The added node
            removedNodes: [], // No nodes removed
            nodeName: node.nodeName, // Node name of the added node
            id: (node as HTMLElement).id, // ID if it's an HTMLElement
            oldTextContent: null, // No old text content as the node is new
            newTextContent: node.textContent, // Text content of the added node
        });
    }
}

export default new DomDiff();