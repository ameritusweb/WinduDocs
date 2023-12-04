import { vi } from "vitest";
import { skipUntil } from ".";
import { cleanup } from "../../utils/test-utils";

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('skip-until', () => {
    it('skips items in the array until the predicate is true, then yields the rest', () => {
        const mockNodes = [new Text('1'), new Text('2'), new Text('3'), new Text('4')];
    
        
        const predicate = (node: Text) => node.textContent === '3';
    
        
        const result = [];
        for (const item of skipUntil(mockNodes, predicate)) {
          result.push(item);
        }
    
        
        expect(result.map(node => node.textContent)).toEqual(['3', '4']);
      });
  });