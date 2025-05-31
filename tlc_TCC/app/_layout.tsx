import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { UserProvider } from './userContext'; // Certifique-se de que o caminho está correto

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="register" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="notc" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="perf" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="editperf" options={{ headerShown: false }} /> */}
        </Stack>
      </UserProvider>
    </GestureHandlerRootView>
  );
}