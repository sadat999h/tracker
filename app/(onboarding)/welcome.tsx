import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, radii } from '@/theme/tokens';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.hero}>
          <Text style={[typography.labelSm, styles.overline]}>DAYMARK</Text>
          <Text style={[typography.displayLg, styles.heading]}>Your life,{'\n'}measured.</Text>
          <Text style={[typography.bodyMd, styles.body]}>
            Track water, sleep, weight, habits, workouts, and more — all offline,
            all private. No account. No cloud. No ads.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}
            onPress={() => router.push('/(onboarding)/profile')}
            accessibilityRole="button"
            accessibilityLabel="Get started with Daymark"
          >
            <Text style={[typography.labelLg, { color: colors.signalDark }]}>Get started</Text>
          </Pressable>
          <Text style={[typography.bodySm, styles.hint]}>
            Works offline · Data stays on your device
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.md,
  },
  overline: {
    color: colors.signal,
    letterSpacing: 2,
  },
  heading: {
    color: colors.ink,
  },
  body: {
    color: colors.muted,
    lineHeight: 22,
  },
  actions: {
    gap: spacing.sm,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: radii.control,
    backgroundColor: colors.signal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
  hint: {
    color: colors.muted,
    textAlign: 'center',
  },
});
