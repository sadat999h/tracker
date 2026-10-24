import { db } from '@/db/client';
import { modules, settings, targets } from '@/db/schema';

export async function initializeDefaults(): Promise<void> {
  // Ensure default settings exist
  await db.insert(settings).values([
    { key: 'unit_system', valueJson: JSON.stringify('metric') },
    { key: 'clock_format', valueJson: JSON.stringify('24h') },
    { key: 'masking_enabled', valueJson: JSON.stringify(true) },
  ]).onConflictDoNothing();

  await db.insert(targets).values([
    { key: 'water_ml', value: 3000, unit: 'ml' },
    { key: 'sleep_hours', value: 8, unit: 'h' },
    { key: 'target_weight', value: 75.0, unit: 'kg' },
  ]).onConflictDoNothing();

  await db.insert(modules).values([
    { key: 'hydration', enabled: true, sortOrder: 1 },
    { key: 'medication', enabled: true, sortOrder: 2 },
    { key: 'weight', enabled: true, sortOrder: 3 },
    { key: 'sleep', enabled: true, sortOrder: 4 },
    { key: 'habits', enabled: true, sortOrder: 5 },
  ]).onConflictDoNothing();
}
