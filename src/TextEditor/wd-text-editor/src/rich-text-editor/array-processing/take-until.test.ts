import { vi } from "vitest";
import { takeUntil } from ".";
import { cleanup } from "../../utils/test-utils";

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('take-until', () => {
    it('yields Nodes from the source until the predicate is true', () => {
        
        function* sourceGen() {
          yield new Text('1');
          yield new Text('2');
          yield new Text('3');
          yield new Text('4');
        }
    
        
        const predicate = (node: Text) => node.textContent === '3';
    
        
        const result = [];
        for (const item of takeUntil(sourceGen(), predicate)) {
          result.push(item);
        }
    
        
        expect(result.map(node => node.textContent)).toEqual(['1', '2', '3']);
      });

      it('yields Nodes from the source until the predicate is true even if the predicate is never met', () => {
        
        function* sourceGen() {
          yield new Text('1');
          yield new Text('2');
          yield new Text('3');
          yield new Text('4');
        }
    
        
        const predicate = (node: Text) => node.textContent === '5';
    
        
        const result = [];
        for (const item of takeUntil(sourceGen(), predicate)) {
          result.push(item);
        }
    
        
        expect(result.map(node => node.textContent)).toEqual(['1', '2', '3', '4']);
      });
  });