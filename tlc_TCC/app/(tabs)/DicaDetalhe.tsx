import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DicaDetalhe() {
  const route = useRoute();
  const navigation = useNavigation();
  const { dica } = route.params as { dica: { titulo: string; texto: string } };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{dica.titulo}</Text>
      <Text style={styles.texto}>{dica.texto}</Text>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    color: '#00A86B',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#00A86B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});