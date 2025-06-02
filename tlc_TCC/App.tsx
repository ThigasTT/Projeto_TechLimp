import { useFonts } from 'expo-font';
import 'react-native-gesture-handler';
import 'react-native-reanimated';
import * as Location from 'expo-location';
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Navigation from './Navigation'; // supondo que você tenha um navigation/index.tsx
import { UserProvider } from './services/userContext'; // ajuste o caminho se necessário

export default function App() {
  const [fontsLoaded] = useFonts({
    'MadimiOne': require('./assets/fonts/MadimiOne-Regular.ttf'),
  });

  // Solicita permissão de localização ao abrir o app
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      // Se quiser, pode tratar a permissão negada aqui
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </GestureHandlerRootView>
  );
}