import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'MadimiOne': require('../assets/fonts/MadimiOne-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack>
      {/* Garante que a tela de login seja a primeira a ser considerada */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Opcional: Para desativar outras telas e focar no login */}
      {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="register" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="notc" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="perf" options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name="editperf" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
