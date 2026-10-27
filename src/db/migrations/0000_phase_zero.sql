-- DAYMARK schema v1 — all tables, forward-only migration
-- Generated from src/db/schema.ts (Drizzle source of truth).
-- Run via drizzle-orm/expo-sqlite/migrator in Bootstrap.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS `profile` (
  `id`         TEXT PRIMARY KEY NOT NULL,
  `name`       TEXT NOT NULL,
  `avatar_uri` TEXT,
  `created_at` INTEGER NOT NULL,
  `deleted_at` INTEGER
);

CREATE TABLE IF NOT EXISTS `settings` (
  `key`        TEXT PRIMARY KEY NOT NULL,
  `value_json` TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `modules` (
  `key`         TEXT PRIMARY KEY NOT NULL,
  `enabled`     INTEGER NOT NULL,
  `sort_order`  INTEGER NOT NULL,
  `config_json` TEXT
);

CREATE TABLE IF NOT EXISTS `targets` (
  `key`   TEXT PRIMARY KEY NOT NULL,
  `value` REAL NOT NULL,
  `unit`  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS `metric_defs` (
  `id`               TEXT PRIMARY KEY NOT NULL,
  `key`              TEXT NOT NULL UNIQUE,
  `label`            TEXT NOT NULL,
  `unit`             TEXT NOT NULL,
  `kind`             TEXT NOT NULL,
  `module_key`       TEXT NOT NULL,
  `target`           REAL,
  `higher_is_better` INTEGER,
  `is_custom`        INTEGER NOT NULL DEFAULT 0,
  `created_at`       INTEGER NOT NULL,
  `deleted_at`       INTEGER
);

CREATE TABLE IF NOT EXISTS `entries` (
  `id`         TEXT PRIMARY KEY NOT NULL,
  `metric_id`  TEXT NOT NULL REFERENCES `metric_defs`(`id`),
  `ts`         INTEGER NOT NULL,
  `day`        TEXT NOT NULL,
  `value_num`  REAL,
  `value_text` TEXT,
  `meta_json`  TEXT,
  `created_at` INTEGER NOT NULL,
  `deleted_at` INTEGER
);

CREATE TABLE IF NOT EXISTS `medications` (
  `id`            TEXT PRIMARY KEY NOT NULL,
  `name`          TEXT NOT NULL,
  `dose_text`     TEXT,
  `notes`         TEXT,
  `schedule_json` TEXT NOT NULL,
  `active`        INTEGER NOT NULL,
  `created_at`    INTEGER NOT NULL,
  `deleted_at`    INTEGER
);

CREATE TABLE IF NOT EXISTS `medication_logs` (
  `id`             TEXT PRIMARY KEY NOT NULL,
  `med_id`         TEXT NOT NULL REFERENCES `medications`(`id`),
  `scheduled_for`  INTEGER NOT NULL,
  `status`         TEXT NOT NULL CHECK (`status` IN ('taken','skipped','missed')),
  `logged_at`      INTEGER,
  `created_at`     INTEGER NOT NULL,
  `deleted_at`     INTEGER
);

CREATE TABLE IF NOT EXISTS `sleep_logs` (
  `id`           TEXT PRIMARY KEY NOT NULL,
  `day`          TEXT NOT NULL,
  `bed_ts`       INTEGER NOT NULL,
  `wake_ts`      INTEGER NOT NULL,
  `quality_1_10` INTEGER,
  `notes`        TEXT,
  `created_at`   INTEGER NOT NULL,
  `deleted_at`   INTEGER
);

CREATE TABLE IF NOT EXISTS `workouts` (
  `id`         TEXT PRIMARY KEY NOT NULL,
  `name`       TEXT NOT NULL,
  `started_at` INTEGER NOT NULL,
  `ended_at`   INTEGER,
  `notes`      TEXT,
  `created_at` INTEGER NOT NULL,
  `deleted_at` INTEGER
);

CREATE TABLE IF NOT EXISTS `exercises` (
  `id`           TEXT PRIMARY KEY NOT NULL,
  `name`         TEXT NOT NULL,
  `muscle_group` TEXT,
  `is_custom`    INTEGER NOT NULL DEFAULT 0,
  `created_at`   INTEGER NOT NULL,
  `deleted_at`   INTEGER
);

CREATE TABLE IF NOT EXISTS `workout_exercises` (
  `id`         TEXT PRIMARY KEY NOT NULL,
  `workout_id` TEXT NOT NULL REFERENCES `workouts`(`id`),
  `exercise_id` TEXT NOT NULL REFERENCES `exercises`(`id`),
  `position`   INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS `sets` (
  `id`                  TEXT PRIMARY KEY NOT NULL,
  `workout_exercise_id` TEXT NOT NULL REFERENCES `workout_exercises`(`id`),
  `set_no`              INTEGER NOT NULL,
  `weight_kg`           REAL NOT NULL,
  `reps`                INTEGER NOT NULL,
  `rpe`                 REAL,
  `done`                INTEGER NOT NULL DEFAULT 0,
  `created_at`          INTEGER NOT NULL,
  `deleted_at`          INTEGER
);

CREATE TABLE IF NOT EXISTS `focus_sessions` (
  `id`           TEXT PRIMARY KEY NOT NULL,
  `category`     TEXT NOT NULL,
  `started_at`   INTEGER NOT NULL,
  `ended_at`     INTEGER,
  `planned_min`  INTEGER,
  `actual_min`   INTEGER,
  `diverts`      INTEGER NOT NULL DEFAULT 0,
  `deliverable`  TEXT,
  `completed`    INTEGER NOT NULL DEFAULT 0,
  `created_at`   INTEGER NOT NULL,
  `deleted_at`   INTEGER
);

CREATE TABLE IF NOT EXISTS `habits` (
  `id`            TEXT PRIMARY KEY NOT NULL,
  `name`          TEXT NOT NULL,
  `subtitle`      TEXT,
  `type`          TEXT NOT NULL CHECK (`type` IN ('check','count','negative')),
  `target_num`    REAL,
  `unit`          TEXT,
  `schedule_json` TEXT NOT NULL,
  `active`        INTEGER NOT NULL,
  `sort_order`    INTEGER NOT NULL,
  `created_at`    INTEGER NOT NULL,
  `deleted_at`    INTEGER
);

CREATE TABLE IF NOT EXISTS `habit_logs` (
  `id`         TEXT PRIMARY KEY NOT NULL,
  `habit_id`   TEXT NOT NULL REFERENCES `habits`(`id`),
  `day`        TEXT NOT NULL,
  `value_num`  REAL,
  `done`       INTEGER NOT NULL,
  `created_at` INTEGER NOT NULL,
  `deleted_at` INTEGER,
  UNIQUE (`habit_id`, `day`)
);

CREATE TABLE IF NOT EXISTS `reminders` (
  `id`            TEXT PRIMARY KEY NOT NULL,
  `kind`          TEXT NOT NULL,
  `ref_id`        TEXT,
  `schedule_json` TEXT NOT NULL,
  `enabled`       INTEGER NOT NULL,
  `created_at`    INTEGER NOT NULL,
  `deleted_at`    INTEGER
);

CREATE TABLE IF NOT EXISTS `notifications` (
  `id`          TEXT PRIMARY KEY NOT NULL,
  `kind`        TEXT NOT NULL,
  `title`       TEXT NOT NULL,
  `body`        TEXT NOT NULL,
  `ts`          INTEGER NOT NULL,
  `resolved`    INTEGER NOT NULL DEFAULT 0,
  `action_json` TEXT,
  `created_at`  INTEGER NOT NULL,
  `deleted_at`  INTEGER
);

CREATE TABLE IF NOT EXISTS `ai_messages` (
  `id`          TEXT PRIMARY KEY NOT NULL,
  `role`        TEXT NOT NULL CHECK (`role` IN ('user','assistant')),
  `content`     TEXT NOT NULL,
  `report_json` TEXT,
  `ts`          INTEGER NOT NULL,
  `created_at`  INTEGER NOT NULL,
  `deleted_at`  INTEGER
);
