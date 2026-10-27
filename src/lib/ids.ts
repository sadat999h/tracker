import * as Crypto from 'expo-crypto';

/**
 * Generates a UUID v4 using expo-crypto (CSPRNG).
 * Use this everywhere an ID is needed — never Date.now() prefixes.
 */
export function uuid(): string {
  return Crypto.randomUUID();
}
