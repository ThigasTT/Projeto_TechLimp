import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="perf" 
        options={{ 
          title: 'Perfil',
          headerShown: false // Adicione esta linha se quiser cabeçalho oculto
        }} 
      />
      <Stack.Screen 
        name="editperf" 
        options={{ 
          title: 'Atualizar Perfil',
          headerLeft: () => null // Isso remove o botão de voltar padrão
        }} 
      />
    </Stack>
  );
}