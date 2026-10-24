import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { entries, habitLogs, habits, medicationLogs, medications, profiles, settings, sleepLogs, targets } from '@/db/schema';
import { getLocalDateString } from '@/lib/dates';

export async function getProfile() {
  const [profile] = await db.select().from(profiles).limit(1);
  return profile ?? null;
}

export async function saveProfile(name: string) {
  const id = 'user_profile_1';
  const existing = await getProfile();
  if (existing) {
    await db.update(profiles).set({ name }).where(eq(profiles.id, id));
  } else {
    await db.insert(profiles).values({ id, name, createdAt: new Date() });
  }
}

export async function getWaterToday(day = getLocalDateString()) {
  const allEntries = await db.select().from(entries).where(eq(entries.day, day));
  return allEntries.reduce((sum, e) => sum + (e.valueNum ?? 0), 0);
}

export async function logWaterEntry(amountMl: number, day = getLocalDateString()) {
  await db.insert(entries).values({
    id: `water_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    metricId: 'hydration',
    ts: new Date(),
    day,
    valueNum: amountMl,
    createdAt: new Date(),
  });
}

export async function getHabitsForToday(day = getLocalDateString()) {
  const activeHabits = await db.select().from(habits).where(eq(habits.active, true));
  const logs = await db.select().from(habitLogs).where(eq(habitLogs.day, day));
  const logMap = new Map(logs.map((l) => [l.habitId, l]));

  return activeHabits.map((habit) => ({
    habit,
    log: logMap.get(habit.id) ?? null,
  }));
}

export async function toggleHabitLog(habitId: string, done: boolean, valueNum?: number, day = getLocalDateString()) {
  const logs = await db.select().from(habitLogs).where(eq(habitLogs.habitId, habitId));
  const existing = logs.find((l) => l.day === day);

  if (existing) {
    await db.update(habitLogs).set({ done, valueNum: valueNum ?? existing.valueNum }).where(eq(habitLogs.id, existing.id));
  } else {
    await db.insert(habitLogs).values({
      id: `habitlog_${Date.now()}`,
      habitId,
      day,
      done,
      valueNum: valueNum ?? null,
      createdAt: new Date(),
    });
  }
}

export async function getMedications() {
  return await db.select().from(medications).where(eq(medications.active, true));
}

export async function logMedicationDose(medId: string, status: 'taken' | 'skipped', scheduledFor = new Date()) {
  await db.insert(medicationLogs).values({
    id: `medlog_${Date.now()}`,
    medId,
    scheduledFor,
    status,
    loggedAt: new Date(),
    createdAt: new Date(),
  });
}
