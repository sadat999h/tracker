### Delivered in Phase 1
- **Domain logic & unit tests**: added canonical unit conversion (`src/lib/units.ts`), local date helpers (`src/lib/dates.ts`), and passing unit tests (`tests/units.test.ts`).
- **Database bootstrap & migrations**: added default profile, settings, targets, and module seeders in `src/db/migrate.ts`.
- **Health repositories**: added typed local SQLite queries for profiles, water entries, habits, and medications in `src/features/health/data/healthRepository.ts`.
- **Dashboard hook**: added reactive state management in `src/features/health/hooks/useHealthDashboard.ts`.
- **Track tab (Health module)**: replaced shell placeholder with a functional vault-backed Track screen supporting name onboarding, water logging, medication check-in, and habit toggling.
- **Data-backed Home**: replaced mock presentation data on normal paths with real local DB water and habit summaries.
- **Progress tracking**: updated `docs/PROGRESS.md`.
