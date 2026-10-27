import { migrate } from 'drizzle-orm/expo-sqlite/migrator';
import { openDatabase, getDb } from './client';
import { settings, modules, targets, metricDefs } from './schema';

// SQL inlined as a string — Metro cannot resolve .sql imports without a custom transformer.
// This string must stay in sync with src/db/migrations/0000_phase_zero.sql.
const migration0000 = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS \`profile\` (
  \`id\`         TEXT PRIMARY KEY NOT NULL,
  \`name\`       TEXT NOT NULL,
  \`avatar_uri\` TEXT,
  \`created_at\` INTEGER NOT NULL,
  \`deleted_at\` INTEGER
);

CREATE TABLE IF NOT EXISTS \`settings\` (
  \`key\`        TEXT PRIMARY KEY NOT NULL,
  \`value_json\` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS \`modules\` (
  \`key\`         TEXT PRIMARY KEY NOT NULL,
  \`enabled\`     INTEGER NOT NULL,
  \`sort_order\`  INTEGER NOT NULL,
  \`config_json\` TEXT
);

CREATE TABLE IF NOT EXISTS \`targets\` (
  \`key\`   TEXT PRIMARY KEY NOT NULL,
  \`value\` REAL NOT NULL,
  \`unit\`  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS \`metric_defs\` (
  \`id\`               TEXT PRIMARY KEY NOT NULL,
  \`key\`              TEXT NOT NULL UNIQUE,
  \`label\`            TEXT NOT NULL,
  \`unit\`             TEXT NOT NULL,
  \`kind\`             TEXT NOT NULL,
  \`module_key\`       TEXT NOT NULL,
  \`target\`           REAL,
  \`higher_is_better\` INTEGER,
  \`is_custom\`        INTEGER NOT NULL DEFAULT 0,
  \`created_at\`       INTEGER NOT NULL,
  \`deleted_at\`       INTEGER
);

CREATE TABLE IF NOT EXISTS \`entries\` (
  \`id\`         TEXT PRIMARY KEY NOT NULL,
  \`metric_id\`  TEXT NOT NULL REFERENCES \`metric_defs\`(\`id\`),
  \`ts\`         INTEGER NOT NULL,
  \`day\`        TEXT NOT NULL,
  \`value_num\`  REAL,
  \`value_text\` TEXT,
  \`meta_json\`  TEXT,
  \`created_at\` INTEGER NOT NULL,
  \`deleted_at\` INTEGER
);

CREATE TABLE IF NOT EXISTS \`medications\` (
  \`id\`            TEXT PRIMARY KEY NOT NULL,
  \`name\`          TEXT NOT NULL,
  \`dose_text\`     TEXT,
  \`notes\`         TEXT,
  \`schedule_json\` TEXT NOT NULL,
  \`active\`        INTEGER NOT NULL,
  \`created_at\`    INTEGER NOT NULL,
  \`deleted_at\`    INTEGER
);

CREATE TABLE IF NOT EXISTS \`medication_logs\` (
  \`id\`             TEXT PRIMARY KEY NOT NULL,
  \`med_id\`         TEXT NOT NULL REFERENCES \`medications\`(\`id\`),
  \`scheduled_for\`  INTEGER NOT NULL,
  \`status\`         TEXT NOT NULL CHECK (\`status\` IN ('taken','skipped','missed')),
  \`logged_at\`      INTEGER,
  \`created_at\`     INTEGER NOT NULL,
  \`deleted_at\`     INTEGER
);

CREATE TABLE IF NOT EXISTS \`sleep_logs\` (
  \`id\`           TEXT PRIMARY KEY NOT NULL,
  \`day\`          TEXT NOT NULL,
  \`bed_ts\`       INTEGER NOT NULL,
  \`wake_ts\`      INTEGER NOT NULL,
  \`quality_1_10\` INTEGER,
  \`notes\`        TEXT,
  \`created_at\`   INTEGER NOT NULL,
  \`deleted_at\`   INTEGER
);

CREATE TABLE IF NOT EXISTS \`workouts\` (
  \`id\`         TEXT PRIMARY KEY NOT NULL,
  \`name\`       TEXT NOT NULL,
  \`started_at\` INTEGER NOT NULL,
  \`ended_at\`   INTEGER,
  \`notes\`      TEXT,
  \`created_at\` INTEGER NOT NULL,
  \`deleted_at\` INTEGER
);

CREATE TABLE IF NOT EXISTS \`exercises\` (
  \`id\`           TEXT PRIMARY KEY NOT NULL,
  \`name\`         TEXT NOT NULL,
  \`muscle_group\` TEXT,
  \`is_custom\`    INTEGER NOT NULL DEFAULT 0,
  \`created_at\`   INTEGER NOT NULL,
  \`deleted_at\`   INTEGER
);

CREATE TABLE IF NOT EXISTS \`workout_exercises\` (
  \`id\`          TEXT PRIMARY KEY NOT NULL,
  \`workout_id\`  TEXT NOT NULL REFERENCES \`workouts\`(\`id\`),
  \`exercise_id\` TEXT NOT NULL REFERENCES \`exercises\`(\`id\`),
  \`position\`    INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS \`sets\` (
  \`id\`                  TEXT PRIMARY KEY NOT NULL,
  \`workout_exercise_id\` TEXT NOT NULL REFERENCES \`workout_exercises\`(\`id\`),
  \`set_no\`              INTEGER NOT NULL,
  \`weight_kg\`           REAL NOT NULL,
  \`reps\`                INTEGER NOT NULL,
  \`rpe\`                 REAL,
  \`done\`                INTEGER NOT NULL DEFAULT 0,
  \`created_at\`          INTEGER NOT NULL,
  \`deleted_at\`          INTEGER
);

CREATE TABLE IF NOT EXISTS \`focus_sessions\` (
  \`id\`          TEXT PRIMARY KEY NOT NULL,
  \`category\`    TEXT NOT NULL,
  \`started_at\`  INTEGER NOT NULL,
  \`ended_at\`    INTEGER,
  \`planned_min\` INTEGER,
  \`actual_min\`  INTEGER,
  \`diverts\`     INTEGER NOT NULL DEFAULT 0,
  \`deliverable\` TEXT,
  \`completed\`   INTEGER NOT NULL DEFAULT 0,
  \`created_at\`  INTEGER NOT NULL,
  \`deleted_at\`  INTEGER
);

CREATE TABLE IF NOT EXISTS \`habits\` (
  \`id\`            TEXT PRIMARY KEY NOT NULL,
  \`name\`          TEXT NOT NULL,
  \`subtitle\`      TEXT,
  \`type\`          TEXT NOT NULL CHECK (\`type\` IN ('check','count','negative')),
  \`target_num\`    REAL,
  \`unit\`          TEXT,
  \`schedule_json\` TEXT NOT NULL,
  \`active\`        INTEGER NOT NULL,
  \`sort_order\`    INTEGER NOT NULL,
  \`created_at\`    INTEGER NOT NULL,
  \`deleted_at\`    INTEGER
);

CREATE TABLE IF NOT EXISTS \`habit_logs\` (
  \`id\`         TEXT PRIMARY KEY NOT NULL,
  \`habit_id\`   TEXT NOT NULL REFERENCES \`habits\`(\`id\`),
  \`day\`        TEXT NOT NULL,
  \`value_num\`  REAL,
  \`done\`       INTEGER NOT NULL,
  \`created_at\` INTEGER NOT NULL,
  \`deleted_at\` INTEGER,
  UNIQUE (\`habit_id\`, \`day\`)
);

CREATE TABLE IF NOT EXISTS \`reminders\` (
  \`id\`            TEXT PRIMARY KEY NOT NULL,
  \`kind\`          TEXT NOT NULL,
  \`ref_id\`        TEXT,
  \`schedule_json\` TEXT NOT NULL,
  \`enabled\`       INTEGER NOT NULL,
  \`created_at\`    INTEGER NOT NULL,
  \`deleted_at\`    INTEGER
);

CREATE TABLE IF NOT EXISTS \`notifications\` (
  \`id\`          TEXT PRIMARY KEY NOT NULL,
  \`kind\`        TEXT NOT NULL,
  \`title\`       TEXT NOT NULL,
  \`body\`        TEXT NOT NULL,
  \`ts\`          INTEGER NOT NULL,
  \`resolved\`    INTEGER NOT NULL DEFAULT 0,
  \`action_json\` TEXT,
  \`created_at\`  INTEGER NOT NULL,
  \`deleted_at\`  INTEGER
);

CREATE TABLE IF NOT EXISTS \`ai_messages\` (
  \`id\`          TEXT PRIMARY KEY NOT NULL,
  \`role\`        TEXT NOT NULL CHECK (\`role\` IN ('user','assistant')),
  \`content\`     TEXT NOT NULL,
  \`report_json\` TEXT,
  \`ts\`          INTEGER NOT NULL,
  \`created_at\`  INTEGER NOT NULL,
  \`deleted_at\`  INTEGER
);
`;

