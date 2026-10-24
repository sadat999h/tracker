import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppCard, Button, TelemetryLabel, Toggle } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function NotificationsScreen() {
  const [quietHours, setQuietHours] = useState(true);
  const [medOverride, setMedOverride] = useState(true);

  return <View style={{ flex: 1, backgroundColor: colors.canvas, padding: spacing.md }}>
    <ScrollView contentContainerStyle={{ gap: spacing.md, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <TelemetryLabel>Circadian Quiet Shield</TelemetryLabel>
      <Text style={[typography.headlineLg, { color: colors.ink }]}>Notification &amp; Reminder Center</Text>

      <AppCard style={{ gap: spacing.md }}>
        <TelemetryLabel>Quiet Hours Configuration</TelemetryLabel>
        <Text style={[typography.bodyMd, { color: colors.muted }]}>Dampens all non-critical notifications between 22:30 and 06:30.</Text>
        <Toggle value={quietHours} onChange={setQuietHours} label="Enable Circadian Shield" />
        <Toggle value={medOverride} onChange={setMedOverride} label="Medication Priority Override" />
      </AppCard>

      <AppCard style={{ gap: spacing.sm }}>
        <TelemetryLabel>Recent Alerts</TelemetryLabel>
        <View style={{ padding: 12, borderRadius: 12, backgroundColor: colors.surfaceHigh, gap: 4 }}>
          <Text style={[typography.labelSm, { color: colors.signal }]}>HYDRATION • 12m ago</Text>
          <Text style={[typography.bodyMd, { color: colors.ink }]}>Hydration Cadence: Afternoon Milestone</Text>
          <Text style={[typography.bodySm, { color: colors.muted }]}>Current intake is 2,250 ml. 750 ml required before 19:00.</Text>
        </View>
        <View style={{ padding: 12, borderRadius: 12, backgroundColor: colors.surfaceHigh, gap: 4, marginTop: spacing.sm }}>
          <Text style={[typography.labelSm, { color: colors.signalSoft }]}>PROTOCOL • 35m ago</Text>
          <Text style={[typography.bodyMd, { color: colors.ink }]}>Evening Protocol Reminder</Text>
          <Text style={[typography.bodySm, { color: colors.muted }]}>Magnesium Bisglycinate (400 mg) scheduled at 21:30.</Text>
        </View>
      </AppCard>

      <Button label="Schedule Local Notification Test" variant="secondary" onPress={() => alert('Local notification reminder scheduled successfully.')} />
    </ScrollView>
  </View>;
}
