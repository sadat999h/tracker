import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Bootstrap } from '@/components/Bootstrap';
import { getDb } from '@/db/client';
import { settings } from '@/db/schema';
import { eq } from 'drizzle-orm';

void SplashScreen.preventAutoHideAsync();

function useOnboardingCheck() {
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (onboardingComplete !== null) return;
    try {
      const db = getDb();
      const row = db
        .select()
        .from(settings)
        .where(eq(settings.key, 'onboarding_complete'))
        .get();
      const complete = row?.valueJson === 'true';
      setOnboardingComplete(complete);
      if (!complete) {
        router.replace('/(onboarding)/welcome');
      }
    } catch {
      // Bootstrap hasn't finished yet — wait
    }
  }, [onboardingComplete, router, segments]);

  return onboardingComplete;
}

function RootNavigator() {
  useOnboardingCheck();

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(onboarding)" />
    </Stack>
  );
}

export default function RootLayout() {
  const [interLoaded, fontError] = useInterFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  useEffect(() => {
    if (!interLoaded && !fontError) return;
    if (fontError) console.error('Font load error (non-fatal):', fontError);
    void SplashScreen.hideAsync().catch((e: unknown) => {
      console.error('SplashScreen.hideAsync error:', e);
    });
  }, [interLoaded, fontError]);

  // Proceed even if fonts failed — system fonts will be used
  if (!interLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <Bootstrap>
        <RootNavigator />
      </Bootstrap>
    </SafeAreaProvider>
  );
}
