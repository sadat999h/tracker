# DAYMARK Development Guide

## Stack
- Expo (latest stable SDK), React Native, strict TypeScript, Expo Router, NativeWind.
- SQLite via `expo-sqlite` + Drizzle; SQLCipher configured for a development build.
- Zustand for UI state, `react-native-svg` for charts, Expo notifications/SecureStore/Local Authentication in their later phases.
- Geist for telemetry/numbers and Inter for body copy.

## Non-negotiable rules
- Dark mode only. Follow `src/theme/tokens.ts`: 16px cards, 8px controls, 1px tonal borders, no blur shadow or glow.
- Native React Native only: never ship supplied design HTML, a WebView, or Tailwind CDN.
- Local-first: no analytics, tracking, cloud sync, or network calls except a user-initiated AI request in Phase 6.
- No secrets in source or commits. `.env*` and key files stay ignored. AI keys belong in SecureStore.
- Store canonical kg/ml, UTC epoch milliseconds, and local day strings. Convert at presentation boundaries.
- Mock reference values only belong in clearly marked development fixtures and `npm run seed`; never route them through production data paths.
- Do not invent BLE/HR/HRV/REM/steps/glucose data. Correlations are local-only and hidden below n=14.
- Medical guardrails: never diagnose or advise medication changes; sensitive medication details are masked in AI payloads by default.
- Timers persist timestamps, never tick counters.

## Commands
- `npm install`
- `npm run start`, `npm run android`, `npm run ios`
- `npm run typecheck`, `npm run lint`, `npm test`
- `npm run db:generate`, `npm run seed` (development only)

## Layout
- `app/`: Expo Router routes.
- `src/components/`: reusable primitive UI.
- `src/features/`: feature screens, queries, hooks.
- `src/db/`: schema, migrations, seed.
- `src/lib/`: pure tested domain logic.
- `src/ai/`: context/prompts/report schema (Phase 6).
- `src/theme/`: canonical design tokens.
- `design/`: read-only visual references.

## Phase protocol
Before every phase, append a concise build checklist to `docs/PROGRESS.md`. Build reusable primitives before screens, verify with typecheck/lint/tests and visual inspection, commit each logical unit, then report what was built, how to run it, deviations, risks, and next phase. Stop for user review before proceeding.
