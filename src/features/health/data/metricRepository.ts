import { eq } from 'drizzle-orm';
import { db } from '@/db/client';
import { entries, metricDefs } from '@/db/schema';
import { getLocalDateString } from '@/lib/dates';

export async function getMetricHistory(metricKey: string) {
  const [def] = await db.select().from(metricDefs).where(eq(metricDefs.key, metricKey));
  if (!def) return [];
  return await db.select().from(entries).where(eq(entries.metricId, def.id));
}

export async function deleteEntry(entryId: string) {
  await db.delete(entries).where(eq(entries.id, entryId));
}
