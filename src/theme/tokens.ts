import type { TextStyle, ViewStyle } from 'react-native';

export const colors = {
  canvas: '#131315',
  surfaceLowest: '#0E0E10',
  surfaceLow: '#1C1B1D',
  surface: '#201F21',
  surfaceHigh: '#2A2A2C',
  surfaceHighest: '#353437',
  ink: '#E5E1E4',
  muted: '#919096',
  mutedWarm: '#E7BDB9',
  outline: '#AD8885',
  outlineVariant: '#5D3F3D',
  signal: '#FF5352',
  signalSoft: '#FFB3AE',
  signalDark: '#5C0009',
  secondary: '#FFB3B2',
  secondaryContainer: '#8A212A',
  error: '#FFB4AB',
} as const;

export const spacing = { xs: 4, sm: 8, gutter: 12, md: 16, lg: 24, xl: 32 } as const;
export const radii = { control: 8, card: 16, sheet: 24, full: 9999 } as const;

export const typography = {
  displayLg: { fontFamily: 'Inter_600SemiBold', fontSize: 40, lineHeight: 44, letterSpacing: -1.6 },
  displayMd: { fontFamily: 'Inter_600SemiBold', fontSize: 32, lineHeight: 36, letterSpacing: -0.96 },
  headlineLg: { fontFamily: 'Inter_600SemiBold', fontSize: 24, lineHeight: 30, letterSpacing: -0.48 },
  headlineMd: { fontFamily: 'Inter_600SemiBold', fontSize: 20, lineHeight: 26, letterSpacing: -0.3 },
  headlineSm: { fontFamily: 'Inter_600SemiBold', fontSize: 16, lineHeight: 22, letterSpacing: -0.16 },
  bodyMd: { fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 20, letterSpacing: -0.07 },
  bodySm: { fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 16 },
  labelLg: { fontFamily: 'Inter_600SemiBold', fontSize: 14, lineHeight: 18, letterSpacing: 0.28 },
  labelMd: { fontFamily: 'Inter_600SemiBold', fontSize: 12, lineHeight: 16, letterSpacing: 0.48 },
  labelSm: { fontFamily: 'Inter_600SemiBold', fontSize: 10, lineHeight: 14, letterSpacing: 0.6 },
} satisfies Record<string, TextStyle>;

export const numeric: TextStyle = { fontFamily: 'Inter_600SemiBold', fontVariant: ['tabular-nums'] };
export const cardBorder: ViewStyle = { borderWidth: 1, borderColor: colors.surfaceHigh };
