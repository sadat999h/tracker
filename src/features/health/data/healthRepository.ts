import { eq, isNull } from 'drizzle-orm';
import { getDb } from '@/db/client';
import {
  entries,
  habitLogs,
  habits,
  medicationLogs,
  medications,
  profiles,
  settings,
  targets,
} from '@/db/schema';
import { getLocalDateString } from '@/lib/dates';
import { uuid } from '@/lib/ids';

export async function getProfile() {
  const db = getDb();
  const [profile] = await db
    .select()
    .from(profiles)
    .where(isNull(profiles.deletedAt))
    .limit(1);
  return profile ?? null;
}

export async function getWaterToday(day = getLocalDateString()): Promise<number> {
  const db = getDb();
  // Only sum entries for the water metric (md_water), not all entries for the day
  const rows = await db
    .select({ valueNum: entries.valueNum })
    .from(entries)
    .where(eq(entries.metricId, 'md_water'))
    // also filter by day
    ;
  const dayRows = rows.filter((r) => {
    // We need to re-query with day filter — do it properly
    return true; // placeholder; real filter below
  });
  // Re-query properly with both conditions
  const { and } = await import('drizzle-orm');
  const dayEntries = await db
    .select({ valueNum: entries.valueNum })
    .from(entries)
    .where(and(eq(entries.metricId, 'md_water'), eq(entries.day, day), isNull(entries.deletedAt)));
  return dayEntries.reduce((sum, e) => sum + (e.valueNum ?? 0), 0);
}

export async function logWaterEntry(amountMl: number, day = getLocalDateString()) {
  const db = getDb();
  await db.insert(entries).values({
    id: uuid(),
    metricId: 'md_water',
    ts: new Date(),
    day,
    valueNum: amountMl,
    createdAt: new Date(),
  });
}

export async function getHabitsForToday(day = getLocalDateString()) {
  const db = getDb();
  const { and } = await import('drizzle-orm');
  const activeHabits = await db
    .select()
    .from(habits)
    .where(and(eq(habits.active, true), isNull(habits.deletedAt)));
  const logs = await db
    .select()
    .from(habitLogs)
    .where(and(eq(habitLogs.day, day), isNull(habitLogs.deletedAt)));
  const logMap = new Map(logs.map((l) => [l.habitId, l]));

  return activeHabits.map((habit) => ({
    habit,
    log: logMap.get(habit.id) ?? null,
  }));
}

export async function toggleHabitLog(
  habitId: string,
  done: boolean,
  valueNum?: number,
  day = getLocalDateString(),
) {
  const db = getDb();
  const { and } = await import('drizzle-orm');
  const [existing] = await db
    .select()
    .from(habitLogs)
    .where(and(eq(habitLogs.habitId, habitId), eq(habitLogs.day, day), isNull(habitLogs.deletedAt)));

  if (existing) {
    await db
      .update(habitLogs)
      .set({ done, valueNum: valueNum ?? existing.valueNum })
      .where(eq(habitLogs.id, existing.id));
  } else {
    await db.insert(habitLogs).values({
      id: uuid(),
      habitId,
      day,
      done,
      valueNum: valueNum ?? null,
      createdAt: new Date(),
    });
  }
}

export async function getMedications() {
  const db = getDb();
  const { and } = await import('drizzle-orm');
  return db
    .select()
    .from(medications)
    .where(and(eq(medications.active, true), isNull(medications.deletedAt)));
}

export async function logMedicationDose(
  medId: string,
  status: 'taken' | 'skipped',
  scheduledFor = new Date(),
) {
  const db = getDb();
  await db.insert(medicationLogs).values({
    id: uuid(),
    medId,
    scheduledFor,
    status,
    loggedAt: new Date(),
    createdAt: new Date(),
  });
}
