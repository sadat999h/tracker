import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppCard, Button, Checkbox, Chip, Input, MetricTile, ProgressBar, Ring, Segmented, Sheet, TelemetryLabel, Toggle } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function ComponentsScreen() {
  const [selected, setSelected] = useState('Weekly');
  const [checked, setChecked] = useState(true);
  const [toggled, setToggled] = useState(true);
  return <ScrollView style={{ flex: 1, backgroundColor: colors.canvas }} contentContainerStyle={{ padding: spacing.md, gap: spacing.lg }}><TelemetryLabel>Development only</TelemetryLabel><Text style={[typography.headlineLg, { color: colors.ink }]}>Components</Text><AppCard><TelemetryLabel>Cards and metrics</TelemetryLabel><View style={{ flexDirection: 'row', gap: spacing.gutter, marginTop: spacing.md }}><MetricTile label="Hydration" value="0" unit="ml" detail="Empty metric state" progress={0} /><Ring value={0} total={0} caption="%" /></View></AppCard><AppCard><TelemetryLabel>Inputs and actions</TelemetryLabel><View style={{ gap: spacing.md, marginTop: spacing.md }}><Input placeholder="Metric value" /><View style={{ flexDirection: 'row', gap: spacing.sm }}><Chip label="Default" /><Chip label="Selected" selected /></View><Button label="Primary action" /><Button label="Utility action" variant="secondary" /><Button label="Destructive action" variant="danger" /></View></AppCard><AppCard><TelemetryLabel>Controls</TelemetryLabel><View style={{ gap: spacing.md, marginTop: spacing.md }}><Segmented options={['Daily', 'Weekly', 'Monthly']} value={selected} onChange={setSelected} /><Checkbox checked={checked} onPress={() => setChecked(!checked)} label="Completed trigger" /><Toggle value={toggled} onChange={setToggled} label="Sensitive masking guard" /><ProgressBar value={0.65} /></View></AppCard><Sheet><TelemetryLabel>Sheet primitive</TelemetryLabel><Text style={[typography.bodyMd, { color: colors.ink, marginTop: spacing.sm }]}>Bottom-sheet container, without blur or shadow.</Text></Sheet></ScrollView>;
}
