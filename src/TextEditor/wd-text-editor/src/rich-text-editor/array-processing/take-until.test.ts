import { vi } from "vitest";
import { takeUntil } from ".";
import { cleanup } from "../../utils/test-utils";

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('take-until', () => {
    it('yields Nodes from the source until the predicate is true', () => {
        // Mock Nodes generator
        function* sourceGen() {
          yield new Text('1');
          yield new Text('2');
          yield new Text('3');
          yield new Text('4');
        }
    
        // Predicate function
        const predicate = (node: Text) => node.textContent === '3';
    
        // Collecting items from takeUntil
        const result = [];
        for (const item of takeUntil(sourceGen(), predicate)) {
          result.push(item);
        }
    
        // Check if the yielded values are as expected
        expect(result.map(node => node.textContent)).toEqual(['1', '2', '3']);
      });

      it('yields Nodes from the source until the predicate is true even if the predicate is never met', () => {
        // Mock Nodes generator
        function* sourceGen() {
          yield new Text('1');
          yield new Text('2');
          yield new Text('3');
          yield new Text('4');
        }
    
        // Predicate function
        const predicate = (node: Text) => node.textContent === '5';
    
        // Collecting items from takeUntil
        const result = [];
        for (const item of takeUntil(sourceGen(), predicate)) {
          result.push(item);
        }
    
        // Check if the yielded values are as expected
        expect(result.map(node => node.textContent)).toEqual(['1', '2', '3', '4']);
      });
  });