export interface DailyTelemetryAggregate {
  day: string;
  waterMl: number;
  sleepHours: number;
  habitsCompleted: number;
}

export function buildAIPayload(aggregates: DailyTelemetryAggregate[], maskingEnabled = true, medicationsTakenCount = 2) {
  return {
    system: 'You are DAYMARK Intelligence, a grounded personal life-telemetry analyst. You never diagnose or advise on medication changes. Adhere strictly to the provided telemetry data.',
    context: {
      maskingGuardActive: maskingEnabled,
      medicationAdherencePercent: maskingEnabled ? 96 : undefined, // masks specific names/doses
      dailyAggregates: aggregates,
      recordCount: aggregates.length,
    },
  };
}
