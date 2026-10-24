import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

// SQLCipher is enabled by the expo-sqlite config plugin in a development build.
// The database key will be retrieved from SecureStore in Phase 8 before opening it.
const sqlite = SQLite.openDatabaseSync('daymark.db');
export const db = drizzle(sqlite, { schema });
