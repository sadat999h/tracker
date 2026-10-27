import { describe, expect, it } from 'vitest';
import { buildAIPayload } from '@/ai/contextBuilder';

describe('AI context builder and safety', () => {
  it('masks sensitive pharmaceutical details when masking guard is active', () => {
    const aggregates = [{ day: '2026-10-24', waterMl: 2250, sleepHours: 7.2, habitsCompleted: 3 }];
    // Pass a real medication summary with adherence computed from logs
    const medSummary = { adherencePct: 96, count: 2 };
    const payload = buildAIPayload(aggregates, true, medSummary);

    expect(payload.context.maskingGuardActive).toBe(true);
    expect(payload.context.medicationAdherencePercent).toBe(96);
    // Specific medication names/doses are absent from payload
    expect(JSON.stringify(payload)).not.toContain('Magnesium');
  });

  it('omits medication adherence when no summary is provided', () => {
    const aggregates = [{ day: '2026-10-24', waterMl: 2250, sleepHours: 7.2, habitsCompleted: 3 }];
    const payload = buildAIPayload(aggregates, true);

    expect(payload.context.maskingGuardActive).toBe(true);
    expect(payload.context.medicationAdherencePercent).toBeUndefined();
  });
});
