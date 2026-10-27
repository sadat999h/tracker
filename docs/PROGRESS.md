# DAYMARK Progress

## Phase 0 — Foundation Rebuild (2026-10-27)

### Build checklist
- [ ] Upgrade to SDK 53 / RN 0.79 (`npx expo install expo@latest --fix` + `--check`)
- [ ] Remove dead weight: NativeWind, Tailwind, `global.css`, `react-native-css-interop`, `metro` (stray dep), `query-string`, `src/version.ts`, `src/theme/cssFix.ts`
- [ ] Fix `tsconfig.json`: remove invalid `ignoreDeprecations: "6.0"` 
- [ ] Fix `vitest.config.ts`: add `@/` path alias so `tests/` imports resolve
- [ ] Add missing packages pinned to SDK 53 compatible versions: `expo-crypto`, `expo-secure-store`
- [ ] Write `src/lib/ids.ts`: UUID v4 via `expo-crypto`
- [ ] Rewrite `src/db/migrations/0000_phase_zero.sql`: all ~21 tables, correct types (targets.value = REAL)
- [ ] Rewrite `src/db/client.ts`: generate/store SQLCipher key in SecureStore, WAL, foreign keys
- [ ] Write `src/db/bootstrap.ts`: `runMigrations()` + real defaults (settings, targets, metric_defs, exercises)
- [ ] Write `app/(onboarding)/` routes: welcome → name & units → modules → done
- [ ] Rewrite `app/_layout.tsx`: `<Bootstrap>` gate (splash → migrations → onboarding-or-tabs, error screen)
- [ ] Remove `global.css` import from `_layout.tsx`; remove `app/components.tsx` (dev route only)
- [ ] Fix `src/ai/contextBuilder.ts` so `tests/ai.test.ts` passes without hardcoded values
- [ ] All quality gates green: `typecheck` + `lint` + `test`
- [ ] `expo export --platform android` smoke bundle succeeds
- [ ] Commit with clear message

### Status
🔴 Not started — executing now

---

## Previous (prototype, not production-ready)

The below claims from the prototype phase are **not verified**. The audit found the app non-functional on a fresh install due to missing migrations, no onboarding, no CRUD UI, and pervasive fake data in production paths.

### Phase 9 — Polish, Release & Preview (prototype)
- [x] Prevent a font-loading failure from leaving the installed app stuck on its splash screen.
- [x] Align Android Kotlin with the Compose compiler requirement and validate the EAS APK build configuration.
- [x] Add EAS internal Android APK build profile and validate its configuration.
- **Automated tests**: validated pure logic modules (units, dates, scoring, fitness, stats, ai context builder) via Vitest.
- **Expo Go preview**: prepared startup commands so the app can be run immediately on your physical phone or simulator.
- **Progress documentation**: finalized progress tracking.
