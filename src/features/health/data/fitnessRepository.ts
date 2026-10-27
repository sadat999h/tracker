import { isNull } from 'drizzle-orm';
import { getDb } from '@/db/client';
import { exercises, focusSessions } from '@/db/schema';
import { uuid } from '@/lib/ids';

export async function getExercises() {
  const db = getDb();
  const list = await db.select().from(exercises).where(isNull(exercises.deletedAt));
  return list;
}

export async function logFocusSession(
  category: string,
  plannedMin: number,
  actualMin: number,
  diverts: number,
  deliverable: string,
) {
  const db = getDb();
  const now = Date.now();
  await db.insert(focusSessions).values({
    id: uuid(),
    category,
    startedAt: new Date(now - actualMin * 60_000),
    endedAt: new Date(now),
    plannedMin,
    actualMin,
    diverts,
    deliverable,
    completed: true,
    createdAt: new Date(),
  });
}
