import { describe, expect, it } from 'vitest';
import { calculateConsistency, calculateStreak } from '@/lib/scoring';

describe('scoring and streaks', () => {
  it('calculates consistency percentage correctly', () => {
    expect(calculateConsistency(11, 14)).toBe(79);
    expect(calculateConsistency(0, 0)).toBe(0);
  });

  it('calculates consecutive streak days', () => {
    const rates = [80, 50, 90, 85, 75];
    expect(calculateStreak(rates, 70)).toBe(3); // last 3 days >= 70%
  });
});
