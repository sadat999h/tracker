# DAYMARK: Product & Technical Plan

Personal life-telemetry app: health, fitness, focus, habits, with an AI analyst on top.
Android-first, dark-only ("Obsidian Telemetry" design system), local-first and private.

---

## 1. What the app is (one paragraph)

Daymark is a single place to log and review your day: water, medication, body weight, sleep, workouts (sets/reps/volume), deep-work and study sessions, and habits. A Home dashboard shows today's progress as one consistency score. Insights turns weeks of logs into trends and correlations. An AI assistant answers questions *only* from the user's own logs. Everything is stored on-device and encrypted; nothing leaves the phone unless the user exports, shares, or asks the AI.

---

## 2. Screens → routes

Design source: `design/stitch_daymark_life_tracker_app/<screen>/{screen.png, code.html}`

| # | Design folder | Route | Purpose |
|---|---|---|---|
| 1 | `daymark_daily_dashboard` | `/(tabs)/home` | Greeting, "Today at a glance" ring (e.g. 11/14 triggers), streak chip, horizontal "Telemetry Sequence" of upcoming items, 2-col metric tiles (Water, Medication, Body Mass, Workout, Study, Deep Work, Sleep, Focus Sprints), Habit Architecture list, FAB (+) |
| 2 | `daymark_universal_tracking_center` | `/(tabs)/track` | Date strip + 4 segments: **Health** (hydration, meds, weight, energy/mood), **Fitness** (active workout, sets table, rest timer, heart zone), **Focus** (timer, pause/finish/divert, deliverable note), **Habits** |
| 3 | `daymark_insights_analytics` | `/(tabs)/insights` | Daily/Weekly/Monthly/30D; KPI tiles; sleep chart vs 8h target; work-vs-study stacked bars; progressive overload line; time allocation bar; correlation scatter with r value; raw dataset drawer |
| 4 | `daymark_ai_life_assistant` | `/(tabs)/assistant` | Chat. Quick prompt chips. Structured "Telemetry Diagnostic" report card (summary, went well, patterns, improve, next steps). Grounding badge ("94 days of logs") |
| 5 | `daymark_profile_settings` | `/(tabs)/profile` | Profile stats, target calibration, units, module toggles, quiet hours, AI prefs, data vault, visual engine |
| 6 | `daymark_notification_reminder_center` | `/notifications` | Quiet-hours banner; tabs Recent Alerts / Cadence Architecture (schedules); alert cards with action buttons |
| 7 | `daymark_social_share_telemetry_export` | `/share` | Share card generator (formats, themes, redaction toggles), CSV/XLSX/JSON export |
| 8 | `daymark_home_screen_widget_gallery` | `/widgets` + native Android widgets | Widget sizes 2x2 / 4x2 / 4x4 and a customizer |
| 9 | `daymark_telemetry_brand_logo` | app icon / splash | Dial logo |

### Screens the design does NOT include (must be added, in the same visual style)
- **Onboarding**: name, units, pick modules, set targets, permissions (notifications, exact alarms), optional biometric lock
- **Add / edit forms**: habit, medication (+ schedule), custom metric, exercise, focus category
- **Sleep logging**: no entry UI exists in Track; add bedtime/wake-time entry (manual first)
- **Workout flow**: start workout → exercise picker → history
- **Empty states, loading states, error states** for every screen
- **History/detail** for each metric (tap a tile → list of logs, edit/delete)
- **AI settings**: API key entry (see §6)

---

## 3. Core concepts (define these once, reuse everywhere)

- **Trigger**: any scheduled item for a given day: a habit, a medication dose, a hydration milestone, a planned workout, a planned focus block, bedtime. "11 / 14 planned triggers" = completed triggers / total triggers for today.
- **Consistency %** (the big ring): `completed triggers / planned triggers` for today. Weekly figure = mean of daily values.
- **Streak**: consecutive days where consistency ≥ threshold (default 70%, user-configurable). The design shows "24 Day Streak" on Home and "94 days" on Profile; treat these as two different numbers: *current streak* and *total days logged*.
- **Habit types**: `check` (done/not done), `count` (progress toward a number, e.g. 10k steps), `negative` (goal is zero occurrences, e.g. "Zero Bedside Screen Time").
- **Module**: a toggleable feature group (Hydration, Medication, Workout, Deep Work, Subjective State, Sleep, Habits, custom). Disabled modules disappear from Home/Track/Insights/AI.
- **Custom telemetry parameter**: user-defined metric (name, unit, type: counter | scalar | duration | rating, daily target). Powered by the same generic entries table as built-ins where possible.

