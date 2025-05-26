import { Feather } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { auth } from 'firebaseConfig';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SideMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Feather name="user" size={36} color="#29e263" />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>Seu nome</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>
      </View>

      <View style={styles.menuItems}>
        <Link href="/(tabs)/editperf" asChild>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Feather name="chevron-right" size={18} color="#29e263" />
          </TouchableOpacity>
        </Link>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.menuItem}
          onPress={async () => {
            // Exemplo usando Firebase Auth:
            await auth.signOut();
            router.replace('/login');

            // Exemplo genérico:
            // Limpe o token/autenticação aqui
            // Navegue para a tela de login
            // Se estiver usando expo-router:
            // Faça o logout aqui (ex: limpar AsyncStorage, etc.)
            router.replace('/login');
          }}
        >
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    width: 250,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2b2b2b',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileText: {
    flex: 1,
  },
  name: {
    color: '#29e263',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#888',
    fontSize: 14,
  },
  menuItems: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    color: '#fff',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 5,
  },
  editButton: {
    backgroundColor: 'transparent',
    padding: 0,
    color: '#fff',
  },
});