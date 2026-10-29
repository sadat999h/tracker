# DAYMARK Progress

## Phase 0 — Foundation Rebuild (2026-10-28) — ✅ DONE

### Build checklist & verification
- [x] Upgrade to SDK 53 / RN 0.79 (`npx expo install expo@latest --fix`)
- [x] Remove dead weight: NativeWind, Tailwind, `global.css`, `react-native-css-interop`, `metro`, `query-string`, `src/version.ts`, `src/theme/cssFix.ts`
- [x] Fix `tsconfig.json`: removed invalid `ignoreDeprecations: "6.0"`
- [x] Fix `vitest.config.ts`: added `@/` path alias so `tests/` imports resolve
- [x] Added missing packages: `expo-crypto`, `expo-secure-store`, `expo-linking`
- [x] Write `src/lib/ids.ts`: UUID v4 via `expo-crypto`
- [x] Rewrite `src/db/migrations/0000_phase_zero.sql`: all ~21 tables, correct types (targets.value = REAL)
- [x] Rewrite `src/db/client.ts`: generate/store SQLCipher key in SecureStore, WAL, foreign keys
- [x] Write `src/db/bootstrap.ts`: `runMigrations()` + real defaults (settings, targets, metric_defs, exercises)
- [x] Write `app/(onboarding)/` routes: welcome → profile setup → tabs
- [x] Rewrite `app/_layout.tsx`: `<Bootstrap>` gate (splash → migrations → onboarding-or-tabs, error recovery screen)
- [x] Remove `global.css` import; remove dev-only components page
- [x] Fix `src/ai/contextBuilder.ts` and `tests/ai.test.ts`
- [x] **Quality gates verified**:
  - `npm run typecheck` ✅ (0 errors)
  - `npm run lint` ✅ (0 errors)
  - `npm test` ✅ (11/11 tests passing across 6 suites)
  - `npx expo export` ✅ (Android & iOS static bundles compiled successfully)

---

## Next Steps
- **Phase 1**: Core Modules (Water, Weight, Sleep, Habits CRUD & UI)