---

## 4. Data model (SQLite, local, encrypted)

All timestamps stored as UTC epoch ms plus a local `day` string (`YYYY-MM-DD`) so "today" is stable across time zones and DST. Soft-delete via `deleted_at`.

```
profile(id, name, avatar_uri, created_at)
settings(key, value_json)                       -- units, quiet hours, haptics, theme, AI prefs
modules(key, enabled, sort_order, config_json)
targets(key, value, unit)                       -- water_ml, sleep_hours, weekly_volume_kg, target_weight, deep_work_h, study_h

metric_defs(id, key, label, unit, kind, module_key, target, higher_is_better, is_custom)
entries(id, metric_id, ts, day, value_num, value_text, meta_json)   -- water, weight, energy, mood, custom metrics

medications(id, name, dose_text, notes, schedule_json, active)
medication_logs(id, med_id, scheduled_for, status['taken'|'skipped'|'missed'], logged_at)

sleep_logs(id, day, bed_ts, wake_ts, quality_1_10, notes)

workouts(id, name, started_at, ended_at, notes)
workout_exercises(id, workout_id, exercise_id, position)
sets(id, workout_exercise_id, set_no, weight_kg, reps, rpe, done)
exercises(id, name, muscle_group, is_custom)

focus_sessions(id, category, started_at, ended_at, planned_min, actual_min, diverts, deliverable, completed)

habits(id, name, subtitle, type, target_num, unit, schedule_json, active, sort_order)
habit_logs(id, habit_id, day, value_num, done)

reminders(id, kind, ref_id, schedule_json, enabled)
notifications(id, kind, title, body, ts, resolved, action_json)

ai_messages(id, role, content, report_json, ts)
```

Store weights internally in **kg** and water in **ml**; convert only at the UI layer (Metric/Imperial setting).

---

## 5. Architecture (recommended)

**Decision: Expo (React Native) + TypeScript.** Rationale: fastest path from these designs, test on a real phone with no Android Studio setup, and the design's Tailwind tokens carry straight over via NativeWind. Trade-off: Android home-screen widgets need a development build plus a native widget library, so they come last. *If widgets and background reliability matter more than iteration speed, use Kotlin + Jetpack Compose + Glance instead*, and tell Claude Code that up front.

| Concern | Choice |
|---|---|
| Framework | Expo SDK (latest stable), expo-router, TypeScript strict |
| Styling | NativeWind (Tailwind), tokens from the design system |
| Fonts | Geist (numbers, labels), Inter (body); `tabular-nums` on all metrics |
| Icons | `@expo/vector-icons` MaterialIcons / MaterialCommunityIcons (nearest match to Material Symbols Outlined) |
| DB | `expo-sqlite` (SQLCipher enabled) + Drizzle ORM + migrations |
| State | Zustand for UI state; DB queries wrapped in hooks; no server cache layer needed |
| Charts | Custom `react-native-svg` components (the designs are simple; avoids a heavy chart lib) |
| Notifications | `expo-notifications` local scheduling, notification action buttons, quiet-hours filter |
| Timers | Focus timer and rest timer based on stored *start timestamps* (never tick counters), so they survive app kill/background; Android foreground service for the focus timer |
| Security | `expo-local-authentication` (biometric gate), `expo-secure-store` (DB key + API key) |
| Export | CSV/JSON generated in app; XLSX via SheetJS; share via `expo-sharing`; PNG card via `react-native-view-shot` |
| AI | Anthropic Messages API, called from the app with a user-supplied key (v1). Optional thin proxy later |
| Widgets | `react-native-android-widget` (dev build), phase 8 |
| Tests | Vitest/Jest for pure logic (consistency, streak, volume, correlation, unit conversion) |

Folder layout:
```
app/                 expo-router routes
src/components/      ui primitives (Card, Chip, Segmented, Ring, Toggle, Sheet, ...)
src/features/<module>/   hooks, queries, screens parts
src/db/              schema, migrations, seed
src/lib/             scoring, streaks, stats, units, dates, csv
src/ai/              context builder, prompts, report schema
src/theme/           tokens
design/              the Stitch export (read-only reference)
```

---

## 6. AI assistant: how it must work

