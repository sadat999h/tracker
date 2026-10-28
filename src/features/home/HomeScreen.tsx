import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppCard, Checkbox, MetricTile, ProgressBar, Ring, TelemetryLabel } from '@/components';
import { colors, radii, spacing, typography } from '@/theme/tokens';
import { useHealthDashboard } from '@/features/health/hooks/useHealthDashboard';
import { calculateConsistency } from '@/lib/scoring';
import { logWaterEntry, toggleHabitLog } from '@/features/health/data/healthRepository';

export function HomeScreen() {
  const router = useRouter();
  const { loading, profile, waterMl, habits, refresh } = useHealthDashboard();
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  // Real today date — never hardcoded
  const today = new Date();
  const dayLabel = today.toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric',
  });

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>Loading…</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.center}>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Complete setup to get started.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const waterTarget = 2500;
  const completedHabits = habits.filter((h) => h.log?.done).length;
  const totalItems = habits.length + 1; // habits + water
  const completedItems = (waterMl >= waterTarget ? 1 : 0) + completedHabits;
  const consistency = calculateConsistency(completedItems, totalItems);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[typography.headlineLg, { color: colors.ink }]}>
              {profile.name}
            </Text>
            <Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>
              {dayLabel}
            </Text>
          </View>
          <View style={styles.avatar}>
            <Text style={[typography.labelLg, { color: colors.signalSoft }]}>
              {profile.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        {/* Today at a glance */}
        <AppCard style={styles.glanceCard}>
          <TelemetryLabel>Today at a glance</TelemetryLabel>
          <View style={styles.ringRow}>
            <Ring
              value={completedItems}
              total={totalItems}
              label={String(consistency)}
              caption="%"
            />
            <View style={{ flex: 1, gap: spacing.sm }}>
              <Text style={[typography.headlineMd, { color: colors.ink }]}>
                {completedItems} / {totalItems}
              </Text>
              <Text style={[typography.bodyMd, { color: colors.muted }]}>
                {completedItems === totalItems
                  ? 'All done for today.'
                  : `${totalItems - completedItems} item${totalItems - completedItems !== 1 ? 's' : ''} remaining`}
              </Text>
              <ProgressBar value={consistency / 100} />
            </View>
          </View>
        </AppCard>

        {/* Metrics grid */}
        <View style={styles.metricsGrid}>
          <Pressable
            style={{ flex: 1 }}
            onPress={() => router.push('/metric/water' as never)}
            accessibilityRole="button"
            accessibilityLabel="View water history"
          >
            <MetricTile
              label="Water"
              value={waterMl.toLocaleString()}
              unit={`/ ${waterTarget.toLocaleString()} ml`}
              progress={Math.min(waterMl / waterTarget, 1)}
            />
          </Pressable>
          <MetricTile
            label="Habits"
            value={`${completedHabits}`}
            unit={`/ ${habits.length}`}
            detail={habits.length === 0 ? 'None set up yet' : undefined}
            progress={habits.length > 0 ? completedHabits / habits.length : 0}
          />
        </View>

        {/* Habits */}
        {habits.length > 0 && (
          <AppCard>
            <View style={styles.habitHeader}>
              <TelemetryLabel>Habits</TelemetryLabel>
              <Text style={[typography.labelSm, { color: colors.signalSoft }]}>
                {completedHabits} / {habits.length}
              </Text>
            </View>
            {habits.map(({ habit, log }) => (
              <View key={habit.id} style={styles.habitRow}>
                <Checkbox
                  checked={log?.done ?? false}
                  onPress={async () => {
                    await toggleHabitLog(habit.id, !(log?.done ?? false));
                    await refresh();
                  }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={[typography.bodyMd, { color: colors.ink }]}>
                    {habit.name}
                  </Text>
                  {habit.subtitle ? (
                    <Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>
                      {habit.subtitle}
                    </Text>
                  ) : null}
                </View>
                <Text
                  style={[
                    typography.labelSm,
                    {
                      color: log?.done ? colors.signalSoft : colors.muted,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 4,
                      backgroundColor: colors.surfaceHigh,
                    },
                  ]}
                >
                  {log?.done ? 'Done' : 'Pending'}
                </Text>
              </View>
            ))}
          </AppCard>
        )}

        {habits.length === 0 && (
          <AppCard>
            <TelemetryLabel>Habits</TelemetryLabel>
            <Text style={[typography.bodyMd, { color: colors.muted, marginTop: spacing.sm }]}>
              No habits set up yet. Habit creation is coming in a future update.
            </Text>
          </AppCard>
        )}
      </ScrollView>

      {/* FAB — quick add water */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Quick add water"
        onPress={() => setQuickAddOpen(true)}
        style={styles.fab}
      >
        <MaterialCommunityIcons name="plus" size={28} color={colors.signalDark} />
      </Pressable>

      {/* Quick add sheet */}
      <Modal
        animationType="slide"
        transparent
        visible={quickAddOpen}
        onRequestClose={() => setQuickAddOpen(false)}
      >
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setQuickAddOpen(false)}
          accessibilityLabel="Close quick add"
        >
          <Pressable style={styles.sheet} onPress={() => { /* prevent close */ }}>
            <TelemetryLabel>Quick add</TelemetryLabel>
            <View style={styles.quickRow}>
              <Pressable
                style={styles.quickItem}
                onPress={async () => {
                  await logWaterEntry(250);
                  await refresh();
                  setQuickAddOpen(false);
                }}
                accessibilityRole="button"
                accessibilityLabel="Log 250 ml water"
              >
                <MaterialCommunityIcons name="water" size={24} color={colors.signal} />
                <Text style={[typography.labelSm, { color: colors.ink }]}>+250 ml</Text>
              </Pressable>
              <Pressable
                style={styles.quickItem}
                onPress={async () => {
                  await logWaterEntry(500);
                  await refresh();
                  setQuickAddOpen(false);
                }}
                accessibilityRole="button"
                accessibilityLabel="Log 500 ml water"
              >
                <MaterialCommunityIcons name="water" size={24} color={colors.signal} />
                <Text style={[typography.labelSm, { color: colors.ink }]}>+500 ml</Text>
              </Pressable>
              <Pressable
                style={styles.quickItem}
                onPress={() => {
                  router.push('/(tabs)/track' as never);
                  setQuickAddOpen(false);
                }}
                accessibilityRole="button"
                accessibilityLabel="Go to Track tab"
              >
                <MaterialCommunityIcons name="record-circle-outline" size={24} color={colors.signal} />
                <Text style={[typography.labelSm, { color: colors.ink }]}>Track</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: spacing.md, paddingBottom: 100, gap: spacing.md },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glanceCard: { gap: spacing.md },
  ringRow: { flexDirection: 'row', gap: spacing.lg, alignItems: 'center' },
  metricsGrid: { flexDirection: 'row', gap: spacing.sm },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  fab: {
    position: 'absolute',
    right: spacing.md,
    bottom: 28,
    width: 56,
    height: 56,
    borderRadius: radii.full,
    backgroundColor: colors.signal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000099',
  },
  sheet: {
    backgroundColor: colors.surfaceHigh,
    borderTopLeftRadius: radii.sheet ?? 24,
    borderTopRightRadius: radii.sheet ?? 24,
    padding: spacing.lg,
    gap: spacing.md,
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'flex-start',
  },
  quickItem: {
    alignItems: 'center',
    gap: 6,
    padding: spacing.sm,
    borderRadius: radii.control,
    backgroundColor: colors.surface,
    minWidth: 72,
  },
});
