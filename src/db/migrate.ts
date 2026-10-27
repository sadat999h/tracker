/* Legacy migrate.ts — superseded by src/db/bootstrap.ts / runBootstrap().
   Kept only so existing imports don't break during the transition. */
export { runBootstrap as initializeDefaults } from '@/db/bootstrap';
