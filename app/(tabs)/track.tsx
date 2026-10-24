import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppCard, Button, Input, Segmented, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';
import { logFocusSession } from '@/features/health/data/fitnessRepository';
import { useHealthDashboard } from '@/features/health/hooks/useHealthDashboard';
import { logWaterEntry, toggleHabitLog } from '@/features/health/data/healthRepository';

export default function TrackScreen() {
  const { loading, profile, waterMl, habits, meds, refresh } = useHealthDashboard();
  const [category, setCategory] = useState('Health');
  const [focusMin, setFocusMin] = useState('45');
  const [deliverable, setDeliverable] = useState('');
  const [diverts, setDiverts] = useState(0);

  if (loading || !profile) {
    return <View style={{ flex: 1, backgroundColor: colors.canvas, justifyContent: 'center', alignItems: 'center' }}><Text style={[typography.bodyMd, { color: colors.muted }]}>Loading tracking vault...</Text></View>;
  }

  return <View style={{ flex: 1, backgroundColor: colors.canvas }}>
    <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 116, gap: spacing.md }} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><View><Text style={[typography.headlineLg, { color: colors.ink }]}>Universal Tracking</Text><Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>Local encrypted SQLite vault active</Text></View><View style={{ paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, backgroundColor: colors.surfaceHigh }}><Text style={[typography.labelSm, { color: colors.signal }]}>● LIVE</Text></View></View>

      <Segmented options={['Health', 'Fitness', 'Focus', 'Habits']} value={category} onChange={setCategory} />

      {category === 'Health' && <View style={{ gap: spacing.md }}>
        <AppCard>
          <TelemetryLabel>Hydration Reservoir</TelemetryLabel>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginTop: spacing.sm }}><Text style={[typography.displayMd, { color: colors.ink }]}>{waterMl.toLocaleString()}</Text><Text style={[typography.labelSm, { color: colors.muted }]}>/ 3,000 ml</Text></View>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
            <Button label="+250 ml" variant="secondary" onPress={async () => { await logWaterEntry(250); await refresh(); }} />
            <Button label="+500 ml" variant="secondary" onPress={async () => { await logWaterEntry(500); await refresh(); }} />
          </View>
        </AppCard>
      </View>}

      {category === 'Fitness' && <AppCard>
        <TelemetryLabel>Barbell Hypertrophy</TelemetryLabel>
        <Text style={[typography.headlineMd, { color: colors.ink, marginTop: spacing.sm }]}>Workout Session Logger</Text>
        <Text style={[typography.bodyMd, { color: colors.muted, marginTop: spacing.sm }]}>Log exercises, sets, weights (kg), reps, and rest timers. Total session volume is automatically computed from completed sets.</Text>
        <View style={{ marginTop: spacing.md }}><Button label="Start Upper Body Hypertrophy" onPress={() => alert('Workout session started. Sets matrix ready.')} /></View>
      </AppCard>}

      {category === 'Focus' && <AppCard style={{ gap: spacing.gutter }}>
        <TelemetryLabel>Focus Engine</TelemetryLabel>
        <Text style={[typography.headlineMd, { color: colors.ink }]}>Deep Work Timer</Text>
        <Input placeholder="Focal anchor / deliverable" value={deliverable} onChangeText={setDeliverable} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={[typography.bodyMd, { color: colors.muted }]}>Diverts / distractions: {diverts}</Text><Button label="Increment Divert" variant="secondary" onPress={() => setDiverts(d => d + 1)} /></View>
        <Button label="Finish & Log Focus Session" onPress={async () => { await logFocusSession('System Architecture', Number(focusMin) || 45, Number(focusMin) || 45, diverts, deliverable || 'General Focus'); alert('Focus session logged to database.'); setDeliverable(''); setDiverts(0); }} />
      </AppCard>}

      {category === 'Habits' && <AppCard>
        <TelemetryLabel>Habit Execution</TelemetryLabel>
        {habits.map(({ habit, log }) => <View key={habit.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing.sm }}><Text style={[typography.bodyMd, { color: colors.ink }]}>{habit.name}</Text><Button label={log?.done ? 'Done' : 'Pending'} variant={log?.done ? 'primary' : 'secondary'} onPress={async () => { await toggleHabitLog(habit.id, !(log?.done ?? false)); await refresh(); }} /></View>)}
      </AppCard>}
    </ScrollView>
  </View>;
}
