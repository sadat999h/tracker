import { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppCard, TelemetryLabel, Toggle } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function NotificationsScreen() {
  const [quietHours, setQuietHours] = useState(true);
  const [medOverride, setMedOverride] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[typography.headlineLg, { color: colors.ink }]}>Notifications</Text>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: 2 }]}>
            Reminders and quiet hours
          </Text>
        </View>

        <AppCard style={styles.card}>
          <TelemetryLabel>Quiet hours</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Suppress non-critical notifications between 22:30 and 06:30.
          </Text>
          <Toggle value={quietHours} onChange={setQuietHours} label="Enable quiet hours" />
          <Toggle value={medOverride} onChange={setMedOverride} label="Always allow medication reminders" />
        </AppCard>

        <AppCard style={styles.card}>
          <TelemetryLabel>Scheduled reminders</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Reminder scheduling is coming in a future update.
          </Text>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  scroll: { padding: spacing.md, paddingBottom: 40, gap: spacing.md },
  header: { gap: 2 },
  card: { gap: spacing.sm },
});
