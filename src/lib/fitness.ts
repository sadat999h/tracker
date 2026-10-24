export interface SetItem {
  weightKg: number;
  reps: number;
  done: boolean;
}

export function calculateWorkoutVolume(sets: SetItem[]): number {
  return sets.reduce((sum, s) => (s.done ? sum + s.weightKg * s.reps : sum), 0);
}

export function calculateElapsedTimeSeconds(startedAtMs: number, nowMs = Date.now()): number {
  return Math.max(0, Math.floor((nowMs - startedAtMs) / 1000));
}
