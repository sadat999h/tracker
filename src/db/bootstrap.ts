import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './migrations/meta/_journal.json';
import { openDatabase, getDb } from './client';
import { settings, modules, targets, metricDefs } from './schema';
import { uuid } from '@/lib/ids';

/**
 * Run forward-only SQL migrations, then seed real default data.
 * Called once from the Bootstrap gate in the root layout.
 * Never throws silently — let the caller show an error screen.
 */
export async function runBootstrap(): Promise<void> {
  const db = await openDatabase();

  // Run pending migrations (drizzle-orm/expo-sqlite/migrator is idempotent)
  await migrate(db, migrations);

  await seedDefaults(db);
}

type Db = ReturnType<typeof getDb>;

async function seedDefaults(db: Db): Promise<void> {
  // Use INSERT OR IGNORE so re-runs are safe
  const now = Date.now();

  // ── Settings ─────────────────────────────────────────────────────────────
  const defaultSettings: Array<{ key: string; valueJson: string }> = [
    { key: 'unit_system', valueJson: '"metric"' },
    { key: 'onboarding_complete', valueJson: 'false' },
    { key: 'ai_enabled', valueJson: 'false' },
    { key: 'ai_model', valueJson: 'null' },
    { key: 'ai_privacy_accepted', valueJson: 'false' },
  ];
  for (const s of defaultSettings) {
    await db
      .insert(settings)
      .values(s)
      .onConflictDoNothing();
  }

  // ── Modules ──────────────────────────────────────────────────────────────
  const defaultModules: Array<{
    key: string;
    enabled: boolean;
    sortOrder: number;
  }> = [
    { key: 'water', enabled: true, sortOrder: 0 },
    { key: 'sleep', enabled: true, sortOrder: 1 },
    { key: 'weight', enabled: true, sortOrder: 2 },
    { key: 'mood', enabled: true, sortOrder: 3 },
    { key: 'habits', enabled: true, sortOrder: 4 },
    { key: 'medications', enabled: false, sortOrder: 5 },
    { key: 'workouts', enabled: false, sortOrder: 6 },
    { key: 'focus', enabled: false, sortOrder: 7 },
  ];
  for (const m of defaultModules) {
    await db.insert(modules).values(m).onConflictDoNothing();
  }

  // ── Targets ───────────────────────────────────────────────────────────────
  const defaultTargets: Array<{ key: string; value: number; unit: string }> = [
    { key: 'water_daily_ml', value: 2500, unit: 'ml' },
    { key: 'sleep_hours', value: 8, unit: 'h' },
    { key: 'focus_daily_min', value: 120, unit: 'min' },
  ];
  for (const t of defaultTargets) {
    await db.insert(targets).values(t).onConflictDoNothing();
  }

  // ── Metric defs ───────────────────────────────────────────────────────────
  // These are the well-known keys the app references by key (not by UUID).
  const defaultMetricDefs: Array<{
    id: string;
    key: string;
    label: string;
    unit: string;
    kind: string;
    moduleKey: string;
    target?: number;
    higherIsBetter?: boolean;
    isCustom: boolean;
  }> = [
    {
      id: 'md_water',
      key: 'water',
      label: 'Water',
      unit: 'ml',
      kind: 'cumulative',
      moduleKey: 'water',
      target: 2500,
      higherIsBetter: true,
      isCustom: false,
    },
    {
      id: 'md_weight',
      key: 'weight',
      label: 'Weight',
      unit: 'kg',
      kind: 'snapshot',
      moduleKey: 'weight',
      higherIsBetter: undefined,
      isCustom: false,
    },
    {
      id: 'md_mood',
      key: 'mood',
      label: 'Mood',
      unit: '/10',
      kind: 'snapshot',
      moduleKey: 'mood',
      higherIsBetter: true,
      isCustom: false,
    },
  ];
  for (const m of defaultMetricDefs) {
    await db
      .insert(metricDefs)
      .values({ ...m, createdAt: new Date(now) })
      .onConflictDoNothing();
  }
}
