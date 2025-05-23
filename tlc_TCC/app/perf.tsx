import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SideMenu() {
  return (
    <View style={styles.container}>
      {/* Seção do perfil */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Feather name="user" size={36} color="#29e263" />
        </View>
        <View style={styles.profileText}>
          <Text style={styles.name}>Seu nome</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>
      </View>

      {/* Itens do menu */}
      <View style={styles.menuItems}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}><Link href={'/editperf'}>Editar Perfil</Link></Text>
          <Feather name="chevron-right" size={18} color="#29e263" />
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
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
});