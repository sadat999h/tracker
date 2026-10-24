import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AppCard, Button, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';
import { deleteEntry, getMetricHistory } from '@/features/health/data/metricRepository';

export default function MetricHistoryScreen() {
  const { key } = useLocalSearchParams<{ key: string }>();
  const [entriesList, setEntriesList] = useState<Awaited<ReturnType<typeof getMetricHistory>>>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!key) return;
    setLoading(true);
    const data = await getMetricHistory(key);
    setEntriesList(data);
    setLoading(false);
  };

  useEffect(() => { void load(); }, [key]);

  return <View style={{ flex: 1, backgroundColor: colors.canvas, padding: spacing.md }}>
    <TelemetryLabel>Telemetry Metric History</TelemetryLabel>
    <Text style={[typography.headlineLg, { color: colors.ink, marginBottom: spacing.md }]}>{key?.toUpperCase() ?? 'Metric'} Records</Text>
    {loading ? <Text style={[typography.bodyMd, { color: colors.muted }]}>Loading history...</Text> : entriesList.length === 0 ? <AppCard><Text style={[typography.bodyMd, { color: colors.muted }]}>No historical records found for this metric.</Text></AppCard> : <ScrollView contentContainerStyle={{ gap: spacing.sm }}>
      {entriesList.map((entry) => <AppCard key={entry.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><View><Text style={[typography.headlineSm, { color: colors.ink }]}>{entry.valueNum ?? entry.valueText ?? 'Logged'}</Text><Text style={[typography.labelSm, { color: colors.muted }]}>{entry.day} • {new Date(entry.ts).toLocaleTimeString()}</Text></View><Button label="Delete" variant="danger" onPress={async () => { await deleteEntry(entry.id); void load(); }} /></AppCard>)}
    </ScrollView>}
  </View>;
}
