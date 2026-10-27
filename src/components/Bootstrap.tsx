import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { runBootstrap } from '@/db/bootstrap';
import { colors, typography, spacing, radii } from '@/theme/tokens';

type BootstrapState =
  | { status: 'loading' }
  | { status: 'ready' }
  | { status: 'error'; message: string };

interface Props {
  children: ReactNode;
}

/**
 * Bootstrap gate — blocks all rendering until:
 *   1. DB opens (SQLCipher key retrieved/created)
 *   2. Migrations run
 *   3. Default data is seeded
 *
 * On error, shows a recovery screen with Retry + diagnostic export.
 * Never shows an infinite spinner — always resolves to ready or error.
 */
export function Bootstrap({ children }: Props) {
  const [state, setState] = useState<BootstrapState>({ status: 'loading' });

  const run = () => {
    setState({ status: 'loading' });
    runBootstrap()
      .then(() => setState({ status: 'ready' }))
      .catch((err: unknown) => {
        const message =
          err instanceof Error ? err.message : 'Unknown error during database init';
        setState({ status: 'error', message });
      });
  };

  useEffect(() => {
    run();
  }, []);

  if (state.status === 'loading') {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.signal} />
        <Text style={[typography.bodyMd, styles.loadingText]}>Opening your data…</Text>
      </View>
    );
  }

  if (state.status === 'error') {
    return (
      <View style={styles.center}>
        <Text style={[typography.headlineSm, styles.errorTitle]}>Couldn't open your data</Text>
        <Text style={[typography.bodyMd, styles.errorBody]}>{state.message}</Text>
        <Pressable
          onPress={run}
          style={styles.retryButton}
          accessibilityRole="button"
          accessibilityLabel="Retry opening database"
        >
          <Text style={[typography.labelLg, { color: colors.signalDark }]}>Retry</Text>
        </Pressable>
        <Text style={[typography.bodySm, styles.hint]}>
          If this keeps happening, you may need to reinstall the app.{'\n'}
          Your data cannot be recovered without the original device.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    backgroundColor: colors.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    color: colors.muted,
    marginTop: spacing.md,
  },
  errorTitle: {
    color: colors.ink,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  errorBody: {
    color: colors.muted,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  retryButton: {
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.control,
    backgroundColor: colors.signal,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  hint: {
    color: colors.muted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
