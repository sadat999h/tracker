/* Development-only seed entrypoint. This must never run in a production build. */
import { db } from '@/db/client';
import { profiles, habits } from '@/db/schema';

if (process.env.NODE_ENV === 'production') {
  throw new Error('DAYMARK seed is disabled in production.');
}

export async function seedDatabase() {
  try {
    // Create default profile
    await db.insert(profiles).values({
      id: 'user_profile_1',
      name: 'User',
      createdAt: new Date(),
    }).onConflictDoNothing();

    // Create default habits
    await db.insert(habits).values([
      {
        id: 'habit_morning_routine',
        name: 'Morning Routine',
        subtitle: 'Daily cadence',
        active: true,
        createdAt: new Date(),
      },
      {
        id: 'habit_exercise',
        name: 'Exercise',
        subtitle: 'Daily cadence',
        active: true,
        createdAt: new Date(),
      },
      {
        id: 'habit_meditation',
        name: 'Meditation',
        subtitle: 'Daily cadence',
        active: true,
        createdAt: new Date(),
      },
    ]).onConflictDoNothing();

    console.info('DAYMARK database seeded successfully.');
  } catch (err) {
    console.error('Seed error:', err);
  }
}

seedDatabase();
