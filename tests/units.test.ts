import { describe, expect, it } from 'vitest';
import { formatDurationMinutes, getLocalDateString } from '@/lib/dates';
import { kgToLb, mlToFlOz } from '@/lib/units';

describe('canonical units and dates', () => {
  it('converts weight and volume correctly', () => {
    expect(kgToLb(76.4)).toBe(168.4);
    expect(mlToFlOz(3000)).toBe(101.4);
  });

  it('formats local date strings and durations', () => {
    expect(getLocalDateString(new Date(2026, 9, 24))).toBe('2026-10-24');
    expect(formatDurationMinutes(135)).toBe('2h 15m');
  });
});
