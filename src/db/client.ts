import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import * as schema from './schema';

const DB_NAME = 'daymark.db';
const KEY_STORE_KEY = 'daymark_db_key';

/**
 * Retrieves or generates the SQLCipher encryption key.
 * On first launch a random 32-byte key is generated and stored in SecureStore.
 * On subsequent launches the same key is retrieved.
 *
 * WARNING: If the device keystore is wiped (factory reset without backup),
 * this key is lost and the database becomes unreadable. Push users to Export.
 */
async function getOrCreateDbKey(): Promise<string> {
  let key = await SecureStore.getItemAsync(KEY_STORE_KEY);
  if (!key) {
    const bytes = Crypto.getRandomBytes(32);
    // Encode as hex string for use in PRAGMA key
    key = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    await SecureStore.setItemAsync(KEY_STORE_KEY, key);
  }
  return key;
}

let _db: ReturnType<typeof drizzle> | null = null;

/**
 * Opens the encrypted database. Must be called once during Bootstrap before
 * any query runs. Subsequent calls return the same instance.
 */
export async function openDatabase(): Promise<ReturnType<typeof drizzle>> {
  if (_db) return _db;

  const key = await getOrCreateDbKey();

  // expo-sqlite with SQLCipher config plugin: pass the key before any statements
  const sqlite = SQLite.openDatabaseSync(DB_NAME);

  // Apply encryption key and pragmas
  sqlite.execSync(`PRAGMA key = "x'${key}'";`);
  sqlite.execSync('PRAGMA foreign_keys = ON;');
  sqlite.execSync('PRAGMA journal_mode = WAL;');

  _db = drizzle(sqlite, { schema });
  return _db;
}

/**
 * Returns the already-opened DB instance.
 * Throws if openDatabase() has not been called yet (i.e. Bootstrap hasn't run).
 */
export function getDb(): ReturnType<typeof drizzle> {
  if (!_db) {
    throw new Error('Database not initialised — Bootstrap must run first');
  }
  return _db;
}
