import { describe, expect, it } from 'vitest';
import { calculateWorkoutVolume } from '@/lib/fitness';

describe('fitness calculations', () => {
  it('calculates total volume for completed sets only', () => {
    const sets = [
      { weightKg: 80, reps: 10, done: true },
      { weightKg: 85, reps: 8, done: true },
      { weightKg: 90, reps: 6, done: false },
    ];
    expect(calculateWorkoutVolume(sets)).toBe(80 * 10 + 85 * 8);
  });
});
