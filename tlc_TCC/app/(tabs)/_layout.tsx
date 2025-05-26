// app/(tabs)/_layout.tsx
import { FontAwesome } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';


export default function TabLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    // Tela de carregamento enquanto verifica a autenticação
    return null; // Ou um <ActivityIndicator />
  }

  // Se o usuário NÃO estiver autenticado, redireciona para a tela de login
  if (!isAuthenticated) {
    return <Redirect href="/login" />; // <<< MUDANÇA CRÍTICA AQUI!
                                      // Aponta para sua rota de login real
  }

  return (
    <Tabs>
      {/* Aqui você define cada aba. Os "name" devem corresponder aos nomes dos arquivos dentro de (tabs) */}
      <Tabs.Screen
        name="notc" // Corresponde a app/(tabs)/notc.tsx
        options={{
          title: 'Notícias',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="newspaper-o" color={color} />,
          headerShown: false // Opcional: Oculta o header nesta tela
        }}
      />
      <Tabs.Screen
        name="perf" // Corresponde a app/(tabs)/perf.tsx
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
          headerShown: false // Opcional: Oculta o header nesta tela
        }}
      />
      {/* Adicione outras abas conforme necessário, por exemplo, editperf */}
      <Tabs.Screen
        name="editperf" // Corresponde a app/(tabs)/editperf.tsx
        options={{
          title: 'Editar Perfil',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="edit" color={color} />,
          headerShown: false,
          href: null // Opcional: Para ocultar esta aba da tab bar mas ainda poder navegar para ela
        }}
      />
    </Tabs>
  );
}