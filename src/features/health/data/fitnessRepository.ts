import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { exercises, focusSessions, sets, workoutExercises, workouts } from '@/db/schema';

export async function getExercises() {
  const list = await db.select().from(exercises);
  if (list.length === 0) {
    // Seed default exercises if empty
    await db.insert(exercises).values([
      { id: 'ex_bench', name: 'Bench Press (Barbell)', muscleGroup: 'Chest' },
      { id: 'ex_squat', name: 'Squat (Barbell)', muscleGroup: 'Legs' },
      { id: 'ex_row', name: 'Barbell Row', muscleGroup: 'Back' },
    ]).onConflictDoNothing();
    return await db.select().from(exercises);
  }
  return list;
}

export async function logFocusSession(category: string, plannedMin: number, actualMin: number, diverts: number, deliverable: string) {
  await db.insert(focusSessions).values({
    id: `focus_${Date.now()}`,
    category,
    startedAt: new Date(Date.now() - actualMin * 60000),
    endedAt: new Date(),
    plannedMin,
    actualMin,
    diverts,
    deliverable,
    completed: true,
    createdAt: new Date(),
  });
}
