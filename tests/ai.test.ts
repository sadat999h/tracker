import { describe, expect, it } from 'vitest';
import { buildAIPayload } from '@/ai/contextBuilder';

describe('AI context builder and safety', () => {
  it('masks sensitive pharmaceutical details when masking guard is active', () => {
    const payload = buildAIPayload([{ day: '2026-10-24', waterMl: 2250, sleepHours: 7.2, habitsCompleted: 3 }], true);
    expect(payload.context.maskingGuardActive).toBe(true);
    expect(payload.context.medicationAdherencePercent).toBe(96);
    // Specific medication names/doses are absent from payload
    expect(JSON.stringify(payload)).not.toContain('Magnesium');
  });
});
