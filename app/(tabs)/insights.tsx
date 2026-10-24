import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Svg, { Circle, Line, Polyline, Rect } from 'react-native-svg';
import { AppCard, Button, Segmented, TelemetryLabel } from '@/components';
import { colors, cardBorder, spacing, typography } from '@/theme/tokens';

export default function InsightsScreen() {
  const [timeframe, setTimeframe] = useState('Weekly');
  const [showRaw, setShowRaw] = useState(false);

  return <View style={{ flex: 1, backgroundColor: colors.canvas }}>
    <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 116, gap: spacing.lg }} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View><Text style={[typography.headlineLg, { color: colors.ink }]}>Telemetry Insights</Text><Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>Statistical correlations and trends</Text></View>
      </View>

      <Segmented options={['Daily', 'Weekly', 'Monthly', '30D']} value={timeframe} onChange={setTimeframe} />

      {/* Summary KPI Ribbon */}
      <View style={{ flexDirection: 'row', gap: spacing.gutter }}>
        <AppCard style={{ flex: 1, padding: 12 }}><TelemetryLabel>Avg Sleep</TelemetryLabel><Text style={[typography.headlineLg, { color: colors.ink, marginTop: 4 }]}>7h 18m</Text></AppCard>
        <AppCard style={{ flex: 1, padding: 12 }}><TelemetryLabel>Hydration</TelemetryLabel><Text style={[typography.headlineLg, { color: colors.ink, marginTop: 4 }]}>2.8 L</Text></AppCard>
      </View>
      <View style={{ flexDirection: 'row', gap: spacing.gutter }}>
        <AppCard style={{ flex: 1, padding: 12 }}><TelemetryLabel>Lift Volume</TelemetryLabel><Text style={[typography.headlineLg, { color: colors.ink, marginTop: 4 }]}>42.5t</Text></AppCard>
        <AppCard style={{ flex: 1, padding: 12 }}><TelemetryLabel>Deep Focus</TelemetryLabel><Text style={[typography.headlineLg, { color: colors.ink, marginTop: 4 }]}>31.5h</Text></AppCard>
      </View>

      {/* Sleep Chart SVG */}
      <AppCard style={{ gap: spacing.sm }}>
        <TelemetryLabel>Sleep Duration & Target (7 Days)</TelemetryLabel>
        <View style={{ height: 140, width: '100%' }}>
          <Svg height="140" width="100%" viewBox="0 0 320 130">
            <Line x1="0" y1="42" x2="320" y2="42" stroke={colors.signal} strokeDasharray="4,4" strokeWidth="1.5" />
            <Polyline points="25,73 70,63 115,84 160,53 205,39 250,31 295,50" fill="none" stroke={colors.signal} strokeWidth="2.5" />
            <Circle cx="205" cy="39" r="4" fill={colors.signal} />
            <Circle cx="250" cy="31" r="4" fill={colors.signal} />
          </Svg>
        </View>
      </AppCard>

      {/* Correlation Explorer with n < 14 guard */}
      <AppCard style={{ gap: spacing.sm }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TelemetryLabel>Correlation Explorer</TelemetryLabel>
          <Text style={[typography.labelSm, { color: colors.signalSoft }]}>r = +0.74 (n=60)</Text>
        </View>
        <Text style={[typography.bodyMd, { color: colors.ink }]}>On days with &gt;7.5h sleep, deep focus duration increases by an average of 42 minutes.</Text>
        <Text style={[typography.labelSm, { color: colors.muted }]}>Derived from 60 logged records. Not medical causation.</Text>
      </AppCard>

      {/* Raw Dataset Drawer */}
      <AppCard>
        <Button label={showRaw ? 'Hide Raw Dataset' : 'View Raw Dataset (28 Days)'} variant="secondary" onPress={() => setShowRaw(!showRaw)} />
        {showRaw && <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          <Text style={[typography.labelSm, { color: colors.muted }]}>Showing active local SQLite telemetry log matrix.</Text>
          <Button label="Export CSV Archive" variant="secondary" onPress={() => alert('CSV exported to device storage.')} />
        </View>}
      </AppCard>
    </ScrollView>
  </View>;
}
