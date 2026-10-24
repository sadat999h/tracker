import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppCard, Button, Segmented, TelemetryLabel, Toggle } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function ShareScreen() {
  const [format, setFormat] = useState('Story (9:16)');
  const [showTonnage, setShowTonnage] = useState(true);
  const [showSleep, setShowSleep] = useState(true);

  return <View style={{ flex: 1, backgroundColor: colors.canvas, padding: spacing.md }}>
    <ScrollView contentContainerStyle={{ gap: spacing.md, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <TelemetryLabel>Cryptographic Attestation</TelemetryLabel>
      <Text style={[typography.headlineLg, { color: colors.ink }]}>Social Share &amp; Export</Text>

      <Segmented options={['Story (9:16)', 'Square (1:1)', 'Summary Card']} value={format} onChange={setFormat} />

      {/* Preview Card */}
      <AppCard style={{ gap: spacing.md, backgroundColor: colors.surfaceLow }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View><Text style={[typography.headlineSm, { color: colors.ink }]}>DAYMARK • VERIFIED</Text><Text style={[typography.labelSm, { color: colors.muted }]}>TELEMETRY DISCIPLINE REPORT // W42</Text></View>
          <Text style={{ color: colors.signal }}>✓</Text>
        </View>
        <View style={{ padding: 16, borderRadius: 12, backgroundColor: colors.surface, gap: 8 }}>
          <Text style={[typography.labelSm, { color: colors.muted }]}>CYCLE CONSISTENCY</Text>
          <Text style={[typography.displayMd, { color: colors.ink }]}>78%</Text>
          {showTonnage && <Text style={[typography.bodyMd, { color: colors.mutedWarm }]}>Tonnage: 44.2t (+12% vs prior)</Text>}
          {showSleep && <Text style={[typography.bodyMd, { color: colors.mutedWarm }]}>Avg Sleep: 7h 48m</Text>}
        </View>
        <Text style={[typography.labelSm, { color: colors.muted }]}>SHA-256 // 49a2..10e9 • 94 Consecutive Days</Text>
      </AppCard>

      <AppCard style={{ gap: spacing.md }}>
        <TelemetryLabel>Data Redaction &amp; Theme</TelemetryLabel>
        <Toggle value={showTonnage} onChange={setShowTonnage} label="Show Workout Tonnage" />
        <Toggle value={showSleep} onChange={setShowSleep} label="Show Sleep &amp; Recovery" />
      </AppCard>

      <Button label="Share to Instagram Stories" onPress={() => alert('Share sheet triggered.')} />
      <Button label="Export Full CSV Archive (28 Days)" variant="secondary" onPress={() => alert('CSV archive generated.')} />
    </ScrollView>
  </View>;
}
