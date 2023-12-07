import { SpyInstance, vi } from "vitest";
import { getType, safeMatch, selectText, selectTextRange } from "./test-utils";

describe('testUtils', () => {

    let consoleWarnSpy: SpyInstance;

    beforeEach(() => {
        // Set up our document body
        document.body.innerHTML = `
          <div id="startId">
            <span>Start text node</span>
          </div>
          <div id="endId">
            <span>End text node</span>
          </div>
        `;

        // Mock console.warn
        consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {  });
      });

    afterEach(() => {
        // Restore console.warn
        consoleWarnSpy.mockRestore();
    });

    it('safeMatch, returns true for two identical simple objects', () => {
        const match = safeMatch(['key1', 'key2']);
        const obj1 = { key1: 'value1', key2: 'value2' };
        const obj2 = { key1: 'value1', key2: 'value2' };
        expect(match(obj1, obj2)).toBe(true);
    });

    it('safeMatch, returns false for two different simple objects', () => {
        const match = safeMatch(['key1', 'key2']);
        const obj1 = { key1: 'value1', key2: 'value2' };
        const obj2 = { key1: 'value3', key2: 'value4' };
        expect(match(obj1, obj2)).toBe(false);
    });

    it('safeMatch, returns true for two identical complex objects', () => {
        const match = safeMatch(['key1', 'Children']);
        const obj1 = { key1: 'value1', Children: [{ key1: 'value2' }] };
        const obj2 = { key1: 'value1', Children: [{ key1: 'value2' }] };
        expect(match(obj1, obj2)).toBe(true);
    });

    it('safeMatch, returns false for two different complex objects', () => {
        const match = safeMatch(['key1', 'Children']);
        const obj1 = { key1: 'value1', Children: [{ key1: 'value2' }] };
        const obj2 = { key1: 'value1', Children: [{ key1: 'value3' }] };
        expect(match(obj1, obj2)).toBe(false);
    });
    
      it('throws error when start parent id does not exist', () => {
        expect(() => selectTextRange('nonexistentId', 'endId', 0, 0, 0, 0)).toThrow();
      });
    
      it('throws error when end parent id does not exist', () => {
        expect(() => selectTextRange('startId', 'nonexistentId', 0, 0, 0, 0)).toThrow();
      });
    
      it('throws error when no text node is found in the start parent element', () => {
        expect(() => selectTextRange('startId', 'endId', 1, 0, 0, 0)).toThrow();
      });
    
      it('throws error when no text node is found in the end parent element', () => {
        expect(() => selectTextRange('startId', 'endId', 0, 1, 0, 0)).toThrow();
      });
    
      it('throws error when text nodes have no text content', () => {
        document.body.innerHTML = `
          <div id="startId"></div>
          <div id="endId"></div>
        `;
    
        expect(() => selectTextRange('startId', 'endId', 0, 0, 0, 0)).toThrow();
      });

      it('selectText, throws error when text nodes have no text content', () => {
        document.body.innerHTML = `
          <div id="startId"><span></span></div>
          <div id="endId"><span></span></div>
        `;
    
        expect(() => selectText('startId', 0, 0)).toThrow();
      });

      it('selectText, throws error when range is out of bounds', () => {
        document.body.innerHTML = `
          <div id="startId">Text</div>
          <div id="endId">Span</div>
        `;
    
        expect(() => selectText('startId', 0, 100)).toThrow();
      });
    
      it('throws error when the range is out of bounds', () => {
        expect(() => selectTextRange('startId', 'endId', 0, 0, 100, 100)).toThrow();
      });

      it('getType, returns "array" for arrays', () => {
        expect(getType([])).toEqual('array');
        expect(getType([1, 2, 3])).toEqual('array');
      });
    
      it('getType, returns "null" for null', () => {
        expect(getType(null)).toEqual('null');
      });
    
      it('getType, returns "undefined" for undefined', () => {
        expect(getType(undefined)).toEqual('undefined');
      });
    
      it('getType, returns "object" for objects', () => {
        expect(getType({})).toEqual('object');
        expect(getType({ a: 1 })).toEqual('object');
      });
    
      it('getType, returns "string" for strings', () => {
        expect(getType('')).toEqual('string');
        expect(getType('abc')).toEqual('string');
      });
    
      it('getType, returns "number" for numbers', () => {
        expect(getType(0)).toEqual('number');
        expect(getType(123)).toEqual('number');
      });
    
      it('getType, returns "boolean" for booleans', () => {
        expect(getType(true)).toEqual('boolean');
        expect(getType(false)).toEqual('boolean');
      });
    
      it('getType, returns "function" for functions', () => {
        expect(getType(() => {})).toEqual('function');
        expect(getType(function() {})).toEqual('function');
      });

});