- **Grounded only**: the app builds a compact JSON summary of the user's logs for a chosen window (default rolling 90 days; daily aggregates, not raw rows, to keep tokens small) and sends it with the question. The system prompt forbids claims not supported by that data.
- **Structured output**: the model returns JSON matching a report schema (`executive_summary`, `metrics[]`, `went_well[]`, `patterns[]` with optional correlation, `improve[]`, `next_steps[]`), which the app renders as the Telemetry Diagnostic card. Free-text questions render as normal chat bubbles.
- **Correlations are computed by the app, not the model**: Pearson r and sample size are calculated locally and passed in. The model may only describe them. Show "Not medical causation" and hide correlations with n < 14.
- **Safety**: no diagnosis, no medication changes or dosing advice (the design's footer says this; enforce it in the system prompt). Medication names/doses are excluded from the payload when "Sensitive Masking Guard" is on (default on): send adherence % only.
- **Exclusions**: the "Exclusions: N" button lets the user omit modules from AI context.
- **Key handling (v1)**: user pastes their own Anthropic API key in Settings; stored in SecureStore, never logged, never in the repo. State this plainly in the UI. Do not hardcode any key. Later option: a minimal serverless proxy so no key ships or is typed on device.
- **Next-step buttons** ("Enable", "Schedule") create real reminders/habits via the same forms as manual creation.

---

## 7. Notifications

- Types: hydration milestone, medication due, rest-interval complete, focus block start, weekly report ready.
- Quiet hours (default 22:30 to 06:30): suppress or queue everything except items flagged "medication priority override".
- Action buttons run without opening the app where Android allows: `+250 ml`, `Mark as Taken`, `Skip`, `Log Set Complete`, `Delay 10m`.
- Lock-screen masking: medication notifications show a generic title when masking is on (the design shows "Masked").
- Notification Center screen is a persisted history from the `notifications` table.

---

## 8. Scope honesty: what's v1 vs later

| Feature in design | v1 | Notes |
|---|---|---|
| All 5 tabs, logging, charts, habits, workouts, focus timer | Yes | Core |
| Local notifications + quiet hours | Yes | |
| AI assistant (BYO key) | Yes | |
| CSV / JSON / XLSX export | Yes | |
| Share card PNG with redaction toggles | Yes | Local only |
| Biometric lock + encrypted DB | Yes | |
| Android widgets | Phase 8 | Needs dev build |
| "Cryptographic attestation / verified" badge, `daymark.sh/attest` link | **No** | Needs a backend. Show a plain local SHA-256 fingerprint of the exported data or omit the badge |
| Real-time BLE heart-rate / "Target Heart Zone" | **No** | Needs Health Connect or BLE; render the tile only as manual entry, or hide it |
| Steps (10k Cadence), automatic sleep | Later | Health Connect integration |
| Blood glucose, HRV, REM score | Later | Need devices/Health Connect; don't fake these values |
| Cloud sync / accounts | No | Local-first by design |

Never ship placeholder numbers from the mockups as if they were real data. All sample data (Alex Vance, 94 days, 1,280 points, etc.) must come only from a clearly labelled dev seed script.

---

## 9. Build phases (each ends with a runnable, testable app)

0. **Foundation**: Expo + TS + NativeWind, theme tokens, fonts, tab shell with 5 tabs, base components (Card, Chip, Segmented, Ring, Checkbox, Toggle, Button, Sheet, Input, ProgressBar), dev seed script.
1. **Data + Health tracking**: schema/migrations, units, hydration, weight, meds + logs, sleep entry, subjective state, habits (all three types). Home tiles wired to real data.
2. **Home + scoring**: triggers, consistency ring, streak, Telemetry Sequence, FAB quick-add, history/detail screens.
3. **Fitness + Focus**: workout session flow, sets table, rest timer, volume + PR comparisons; focus timer with persistence, divert counter, deliverable note.
4. **Insights**: aggregation queries, all charts, range switch, correlation explorer with guards, raw dataset view.
5. **Notifications**: scheduling, quiet hours, actions, notification center, cadence architecture tab.
6. **AI assistant**: context builder, report schema + renderer, chat, key settings, masking guard, exclusions.
7. **Export & share**: CSV/JSON/XLSX, share-card generator with redaction + themes.
8. **Security & widgets**: biometric lock, SQLCipher, purge-all-data flow, then Android widgets and dev build.
9. **Polish**: empty/error states, accessibility (touch targets ≥ 48dp, contrast, font scaling), performance with 1+ year of data, tests, EAS build of an APK.

---

## 10. Definition of done (per phase)

- Type-checks (`tsc --noEmit`) and lint pass
- Unit tests for any new logic in `src/lib`
- Screen visually matches its `screen.png` at 390px width (spacing, radii, type, colors)
- Works offline; survives app kill (timers, reminders)
- No hardcoded secrets; no mock data in production paths
- Short note appended to `docs/PROGRESS.md`: what was built, what's left, any deviations
