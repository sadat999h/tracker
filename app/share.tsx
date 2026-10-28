import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppCard, Button, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function ShareScreen() {

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[typography.headlineLg, { color: colors.ink }]}>Export</Text>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: 2 }]}>
            Back up or share your data
          </Text>
        </View>

        <AppCard style={styles.card}>
          <TelemetryLabel>CSV export</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Export all your logged data as a CSV file you can open in any spreadsheet app.
          </Text>
          <Button
            label="Export CSV — coming soon"
            variant="secondary"
            disabled
            onPress={() => { /* Phase 5 */ }}
          />
        </AppCard>

        <AppCard style={styles.card}>
          <TelemetryLabel>Backup reminder</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Your data is stored only on this device. If you lose your phone without exporting,
            your data cannot be recovered.
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