const migrationConfig = {
  journal: {
    entries: [
      {
        idx: 0,
        version: '7',
        when: 1730000000000,
        tag: '0000_phase_zero',
        breakpoints: false,
      },
    ],
  },
  migrations: {
    m0000: migration0000,
  },
};

/**
 * Run forward-only SQL migrations then seed real default data.
 * Called once from the Bootstrap gate in the root layout.
 * Never throws silently — the caller shows an error screen on failure.
 */
export async function runBootstrap(): Promise<void> {
  const db = await openDatabase();
  await migrate(db, migrationConfig);
  await seedDefaults();
}

async function seedDefaults(): Promise<void> {
  const db = getDb();
  const now = Date.now();

  // ── Settings ──────────────────────────────────────────────────────────────
  const defaultSettings: Array<{ key: string; valueJson: string }> = [
    { key: 'unit_system', valueJson: '"metric"' },
    { key: 'onboarding_complete', valueJson: 'false' },
    { key: 'ai_enabled', valueJson: 'false' },
    { key: 'ai_model', valueJson: 'null' },
    { key: 'ai_privacy_accepted', valueJson: 'false' },
  ];
  for (const s of defaultSettings) {
    await db.insert(settings).values(s).onConflictDoNothing();
  }

  // ── Modules ───────────────────────────────────────────────────────────────
  const defaultModules: Array<{ key: string; enabled: boolean; sortOrder: number }> = [
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
  type MetricDefInsert = typeof metricDefs.$inferInsert;
  const defaultMetricDefs: MetricDefInsert[] = [
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
      createdAt: new Date(now),
    },
    {
      id: 'md_weight',
      key: 'weight',
      label: 'Weight',
      unit: 'kg',
      kind: 'snapshot',
      moduleKey: 'weight',
      isCustom: false,
      createdAt: new Date(now),
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
      createdAt: new Date(now),
    },
  ];
  for (const m of defaultMetricDefs) {
    await db.insert(metricDefs).values(m).onConflictDoNothing();
  }
}
