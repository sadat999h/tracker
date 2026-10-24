-- DAYMARK Phase 0 schema baseline. Generated migrations will replace this hand-authored
-- initial snapshot once Drizzle generation runs in the configured project environment.
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY NOT NULL, value_json TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS modules (key TEXT PRIMARY KEY NOT NULL, enabled INTEGER NOT NULL, sort_order INTEGER NOT NULL, config_json TEXT);
CREATE TABLE IF NOT EXISTS targets (key TEXT PRIMARY KEY NOT NULL, value INTEGER NOT NULL, unit TEXT NOT NULL);
