import { vi } from "vitest";
import { processArray } from ".";
import { cleanup } from "../../utils/test-utils";

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });
  
describe('process-array', () => {
    it('processes array by skipping and then taking items based on predicates', () => {
      const mockNodes = [new Text('1'), new Text('2'), new Text('3'), new Text('4'), new Text('5')];
  
      // Start predicate (skip until '2')
      const startPredicate = (node: Text) => node.textContent === '2';
  
      // End predicate (take until '4')
      const endPredicate = (node: Text) => node.textContent === '4';
  
      const result = processArray(mockNodes, startPredicate, endPredicate);
  
      // Expected to process and return ['2', '3', '4']
      expect(result.map(node => node.textContent)).toEqual(['2', '3', '4']);
    });
  });