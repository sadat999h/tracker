import { ScrollView, Text, View, Pressable, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppCard, Button, TelemetryLabel, Toggle } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';
import { useHealthDashboard } from '@/features/health/hooks/useHealthDashboard';

export default function ProfileScreen() {
  const router = useRouter();
  const { profile } = useHealthDashboard();

  const displayName = profile?.name ?? 'You';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[typography.headlineLg, { color: colors.ink }]}>{displayName}</Text>
            <Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>
              Local vault · offline-first
            </Text>
          </View>
          <View style={styles.avatar}>
            <Text style={[typography.headlineMd, { color: colors.signalSoft }]}>{initial}</Text>
          </View>
        </View>

        {/* Navigation */}
        <AppCard style={styles.card}>
          <TelemetryLabel>Tools</TelemetryLabel>
          <Button
            label="Notifications"
            variant="secondary"
            onPress={() => router.push('/notifications')}
          />
          <Button
            label="Export data"
            variant="secondary"
            onPress={() => router.push('/share')}
          />
        </AppCard>

        {/* Storage info */}
        <AppCard style={styles.card}>
          <TelemetryLabel>Storage</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Your data is stored on this device only. It is encrypted with a key
            held in the device keystore. If you factory-reset or lose this
            device without exporting first, the data cannot be recovered.
          </Text>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Use Export to back up your data before resetting your phone.
          </Text>
        </AppCard>

        {/* Danger zone */}
        <AppCard style={styles.card}>
          <TelemetryLabel>Danger zone</TelemetryLabel>
          <Button
            label="Erase all data"
            variant="danger"
            onPress={() => {
              Alert.alert(
                'Erase all data?',
                'This permanently deletes everything in the app. There is no undo unless you have an export.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Erase',
                    style: 'destructive',
                    // Full wipe implemented in Phase 5 (export/import/wipe)
                    onPress: () =>
                      Alert.alert('Coming soon', 'Data wipe will be available in a future update.'),
                  },
                ],
              );
            }}
          />
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  scroll: { padding: spacing.md, paddingBottom: 116, gap: spacing.md },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { gap: spacing.sm },
});
