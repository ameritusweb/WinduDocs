import { vi } from 'vitest';
import { cleanup } from '../../utils/test-utils'
import { findClosestAncestor } from '.';

afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

describe('find-closest-ancestor', () => {
it('finds the closest ancestor with the specified id', () => {
    
    document.body.innerHTML = `
      <div id="ancestor">
        <div id="parent">
          <div id="target"></div>
        </div>
      </div>
    `;

    const target = document.getElementById('target');
    expect(target).not.toBe(null);

    const ancestor = findClosestAncestor(target!, 'ancestor');

    expect(ancestor).not.toBe(null);
    expect(ancestor!.id).toBe('parent');
  });

  it('returns undefined if no ancestor with the specified id is found', () => {
    const target = document.getElementById('target');
    expect(target).not.toBe(null);

    const ancestor = findClosestAncestor(target!, 'non-existent-id');

    expect(ancestor).toBeUndefined();
  });
});