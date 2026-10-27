/* Development-only seed entrypoint. Never runs in production. */
import { getDb } from '@/db/client';
import { profiles, habits } from '@/db/schema';
import { uuid } from '@/lib/ids';

if (process.env.NODE_ENV === 'production') {
  throw new Error('DAYMARK seed is disabled in production.');
}

export async function seedDatabase() {
  const db = getDb();
  try {
    await db
      .insert(profiles)
      .values({ id: uuid(), name: 'User', createdAt: new Date() })
      .onConflictDoNothing();

    await db
      .insert(habits)
      .values([
        {
          id: uuid(),
          name: 'Morning Routine',
          subtitle: 'Daily cadence',
          type: 'check' as const,
          scheduleJson: '{"days":[1,2,3,4,5,6,7]}',
          active: true,
          sortOrder: 0,
          createdAt: new Date(),
        },
      ])
      .onConflictDoNothing();

    console.info('DAYMARK database seeded.');
  } catch (err) {
    console.error('Seed error:', err);
  }
}

void seedDatabase();
