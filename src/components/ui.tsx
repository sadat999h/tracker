import type { ComponentProps, ReactNode } from 'react';
import { Pressable, Text, TextInput, View, type TextStyle, type ViewStyle } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, cardBorder, numeric, radii, spacing, typography } from '@/theme/tokens';

type Variant = 'primary' | 'secondary' | 'quiet' | 'danger';

export function AppCard({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[{ backgroundColor: colors.surface, borderRadius: radii.card, padding: spacing.md }, cardBorder, style]}>{children}</View>;
}

export function TelemetryLabel({ children, style }: { children: ReactNode; style?: TextStyle }) {
  return <Text style={[typography.labelSm, { color: colors.muted, textTransform: 'uppercase' }, style]}>{children}</Text>;
}

export function Chip({ label, selected = false, onPress }: { label: string; selected?: boolean; onPress?: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [{ minHeight: 32, paddingHorizontal: 10, borderRadius: radii.control, justifyContent: 'center', backgroundColor: selected ? colors.surfaceHigh : colors.surface, borderWidth: 1, borderColor: selected ? colors.signal : colors.surfaceHigh, opacity: pressed ? 0.78 : 1 }]}><Text style={[typography.labelMd, { color: selected ? colors.ink : colors.muted }]}>{label}</Text></Pressable>;
}

export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange?: (value: string) => void }) {
  return <View style={[{ flexDirection: 'row', gap: 4, padding: 4, borderRadius: radii.control, backgroundColor: colors.surface }, cardBorder]}>{options.map((option) => <Pressable key={option} onPress={() => onChange?.(option)} style={{ flex: 1, minHeight: 36, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: value === option ? colors.surfaceHigh : 'transparent' }}><Text style={[typography.labelMd, { color: value === option ? colors.ink : colors.muted }]}>{option}</Text></Pressable>)}</View>;
}

export function Ring({ value, total, size = 96, stroke = 7, label, caption }: { value: number; total: number; size?: number; stroke?: number; label?: string; caption?: string }) {
  const safeTotal = Math.max(total, 1);
  const progress = Math.max(0, Math.min(value / safeTotal, 1));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  return <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}><Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}><Circle cx={size / 2} cy={size / 2} r={radius} stroke={colors.surfaceHigh} strokeWidth={stroke} fill="none" /><Circle cx={size / 2} cy={size / 2} r={radius} stroke={colors.signal} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)} fill="none" /></Svg><Text style={[typography.displayMd, numeric, { color: colors.ink, fontSize: size >= 90 ? 32 : 22, lineHeight: size >= 90 ? 36 : 26 }]}>{label ?? Math.round(progress * 100)}</Text>{caption ? <Text style={[typography.labelSm, { color: colors.muted }]}>{caption}</Text> : null}</View>;
}

export function Checkbox({ checked, onPress, label }: { checked: boolean; onPress?: () => void; label?: string }) {
  return <Pressable accessibilityRole="checkbox" accessibilityState={{ checked }} onPress={onPress} style={{ minHeight: 28, flexDirection: 'row', alignItems: 'center', gap: 10 }}><View style={{ width: 24, height: 24, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: checked ? colors.signal : colors.surfaceHigh, borderWidth: 1, borderColor: checked ? colors.signal : colors.surfaceHigh }}><Text style={[typography.labelMd, { color: checked ? colors.signalDark : 'transparent' }]}>✓</Text></View>{label ? <Text style={[typography.bodyMd, { color: colors.ink }]}>{label}</Text> : null}</Pressable>;
}

export function Toggle({ value, onChange, label }: { value: boolean; onChange?: (value: boolean) => void; label?: string }) {
  return <Pressable accessibilityRole="switch" accessibilityState={{ checked: value }} onPress={() => onChange?.(!value)} style={{ minHeight: 32, flexDirection: 'row', gap: 10, alignItems: 'center' }}>{label ? <Text style={[typography.bodyMd, { color: colors.ink, flex: 1 }]}>{label}</Text> : null}<View style={{ width: 40, height: 24, borderRadius: radii.full, padding: 2, backgroundColor: value ? colors.signal : colors.surfaceHighest, justifyContent: 'center', alignItems: value ? 'flex-end' : 'flex-start' }}><View style={{ width: 20, height: 20, borderRadius: radii.full, backgroundColor: value ? colors.signalDark : colors.muted }} /></View></Pressable>;
}

export function Button({ label, onPress, variant = 'primary', disabled = false }: { label: string; onPress?: () => void; variant?: Variant; disabled?: boolean }) {
  const background = variant === 'primary' ? colors.signal : variant === 'secondary' ? colors.surfaceHigh : 'transparent';
  const text = variant === 'primary' ? colors.signalDark : variant === 'danger' ? colors.error : colors.ink;
  return <Pressable disabled={disabled} onPress={onPress} style={({ pressed }) => [{ minHeight: 48, paddingHorizontal: 16, borderRadius: radii.control, backgroundColor: background, borderWidth: variant === 'quiet' || variant === 'danger' ? 1 : 0, borderColor: variant === 'danger' ? colors.secondaryContainer : colors.surfaceHigh, alignItems: 'center', justifyContent: 'center', opacity: disabled ? 0.5 : pressed ? 0.8 : 1 }]}><Text style={[typography.labelLg, { color: text }]}>{label}</Text></Pressable>;
}

export function Sheet({ children }: { children: ReactNode }) { return <View style={{ borderTopLeftRadius: radii.sheet, borderTopRightRadius: radii.sheet, backgroundColor: colors.surfaceHigh, padding: spacing.md }}>{children}</View>; }

export function Input(props: ComponentProps<typeof TextInput>) { return <TextInput placeholderTextColor={colors.muted} style={[typography.bodyMd, { height: 48, paddingHorizontal: spacing.md, borderRadius: radii.control, borderWidth: 1, borderColor: colors.surfaceHigh, backgroundColor: colors.surface, color: colors.ink }, props.style]} {...props} />; }

export function ProgressBar({ value }: { value: number }) { return <View style={{ height: 6, overflow: 'hidden', borderRadius: radii.full, backgroundColor: colors.surfaceHigh }}><View style={{ width: `${Math.max(0, Math.min(value, 1)) * 100}%`, height: '100%', borderRadius: radii.full, backgroundColor: colors.signal }} /></View>; }

export function MetricTile({ label, value, unit, detail, progress, icon }: { label: string; value: string; unit?: string; detail?: string; progress?: number; icon?: string }) { return <AppCard style={{ flex: 1, minHeight: 152, justifyContent: 'space-between', padding: spacing.md }}><View><View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}><Text style={[typography.labelMd, { color: colors.muted }]}>{label}</Text>{icon ? <Text style={[typography.labelLg, { color: colors.signal }]}>{icon}</Text> : null}</View><View style={{ flexDirection: 'row', alignItems: 'baseline', flexWrap: 'wrap', marginTop: spacing.sm }}><Text style={[typography.headlineMd, numeric, { color: colors.ink }]}>{value}</Text>{unit ? <Text style={[typography.labelSm, { color: colors.muted, marginLeft: 4 }]}>{unit}</Text> : null}</View></View><View>{progress !== undefined ? <ProgressBar value={progress} /> : null}{detail ? <Text numberOfLines={2} style={[typography.labelSm, { color: colors.mutedWarm, marginTop: progress !== undefined ? spacing.sm : 0 }]}>{detail}</Text> : null}</View></AppCard>; }
