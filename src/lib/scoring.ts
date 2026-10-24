export function calculateConsistency(completed: number, planned: number): number {
  if (planned <= 0) return 0;
  return Math.round(Math.max(0, Math.min(completed / planned, 1)) * 100);
}

export function calculateStreak(dailyCompletionRates: number[], thresholdPercent = 70): number {
  let streak = 0;
  // Evaluate from most recent backwards
  for (let i = dailyCompletionRates.length - 1; i >= 0; i--) {
    const rate = dailyCompletionRates[i];
    if (rate !== undefined && rate >= thresholdPercent) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
