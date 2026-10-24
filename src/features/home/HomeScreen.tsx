import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppCard, Button, Checkbox, Chip, MetricTile, ProgressBar, Ring, TelemetryLabel } from '@/components';
import { colors, cardBorder, radii, spacing, typography } from '@/theme/tokens';
import { useHealthDashboard } from '@/features/health/hooks/useHealthDashboard';
import { calculateConsistency } from '@/lib/scoring';
import { logWaterEntry, toggleHabitLog } from './data/healthRepository';

export function HomeScreen() {
  const router = useRouter();
  const { loading, profile, waterMl, habits, meds, refresh } = useHealthDashboard();
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  if (loading || !profile) {
    return <View style={{ flex: 1, backgroundColor: colors.canvas, justifyContent: 'center', alignItems: 'center' }}><Text style={[typography.bodyMd, { color: colors.muted }]}>Loading DAYMARK telemetry...</Text></View>;
  }

  const completedHabits = habits.filter((h) => h.log?.done).length;
  const totalTriggers = habits.length + 2; // Water + Meds + habits
  const completedTriggers = (waterMl >= 3000 ? 1 : waterMl > 0 ? 0.5 : 0) + completedHabits + (meds.length > 0 ? 1 : 0);
  const consistency = calculateConsistency(completedTriggers, totalTriggers);

  return <View style={{ flex: 1, backgroundColor: colors.canvas }}>
    <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 116, gap: spacing.lg }} showsVerticalScrollIndicator={false}>
      {/* Greeting & Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View><Text style={[typography.headlineLg, { color: colors.ink }]}>Good morning, {profile.name}</Text><Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>Thursday, Oct 24 • Day 184 of 2024</Text></View>
        <View style={{ flexDirection: 'row', gap: spacing.sm }}>
          <Pressable accessibilityLabel="Notifications" style={{ width: 40, height: 40, borderRadius: radii.full, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.signalSoft }}>♧</Text></Pressable>
          <View style={{ width: 40, height: 40, borderRadius: radii.full, backgroundColor: colors.surfaceHigh, alignItems: 'center', justifyContent: 'center' }}><Text style={[typography.labelLg, { color: colors.signalSoft }]}>{profile.name.charAt(0).toUpperCase()}</Text></View>
        </View>
      </View>

      {/* Today at a Glance Card */}
      <AppCard style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', gap: spacing.sm, alignItems: 'center' }}><TelemetryLabel>Today at a glance</TelemetryLabel><Chip label="CYCLE #42" /></View>
          <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center', borderRadius: radii.full, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: colors.surfaceHighest }}><Text style={{ color: colors.signal }}>♨</Text><Text style={[typography.labelMd, { color: colors.signalSoft }]}>24 Day Streak</Text></View>
        </View>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
          <Ring value={completedTriggers} total={totalTriggers} label={String(consistency)} caption="%" />
          <View style={{ flex: 1, gap: spacing.sm }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 5 }}><Text style={[typography.displayMd, { color: colors.ink }]}>{Math.round(completedTriggers)}</Text><Text style={[typography.bodyMd, { color: colors.muted }]}>/ {totalTriggers} planned triggers</Text></View>
            <Text style={[typography.bodySm, { color: colors.mutedWarm }]}>High cognitive endurance. Active telemetry synchronized.</Text>
            <ProgressBar value={consistency / 100} />
          </View>
        </View>
      </AppCard>

      {/* Telemetry Sequence */}
      <View style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><TelemetryLabel>Telemetry sequence</TelemetryLabel><Text style={[typography.labelSm, { color: colors.signal }]}>● Live Sequence</Text></View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: spacing.sm }}>
          {[{ time: '07:30', title: 'Hydration Primer', detail: `${waterMl}ml logged` }, { time: '12:00', title: 'Active Health Vault', detail: 'Encrypted SQLite' }].map((item) => <View key={item.time} style={[{ width: 144, padding: 12, borderRadius: 12, backgroundColor: colors.surface }, cardBorder]}><Text style={[typography.labelSm, { color: colors.ink }]}>{item.time}</Text><Text numberOfLines={1} style={[typography.labelMd, { color: colors.ink, marginTop: 8 }]}>{item.title}</Text><Text numberOfLines={1} style={[typography.labelSm, { color: colors.muted, marginTop: 4 }]}>{item.detail}</Text></View>)}
        </ScrollView>
      </View>

      {/* Real-time Metrics Grid */}
      <View style={{ gap: spacing.gutter }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><TelemetryLabel>Real-time metrics</TelemetryLabel><Text style={[typography.labelSm, { color: colors.muted }]}>Target Cadence</Text></View>
        <View style={{ flexDirection: 'row', gap: spacing.gutter }}>
          <Pressable style={{ flex: 1 }} onPress={() => router.push('/metric/hydration')}><MetricTile label="Water" value={waterMl.toLocaleString()} unit="/ 3,000 ml" detail="Tap for history" progress={Math.min(waterMl / 3000, 1)} icon="♢" /></Pressable>
          <MetricTile label="Medication" value={`${meds.filter((m) => m.active).length} active`} detail="Adherence tracked" icon="•" />
        </View>
      </View>

      {/* Habit Architecture Card */}
      <AppCard style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
          <TelemetryLabel>Habit Architecture</TelemetryLabel>
          <Text style={[typography.labelSm, { color: colors.signalSoft }]}>{completedHabits} / {habits.length} completed</Text>
        </View>
        {habits.length === 0 ? <Text style={[typography.bodyMd, { color: colors.muted }]}>No habits configured.</Text> : habits.map(({ habit, log }) => <View key={habit.id} style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.gutter, paddingVertical: 10 }}><Checkbox checked={log?.done ?? false} onPress={async () => { await toggleHabitLog(habit.id, !(log?.done ?? false)); await refresh(); }} /><View style={{ flex: 1 }}><Text style={[typography.bodyMd, { color: colors.ink }]}>{habit.name}</Text><Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>{habit.subtitle ?? 'Daily cadence'}</Text></View><Text style={[typography.labelSm, { color: log?.done ? colors.signalSoft : colors.muted, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, backgroundColor: colors.surfaceHigh }]}>{log?.done ? 'DONE' : 'PENDING'}</Text></View>)}
      </AppCard>
    </ScrollView>

    {/* Floating Action Button */}
    <Pressable accessibilityLabel="Quick add telemetry" onPress={() => setQuickAddOpen(true)} style={{ position: 'absolute', right: spacing.md, bottom: 28, width: 56, height: 56, borderRadius: radii.full, backgroundColor: colors.signal, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: 30, color: colors.signalDark }}>+</Text></Pressable>

    {/* Quick Input Modal */}
    <Modal animationType="slide" transparent visible={quickAddOpen} onRequestClose={() => setQuickAddOpen(false)}>
      <Pressable onPress={() => setQuickAddOpen(false)} style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: '#00000099' }}>
        <Pressable style={{ backgroundColor: colors.surfaceHigh, borderTopLeftRadius: radii.sheet, borderTopRightRadius: radii.sheet, padding: 20, gap: spacing.gutter }}>
          <TelemetryLabel>Quick telemetry input</TelemetryLabel>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable onPress={async () => { await logWaterEntry(250); await refresh(); setQuickAddOpen(false); }} style={{ alignItems: 'center', gap: 6 }}><View style={{ width: 44, height: 44, borderRadius: radii.control, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface }}><Text style={{ color: colors.signal }}>+</Text></View><Text style={[typography.labelSm, { color: colors.ink }]}>+250ml Water</Text></Pressable>
            <Pressable onPress={() => { router.push('/(tabs)/track'); setQuickAddOpen(false); }} style={{ alignItems: 'center', gap: 6 }}><View style={{ width: 44, height: 44, borderRadius: radii.control, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface }}><Text style={{ color: colors.signal }}>⚙</Text></View><Text style={[typography.labelSm, { color: colors.ink }]}>Track Tab</Text></Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  </View>;
}
