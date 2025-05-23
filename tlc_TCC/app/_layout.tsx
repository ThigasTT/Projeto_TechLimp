import { Stack } from "expo-router";

export default function RootLayout(){
  return(
    <Stack>
      <Stack.Screen name='perf' options={{title:'Perfil'}}/>
      <Stack.Screen name='editperf' options={{title:'Atualizar Perfil'}}/>
    </Stack>
)
}