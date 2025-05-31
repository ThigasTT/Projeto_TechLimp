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
    return null; 
  }

  // Se o usuário NÃO estiver autenticado, redireciona para a tela de login
  if (!isAuthenticated) {
    return <Redirect href="./login" />; 
  }

  return (
    <Tabs
      screenOptions={{
      tabBarActiveTintColor: '#29e263', // Cor do ícone/texto ativo
      tabBarInactiveTintColor: '#8e8e93', // Cor do ícone/texto inativo
      tabBarStyle: { backgroundColor: '#2b2b2b' }, // Cor de fundo da barra
      }}
    >
      <Tabs.Screen
      name="notc"
      options={{
        title: 'Notícias',
        tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="newspaper-o" color={color} />,
        headerShown: false 
      }}
      />
      <Tabs.Screen
      name="sidebar"
      options={{
        title: 'Barra Lateral',
        tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="bars" color={color} />,
        headerShown: false
      }}
      />
      <Tabs.Screen
      name="editperf"
      options={{
        title: 'Editar Perfil',
        tabBarIcon: ({ color }: { color: string }) => <FontAwesome size={28} name="edit" color={color} />,
        headerShown: false,
        href: null 
      }}
      />
      <Tabs.Screen
      name="map"
      options={{
        title: 'Mapa',
        tabBarIcon: ({ color }) => (
        <FontAwesome size={28} name="map" color={color} />
        ),
        headerShown: false,
      }}
      />
    </Tabs>
  );
}