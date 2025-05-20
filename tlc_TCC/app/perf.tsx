import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function perf() {
  return (
    <View style={styles.container}>
      
      {/* Ícone de voltar */}
      <TouchableOpacity style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="#29e263" />
      </TouchableOpacity>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Feather name="user" size={64} color="#29e263" />
      </View>

      {/* Nome */}
      <Text style={styles.nome}>Seu nome</Text>

      {/* Editar perfil */}
      <TouchableOpacity style={styles.editarContainer}>
        <Link href={"/atualizar"}><Text style={styles.editarTexto}>Editar Perfil</Text></Link>
        <Feather name="edit-2" size={16} color="#29e263" style={{ marginLeft: 6 }} />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    paddingTop: 60,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1f1f1f',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#29e263',
    marginBottom: 8,
  },
  editarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editarTexto: {
    color: '#29e263',
    fontSize: 14,
    fontWeight: '600',
  },
});