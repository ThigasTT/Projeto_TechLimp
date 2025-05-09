import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

export default function CadastroScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.logo}>
        <Text style={styles.tech}>TECH</Text>
        <Text style={styles.limp}>LIMP</Text>
      </Text>

      <Text style={styles.titulo}>Cadastro</Text>

      <TextInput placeholder="Email" placeholderTextColor="#00FF7F" style={styles.input} />
      <TextInput placeholder="Senha" placeholderTextColor="#00FF7F" secureTextEntry style={styles.input} />
      <TextInput placeholder="Telefone" placeholderTextColor="#00FF7F" style={styles.input} />

      <Text style={styles.subtitulo}>Endereço</Text>

      <TextInput placeholder="CEP" placeholderTextColor="#00FF7F" style={styles.input} />
      <TextInput placeholder="Número" placeholderTextColor="#00FF7F" style={styles.input} />
      <TextInput placeholder="Complemento (Opcional)" placeholderTextColor="#00FF7F" style={styles.input} />

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Criar</Text>
      </TouchableOpacity>

      <Text style={styles.socialText}>Você também pode cadastrar com...</Text>
      <View style={styles.socialIcons}>
        <FontAwesome name="facebook" size={24} color="white" style={styles.icon} />
        <AntDesign name="google" size={24} color="white" style={styles.icon} />
        <AntDesign name="apple1" size={24} color="white" style={styles.icon} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    marginBottom: 10,
  },
  tech: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  limp: {
    color: '#00FF7F',
    fontWeight: 'bold',
  },
  titulo: {
    fontSize: 24,
    color: '#00FF7F',
    marginVertical: 10,
  },
  subtitulo: {
    fontSize: 18,
    color: '#00FF7F',
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#00FF7F',
    borderRadius: 8,
    padding: 10,
    color: '#fff',
    marginVertical: 5,
  },
  botao: {
    backgroundColor: '#00FF7F',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  socialText: {
    marginTop: 20,
    color: '#ccc',
    fontSize: 14,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
});
