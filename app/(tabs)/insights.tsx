import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppCard, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

/**
 * Insights screen — Phase 0 skeleton.
 * Shows real empty state. Charts and correlations are built in Phase 4+
 * once there is real data to display (n ≥ 14 required for correlations).
 */
export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[typography.headlineLg, { color: colors.ink }]}>
            Insights
          </Text>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: 2 }]}>
            Trends and correlations from your logged data
          </Text>
        </View>

        <AppCard style={styles.emptyCard}>
          <TelemetryLabel>No data yet</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: spacing.sm }]}>
            Start tracking water, sleep, and habits on the Track tab. Insights
            appear once you have at least 7 days of logs.
          </Text>
          <Text style={[typography.bodySm, { color: colors.muted, marginTop: spacing.sm }]}>
            Correlations require 14 or more days and are computed entirely on
            your device — nothing leaves it.
          </Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  scroll: { padding: spacing.md, paddingBottom: 116, gap: spacing.lg },
  header: { gap: 2 },
  emptyCard: { gap: spacing.sm },
});
