export interface TestMutationRecord {
    type: MutationRecordType;
    addedNodes: Node[];
    removedNodes: Node[];
    nodeName: string;
    id: string | null;
    oldTextContent: string | null;
    newTextContent: string | null;
}

class DOMDiff {
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
        const oldChildren = oldNode ? Array.from(oldNode.childNodes) : [];
        const newChildren = newNode ? Array.from(newNode.childNodes) : [];
        const maxLength = Math.max(oldChildren.length, newChildren.length);

        // Recursively compare the children
        for (let i = 0; i < maxLength; i++) {
            this.traverseNodes(oldChildren[i], newChildren[i], mutations);
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
                id: oldNode instanceof HTMLElement ? oldNode.id : null,
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
                id: newNode instanceof HTMLElement ? newNode.id : null,
                oldTextContent: null,
                newTextContent: null,
            });
        }
    }
}

export default new DOMDiff();