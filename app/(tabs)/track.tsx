import { useState } from 'react';
import { ScrollView, Text, View, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppCard, Button, Input, Segmented, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';
import { logFocusSession } from '@/features/health/data/fitnessRepository';
import { useHealthDashboard } from '@/features/health/hooks/useHealthDashboard';
import { logWaterEntry, toggleHabitLog } from '@/features/health/data/healthRepository';

export default function TrackScreen() {
  const { loading, profile, waterMl, habits, refresh } = useHealthDashboard();
  const [category, setCategory] = useState('Health');
  const [focusMin, setFocusMin] = useState('45');
  const [deliverable, setDeliverable] = useState('');
  const [diverts, setDiverts] = useState(0);
  const [logging, setLogging] = useState(false);

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
            Complete setup to start tracking.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleLogFocus = async () => {
    setLogging(true);
    try {
      await logFocusSession(
        'General',
        Number(focusMin) || 45,
        Number(focusMin) || 45,
        diverts,
        deliverable || '',
      );
      setDeliverable('');
      setDiverts(0);
      Alert.alert('Logged', 'Focus session saved.');
    } catch (e) {
      Alert.alert('Error', e instanceof Error ? e.message : 'Could not save focus session.');
    } finally {
      setLogging(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[typography.headlineLg, { color: colors.ink }]}>Track</Text>
        </View>

        <Segmented
          options={['Health', 'Fitness', 'Focus', 'Habits']}
          value={category}
          onChange={setCategory}
        />

        {/* ── Health ─────────────────────────────────────────────────── */}
        {category === 'Health' && (
          <AppCard style={styles.card}>
            <TelemetryLabel>Water</TelemetryLabel>
            <View style={styles.waterRow}>
              <Text style={[typography.displayMd, { color: colors.ink }]}>
                {waterMl.toLocaleString()}
              </Text>
              <Text style={[typography.labelSm, { color: colors.muted }]}>/ 2,500 ml</Text>
            </View>
            <View style={styles.row}>
              <Button
                label="+250 ml"
                variant="secondary"
                onPress={async () => { await logWaterEntry(250); await refresh(); }}
              />
              <Button
                label="+500 ml"
                variant="secondary"
                onPress={async () => { await logWaterEntry(500); await refresh(); }}
              />
            </View>
          </AppCard>
        )}

        {/* ── Fitness ────────────────────────────────────────────────── */}
        {category === 'Fitness' && (
          <AppCard style={styles.card}>
            <TelemetryLabel>Workouts</TelemetryLabel>
            <Text style={[typography.bodyMd, { color: colors.muted }]}>
              Workout logging is coming in a future update.
            </Text>
            <View style={styles.comingSoon}>
              <Text style={[typography.labelMd, { color: colors.signal }]}>Coming soon</Text>
            </View>
          </AppCard>
        )}

        {/* ── Focus ──────────────────────────────────────────────────── */}
        {category === 'Focus' && (
          <AppCard style={styles.card}>
            <TelemetryLabel>Focus session</TelemetryLabel>
            <Input
              placeholder="What are you working on? (optional)"
              value={deliverable}
              onChangeText={setDeliverable}
              accessibilityLabel="Deliverable or goal for this focus session"
            />
            <View style={styles.focusRow}>
              <Text style={[typography.bodyMd, { color: colors.muted }]}>
                Planned: {focusMin} min
              </Text>
              <Button
                label="Divert (+1)"
                variant="quiet"
                onPress={() => setDiverts((d) => d + 1)}
              />
            </View>
            {diverts > 0 && (
              <Text style={[typography.labelSm, { color: colors.mutedWarm }]}>
                {diverts} divert{diverts !== 1 ? 's' : ''} recorded
              </Text>
            )}
            <Button
              label={logging ? 'Saving…' : 'Log focus session'}
              disabled={logging}
              onPress={() => { void handleLogFocus(); }}
            />
          </AppCard>
        )}

        {/* ── Habits ─────────────────────────────────────────────────── */}
        {category === 'Habits' && (
          <AppCard style={styles.card}>
            <TelemetryLabel>Habits</TelemetryLabel>
            {habits.length === 0 ? (
              <Text style={[typography.bodyMd, { color: colors.muted }]}>
                No habits yet. Habit creation is coming in a future update.
              </Text>
            ) : (
              habits.map(({ habit, log }) => (
                <View key={habit.id} style={styles.habitRow}>
                  <Text style={[typography.bodyMd, { color: colors.ink, flex: 1 }]}>
                    {habit.name}
                  </Text>
                  <Button
                    label={log?.done ? 'Done ✓' : 'Mark done'}
                    variant={log?.done ? 'primary' : 'secondary'}
                    onPress={async () => {
                      await toggleHabitLog(habit.id, !(log?.done ?? false));
                      await refresh();
                    }}
                  />
                </View>
              ))
            )}
          </AppCard>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: spacing.md, paddingBottom: 116, gap: spacing.md },
  header: { gap: 2 },
  card: { gap: spacing.sm },
  waterRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginVertical: spacing.sm,
  },
  row: { flexDirection: 'row', gap: spacing.sm },
  focusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
  },
  comingSoon: {
    padding: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.surfaceHigh,
    alignSelf: 'flex-start',
  },
});
