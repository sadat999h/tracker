import { describe, expect, it } from 'vitest';
import { calculatePearsonCorrelation } from '@/lib/stats';

describe('statistical correlations', () => {
  it('guards against small sample sizes (n < 14)', () => {
    const x = [1, 2, 3, 4, 5];
    const y = [2, 4, 6, 8, 10];
    const result = calculatePearsonCorrelation(x, y);
    expect(result.reliable).toBe(false);
    expect(result.n).toBe(5);
  });

  it('calculates Pearson r for n >= 14', () => {
    const x = Array.from({ length: 15 }, (_, i) => i);
    const y = Array.from({ length: 15 }, (_, i) => i * 2);
    const result = calculatePearsonCorrelation(x, y);
    expect(result.reliable).toBe(true);
    expect(result.r).toBe(1);
  });
});
