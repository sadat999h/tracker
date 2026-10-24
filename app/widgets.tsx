import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppCard, Button, Segmented, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function WidgetsScreen() {
  const [sizeFilter, setSizeFilter] = useState('All');

  return <View style={{ flex: 1, backgroundColor: colors.canvas, padding: spacing.md }}>
    <ScrollView contentContainerStyle={{ gap: spacing.md, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <TelemetryLabel>Glance AppWidget v2.4</TelemetryLabel>
      <Text style={[typography.headlineLg, { color: colors.ink }]}>Widget Architecture</Text>

      <Segmented options={['All', 'Small (2x2)', 'Medium (4x2)', 'Large (4x4)']} value={sizeFilter} onChange={setSizeFilter} />

      <AppCard style={{ gap: spacing.sm }}>
        <TelemetryLabel>Small Block (2x2)</TelemetryLabel>
        <View style={{ height: 140, borderRadius: 12, backgroundColor: colors.surfaceLow, padding: 12, justifyContent: 'space-between' }}>
          <Text style={[typography.labelSm, { color: colors.muted }]}>OCT 24 • PULSE</Text>
          <Text style={[typography.displayMd, { color: colors.ink }]}>78%</Text>
          <Text style={[typography.labelSm, { color: colors.signalSoft }]}>11/14 Triggers</Text>
        </View>
      </AppCard>

      <AppCard style={{ gap: spacing.sm }}>
        <TelemetryLabel>Medium Tile (4x2)</TelemetryLabel>
        <View style={{ height: 110, borderRadius: 12, backgroundColor: colors.surfaceLow, padding: 12, justifyContent: 'space-between' }}>
          <Text style={[typography.headlineSm, { color: colors.ink }]}>Habit Architecture</Text>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>3 / 4 completed today</Text>
          <Text style={[typography.labelSm, { color: colors.signal }]}>Quick Check-in →</Text>
        </View>
      </AppCard>

      <Button label="Add Selected to Android Home Screen" onPress={() => alert('Widget pinning intent dispatched to Launcher.')} />
    </ScrollView>
  </View>;
}
