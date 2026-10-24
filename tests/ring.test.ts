import { describe, expect, it } from 'vitest';

describe('ring normalization contract', () => {
  const normalize = (value: number, total: number) => Math.max(0, Math.min(value / Math.max(total, 1), 1));

  it('handles zero planned triggers without NaN', () => {
    expect(normalize(0, 0)).toBe(0);
  });

  it('clamps completed triggers to one full ring', () => {
    expect(normalize(20, 14)).toBe(1);
  });
});
