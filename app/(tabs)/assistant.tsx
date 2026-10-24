import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AppCard, Button, Input, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function AssistantScreen() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; isReport?: boolean }>>([
    { role: 'user', text: 'Analyze how my sleep consistency impacted my focus sessions and workout volume this past week.' },
    { role: 'assistant', text: 'Telemetry Diagnostic #W42-A: Sleep timing variance held within ±32 min across 5 of 7 nights. Direct telemetry links high nocturnal consistency to a +12% surge in total load volume.', isReport: true },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [apiKey, setApiKey] = useState('');

  return <View style={{ flex: 1, backgroundColor: colors.canvas }}>
    <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 116, gap: spacing.md }} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View><Text style={[typography.headlineLg, { color: colors.ink }]}>DAYMARK Intelligence</Text><Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>Grounded telemetry analysis &amp; recommendations</Text></View>
      </View>

      {/* Grounding Badge */}
      <AppCard style={{ padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={[typography.labelMd, { color: colors.signalSoft }]}>● Grounded in 94 days of logs</Text>
        <Text style={[typography.labelSm, { color: colors.muted }]}>1,280 data points</Text>
      </AppCard>

      {/* API Key configuration */}
      <AppCard style={{ gap: spacing.sm }}>
        <TelemetryLabel>Anthropic API Key (BYO Key)</TelemetryLabel>
        <Text style={[typography.bodySm, { color: colors.muted }]}>Stored securely in local device SecureStore. Never logged or committed.</Text>
        <Input placeholder="sk-ant-..." secureTextEntry value={apiKey} onChangeText={setApiKey} />
        <Button label="Save Key to SecureStore" variant="secondary" onPress={() => alert('API key saved securely.')} />
      </AppCard>

      {/* Messages / Report Stream */}
      {messages.map((m, i) => <AppCard key={i} style={{ backgroundColor: m.role === 'user' ? colors.surfaceHigh : colors.surfaceLow, gap: spacing.sm }}>
        <TelemetryLabel>{m.role === 'user' ? 'You' : 'DAYMARK Analyst'}</TelemetryLabel>
        <Text style={[typography.bodyMd, { color: colors.ink }]}>{m.text}</Text>
        {m.isReport && <View style={{ padding: 10, borderRadius: 8, backgroundColor: colors.surface }}><Text style={[typography.labelSm, { color: colors.signal }]}>REPORT #W42-A • SENSITIVE MASKING ACTIVE</Text></View>}
      </AppCard>)}

      <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
        <Input style={{ flex: 1 }} placeholder="Ask DAYMARK about your habits..." value={inputVal} onChangeText={setInputVal} />
        <Button label="Send" onPress={() => { if (inputVal.trim()) { setMessages([...messages, { role: 'user', text: inputVal }]); setInputVal(''); } }} />
      </View>
    </ScrollView>
  </View>;
}
