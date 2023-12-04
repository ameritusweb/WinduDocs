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
        
        return this.traverseNodes(oldTree, newTree);
    }

    traverseNodes(oldNode: Node, newNode: Node, mutations: TestMutationRecord[] = []) {
        
        if (this.nodesAreDifferent(oldNode, newNode)) {
            this.recordMutation(oldNode, newNode, mutations);
            
            return mutations;
        }

        
        const oldChildren = oldNode.hasChildNodes() ? Array.from(oldNode.childNodes) : [];
        const newChildren = newNode.hasChildNodes() ? Array.from(newNode.childNodes) : [];
        const maxLength = Math.max(oldChildren.length, newChildren.length);

        
        for (let i = 0; i < maxLength; i++) {
            
            if (i < oldChildren.length && i < newChildren.length) {
                this.traverseNodes(oldChildren[i], newChildren[i], mutations);
            } else if (i < oldChildren.length) {
                
                this.recordNodeRemoval(oldChildren[i], mutations);
            } else if (i < newChildren.length) {
                
                this.recordNodeAddition(newChildren[i], mutations);
            }
        }

        return mutations;
    }

    nodesAreDifferent(oldNode: Node, newNode: Node) {
        
        
        return oldNode?.nodeName !== newNode?.nodeName ||
               oldNode?.textContent !== newNode?.textContent;
    }

    recordMutation(oldNode: Node, newNode: Node, mutations: TestMutationRecord[]) {
        
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
            
            const addedNodes = Array.from(newNode.childNodes).filter(n => !Array.from(oldNode.childNodes).includes(n));
            const removedNodes = Array.from(oldNode.childNodes).filter(n => !Array.from(newNode.childNodes).includes(n));

            mutations.push({
                type: 'childList',
                addedNodes: addedNodes,
                removedNodes: removedNodes,
                nodeName: newNode.nodeName, 
                id: (newNode as HTMLElement).id,
                oldTextContent: null,
                newTextContent: null,
            });
        }
    }

    recordNodeRemoval(node: Node, mutations: TestMutationRecord[]) {
        
        mutations.push({
            type: 'childList', 
            addedNodes: [], 
            removedNodes: [node], 
            nodeName: node.nodeName, 
            id: (node as HTMLElement).id, 
            oldTextContent: node.textContent, 
            newTextContent: null, 
        });
    }

    recordNodeAddition(node: Node, mutations: TestMutationRecord[]) {
        
        mutations.push({
            type: 'childList', 
            addedNodes: [node], 
            removedNodes: [], 
            nodeName: node.nodeName, 
            id: (node as HTMLElement).id, 
            oldTextContent: null, 
            newTextContent: node.textContent, 
        });
    }
}

export default new DomDiff();