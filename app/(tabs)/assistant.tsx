import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppCard, Button, TelemetryLabel } from '@/components';
import { colors, spacing, typography } from '@/theme/tokens';

/**
 * Assistant tab — Phase 0 skeleton.
 * AI features require opt-in in Settings → AI Assistant.
 * No network calls until the user enables AI and adds a key.
 */
export default function AssistantScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[typography.headlineLg, { color: colors.ink }]}>AI Assistant</Text>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: 2 }]}>
            Optional · uses Google Gemini
          </Text>
        </View>

        <AppCard style={styles.card}>
          <TelemetryLabel>AI features are off</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.ink, marginTop: spacing.sm }]}>
            Everything in Daymark works without AI. The assistant is optional and
            sends your aggregated daily numbers to Google Gemini when you ask it
            a question.
          </Text>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: spacing.sm }]}>
            Medication names and doses are masked by default. Raw notes are never
            sent unless you opt in.
          </Text>
          <Text style={[typography.bodySm, { color: colors.muted, marginTop: spacing.sm }]}>
            Free-tier Gemini API data may be used by Google to improve its
            products. Check Google AI Studio&apos;s terms for the current policy.
          </Text>
        </AppCard>

        <AppCard style={styles.card}>
          <TelemetryLabel>To get started</TelemetryLabel>
          <Text style={[typography.bodyMd, { color: colors.muted, marginTop: spacing.sm }]}>
            1. Get a free key at aistudio.google.com/apikey{'\n'}
            2. Enable AI in Settings → AI Assistant{'\n'}
            3. Paste your key, test it, and accept the privacy notice
          </Text>
          <View style={{ marginTop: spacing.md }}>
            <Button
              label="Open AI Settings"
              variant="secondary"
              // Route created in Phase 6 — show coming-soon for now
              onPress={() => router.push('/profile' as never)}
            />
          </View>
        </AppCard>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  scroll: { padding: spacing.md, paddingBottom: 116, gap: spacing.lg },
  header: { gap: 2 },
  card: { gap: spacing.sm },
});
