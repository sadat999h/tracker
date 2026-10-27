import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, radii, cardBorder } from '@/theme/tokens';
import { getDb } from '@/db/client';
import { settings, profiles } from '@/db/schema';
import { uuid } from '@/lib/ids';

type UnitSystem = 'metric' | 'imperial';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [units, setUnits] = useState<UnitSystem>('metric');
  const [saving, setSaving] = useState(false);

  const canContinue = name.trim().length > 0;

  const handleContinue = async () => {
    if (!canContinue || saving) return;
    setSaving(true);
    try {
      const db = getDb();
      await db.insert(profiles).values({
        id: uuid(),
        name: name.trim(),
        createdAt: new Date(),
      });
      await db
        .insert(settings)
        .values({ key: 'unit_system', valueJson: JSON.stringify(units) })
        .onConflictDoUpdate({ target: settings.key, set: { valueJson: JSON.stringify(units) } });
      await db
        .insert(settings)
        .values({ key: 'onboarding_complete', valueJson: 'true' })
        .onConflictDoUpdate({ target: settings.key, set: { valueJson: 'true' } });
      router.replace('/(tabs)/home');
    } catch (err) {
      setSaving(false);
      Alert.alert('Error', err instanceof Error ? err.message : 'Could not save profile.');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[typography.labelSm, styles.step]}>STEP 1 OF 1</Text>
          <Text style={[typography.headlineLg, styles.title]}>Tell us your name</Text>
          <Text style={[typography.bodyMd, styles.subtitle]}>
            This stays on your device.
          </Text>
        </View>

        <View style={styles.form}>
          <View>
            <Text style={[typography.labelMd, styles.label]}>NAME</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={colors.muted}
              autoFocus
              autoCapitalize="words"
              returnKeyType="done"
              style={[typography.bodyMd, styles.input]}
              accessibilityLabel="Your name"
            />
          </View>

          <View>
            <Text style={[typography.labelMd, styles.label]}>UNITS</Text>
            <View style={styles.segmented}>
              {(['metric', 'imperial'] as UnitSystem[]).map((opt) => (
                <Pressable
                  key={opt}
                  onPress={() => setUnits(opt)}
                  style={[styles.segment, units === opt && styles.segmentActive]}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: units === opt }}
                  accessibilityLabel={opt === 'metric' ? 'Metric (kg, ml)' : 'Imperial (lb, fl oz)'}
                >
                  <Text style={[typography.labelMd, { color: units === opt ? colors.ink : colors.muted }]}>
                    {opt === 'metric' ? 'Metric (kg, ml)' : 'Imperial (lb, fl oz)'}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <Pressable
          onPress={() => { void handleContinue(); }}
          disabled={!canContinue || saving}
          style={({ pressed }) => [
            styles.primaryButton,
            (!canContinue || saving) && styles.disabled,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Continue to the app"
          accessibilityState={{ disabled: !canContinue || saving }}
        >
          <Text style={[typography.labelLg, { color: colors.signalDark }]}>
            {saving ? 'Saving…' : 'Continue'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.canvas },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    gap: spacing.xl,
    justifyContent: 'space-between',
  },
  header: { gap: spacing.sm },
  step: { color: colors.signal, letterSpacing: 2 },
  title: { color: colors.ink },
  subtitle: { color: colors.muted },
  form: { gap: spacing.lg },
  label: { color: colors.muted, marginBottom: spacing.sm },
  input: {
    height: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radii.control,
    borderWidth: 1,
    borderColor: colors.surfaceHigh,
    backgroundColor: colors.surface,
    color: colors.ink,
  },
  segmented: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  segment: {
    flex: 1,
    minHeight: 44,
    borderRadius: radii.control,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    ...cardBorder,
  },
  segmentActive: {
    backgroundColor: colors.surfaceHigh,
    borderColor: colors.signal,
  },
  primaryButton: {
    minHeight: 52,
    borderRadius: radii.control,
    backgroundColor: colors.signal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.8 },
});
