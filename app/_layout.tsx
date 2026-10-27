import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { eq } from 'drizzle-orm';
import { Stack } from 'expo-router';
import {
  Inter_400Regular,
  Inter_600SemiBold,
  useFonts as useInterFonts,
} from '@expo-google-fonts/inter';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Bootstrap } from '@/components/Bootstrap';
import { getDb } from '@/db/client';
import { settings } from '@/db/schema';

void SplashScreen.preventAutoHideAsync();

function useOnboardingRedirect(bootstrapDone: boolean) {
  const router = useRouter();

  useEffect(() => {
    if (!bootstrapDone) return;
    try {
      const db = getDb();
      const row = db
        .select()
        .from(settings)
        .where(eq(settings.key, 'onboarding_complete'))
        .get();
      const complete = row?.valueJson === 'true';
      if (!complete) {
        // Use replace so the back button doesn't take the user back to an empty tabs screen
        router.replace('/(onboarding)/welcome' as never);
      }
    } catch {
      // Bootstrap hasn't finished or db not open yet — Bootstrap component handles this
    }
  }, [bootstrapDone, router]);
}

function RootNavigator() {
  const [bootstrapDone, setBootstrapDone] = useState(false);
  useOnboardingRedirect(bootstrapDone);

  return (
    <Bootstrap onReady={() => setBootstrapDone(true)}>
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(onboarding)" />
      </Stack>
    </Bootstrap>
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

  if (!interLoaded && !fontError) return null;

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
}
