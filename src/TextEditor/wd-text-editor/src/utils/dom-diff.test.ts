import DomDiff from './dom-diff'

describe('DOMDiff for child node mutations', () => {
    it('identifies added child nodes', () => {
      const oldNode = document.createElement('div');
      const newNode = document.createElement('div');
      const newChild = document.createElement('span'); 
      newNode.appendChild(newChild);
  
      const domDiff = DomDiff;
      const mutations = domDiff.compareTrees(oldNode, newNode);
  
      expect(mutations).toHaveLength(1);
      expect(mutations[0].type).toBe('childList');
      expect(mutations[0].addedNodes).toContain(newChild);
      
    });

    it('identifies a changed node name', () => {
        const oldNode = document.createElement('div');
        const newNode = document.createElement('span');
        const newChild = document.createElement('span'); 
        newNode.appendChild(newChild);
    
        const domDiff = DomDiff;
        const mutations = domDiff.compareTrees(oldNode, newNode);
    
        expect(mutations).toHaveLength(1);
        expect(mutations[0].type).toBe('childList');
        expect(mutations[0].addedNodes).toContain(newChild);
        
      });

      it('identifies a changed child text content', () => {
        const oldNode = document.createElement('div');
        const newNode = document.createElement('div');
        const newChild = document.createElement('span'); 
        newChild.textContent = 'New';
        newNode.appendChild(newChild);
        const newChildOld = document.createElement('span'); 
        newChildOld.textContent = 'Old';
        oldNode.appendChild(newChildOld);
    
        const domDiff = DomDiff;
        const mutations = domDiff.compareTrees(oldNode, newNode);
    
        expect(mutations).toHaveLength(1);
        expect(mutations[0].type).toBe('characterData');
        expect(mutations[0].newTextContent).toBe('New');
        
      });

      it('identifies no changes', () => {
        const oldNode = document.createElement('div');
        const newNode = document.createElement('div');
        const newChild = document.createElement('span'); 
        newChild.textContent = 'Text';
        newNode.appendChild(newChild);
        const newChildOld = document.createElement('span'); 
        newChildOld.textContent = 'Text';
        oldNode.appendChild(newChildOld);
    
        const domDiff = DomDiff;
        const mutations = domDiff.compareTrees(oldNode, newNode);
    
        expect(mutations).toHaveLength(0);
        
      });
  
    it('identifies removed child nodes', () => {
      const oldNode = document.createElement('div');
      const removedChild = document.createElement('span'); 
      oldNode.appendChild(removedChild);
      const newNode = document.createElement('div');
  
      const domDiff = DomDiff;
      const mutations = domDiff.compareTrees(oldNode, newNode);
  
      expect(mutations).toHaveLength(1);
      expect(mutations[0].type).toBe('childList');
      expect(mutations[0].removedNodes).toContain(removedChild);
      
    });
  
    
  });