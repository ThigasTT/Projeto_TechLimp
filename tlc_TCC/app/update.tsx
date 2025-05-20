import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router'

export default function conf() {
  const [nome, setNome] = useState('Arthur');
  const [telefone, setTelefone] = useState('(11) 90000-4009');
  const [email, setEmail] = useState('arthurtech@gmail.com');
  const [cep, setCep] = useState('09580-209');

  return (
    <View style={styles.container}>
   
    <Link href="/perf">
  <TouchableOpacity>
    <Feather name="arrow-left" size={24} color="#5cff9b" style={styles.backIcon} />
  </TouchableOpacity>
</Link>

      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Feather name="plus" size={32} color="#5cff9b" />
        </View>
      </View>

      {/* Campos */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
          <Feather name="edit-2" size={20} color="#15400e" />
        </View>

        <Text style={styles.label}>Tel</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />
          <Feather name="edit-2" size={20} color="#15400e" />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
          <Feather name="edit-2" size={20} color="#15400e" />
        </View>

        <Text style={styles.label}>CEP</Text>
        <View style={styles.inputRow}>
          <TextInput style={styles.input} value={cep} onChangeText={setCep} keyboardType="numeric" />
          <Feather name="edit-2" size={20} color="#15400e" />
        </View>
      </View>

      {/* Botão de atualizar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atualizar</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    padding: 20,
  },
  backIcon: {
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldContainer: {
    marginBottom: 30,
  },
  label: {
    color: '#5cff9b',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1f4a18',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#006400',
    fontSize: 16,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#29e263',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});