import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppCard, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

export default function WidgetsScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[typography.headlineLg, { color: colors.ink }]}>Widgets</Text>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: 2 }]}>
            Android home screen widgets
          </Text>
        </View>

        <AppCard style={styles.card}>
          <TelemetryLabel>Coming soon</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted }]}>
            Home screen widgets will be available in a future update.
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
