import { Stack } from "expo-router";

export default function RootLayout(){
  return(
    <Stack>
      <Stack.Screen name='perf' options={{title:'Perfil'}}/>
      <Stack.Screen name='update' options={{title:'update'}}/>
    </Stack>
)
}