import { eq, isNull } from 'drizzle-orm';
import { getDb } from '@/db/client';
import { entries, metricDefs } from '@/db/schema';

export async function getMetricHistory(metricKey: string) {
  const db = getDb();
  const { and } = await import('drizzle-orm');
  const [def] = await db
    .select()
    .from(metricDefs)
    .where(and(eq(metricDefs.key, metricKey), isNull(metricDefs.deletedAt)));
  if (!def) return [];
  return db
    .select()
    .from(entries)
    .where(and(eq(entries.metricId, def.id), isNull(entries.deletedAt)));
}

export async function softDeleteEntry(entryId: string) {
  const db = getDb();
  await db
    .update(entries)
    .set({ deletedAt: new Date() })
    .where(eq(entries.id, entryId));
}

/** @deprecated Use softDeleteEntry. Hard delete is only for dev tooling. */
export async function deleteEntry(entryId: string) {
  return softDeleteEntry(entryId);
}
