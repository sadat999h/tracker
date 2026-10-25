import '../global.css';
import { Inter_400Regular, Inter_600SemiBold, useFonts as useInterFonts } from '@expo-google-fonts/inter';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, fontError] = useInterFonts({ Inter_400Regular, Inter_600SemiBold });

  useEffect(() => {
    if (!interLoaded && !fontError) return;
    if (fontError) console.error('Failed to load Inter fonts:', fontError);
    void SplashScreen.hideAsync().catch((error: unknown) => {
      console.error('Failed to hide splash screen:', error);
    });
  }, [interLoaded, fontError]);
  if (!interLoaded && !fontError) return null;

  return <SafeAreaProvider><Stack screenOptions={{ headerShown: false, animation: 'fade' }}><Stack.Screen name="(tabs)" /><Stack.Screen name="components" options={{ presentation: 'modal' }} /></Stack></SafeAreaProvider>;
}
