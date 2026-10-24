import { ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { AppCard, Button, TelemetryLabel, Toggle } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function ProfileScreen() {
  const router = useRouter();

  return <View style={{ flex: 1, backgroundColor: colors.canvas }}>
    <ScrollView contentContainerStyle={{ padding: spacing.md, paddingBottom: 116, gap: spacing.md }} showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View><Text style={[typography.headlineLg, { color: colors.ink }]}>Alex Vance</Text><Text style={[typography.labelSm, { color: colors.muted, marginTop: 2 }]}>ID #8842-DELTA // ZERO-KNOWLEDGE VAULT</Text></View>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceHigh, alignItems: 'center', justifyContent: 'center' }}><Text style={[typography.headlineMd, { color: colors.signalSoft }]}>A</Text></View>
      </View>

      <AppCard style={{ gap: spacing.sm }}>
        <TelemetryLabel>Quick Navigation &amp; Tools</TelemetryLabel>
        <Button label="Notification &amp; Reminder Center" variant="secondary" onPress={() => router.push('/notifications')} />
        <Button label="Social Share &amp; Export Config" variant="secondary" onPress={() => router.push('/share')} />
        <Button label="Android Home Screen Widgets" variant="secondary" onPress={() => router.push('/widgets')} />
      </AppCard>

      <AppCard style={{ gap: spacing.md }}>
        <TelemetryLabel>Data Sovereignty &amp; Vault</TelemetryLabel>
        <Toggle value label="Biometric App Enclave (Face ID)" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><Text style={[typography.bodyMd, { color: colors.ink }]}>On-Device Storage</Text><Text style={[typography.labelSm, { color: colors.signal }]}>AES-256 ENCRYPTED</Text></View>
        <Button label="Purge Account &amp; Erase All Records" variant="danger" onPress={() => alert('Account purge initiated.')} />
      </AppCard>
    </ScrollView>
  </View>;
}
