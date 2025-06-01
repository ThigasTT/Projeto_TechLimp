import React, { useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const dicas = [
  {
    titulo: 'Descarte em Locais Apropriados',
    texto: 'Procure pontos de coleta específicos para lixo eletrônico em sua cidade. Nunca descarte eletrônicos no lixo comum.',
  },
  {
    titulo: 'Remova Dados Pessoais',
    texto: 'Antes de descartar celulares ou computadores, apague todos os dados pessoais e restaure as configurações de fábrica.',
  },
  {
    titulo: 'Doe ou Reaproveite',
    texto: 'Se o aparelho ainda funciona, considere doar para instituições ou pessoas que possam utilizá-lo.',
  },
  {
    titulo: 'Separe Pilhas e Baterias',
    texto: 'Pilhas e baterias devem ser descartadas separadamente em pontos de coleta específicos devido ao risco de contaminação.',
  },
];

export default function App() {
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();

  const voltarAoTopo = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  const abrirDica = (dica: { titulo: string; texto: string }) => {
    navigation.navigate('DicaDetalhe', { dica });
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef}>
        <Text style={styles.titulo}>Dicas sobre lixo eletrônico</Text>

        {dicas.map((dica, idx) => (
          <View style={styles.card} key={idx}>
            <TouchableOpacity onPress={() => abrirDica(dica)}>
              <View style={styles.textoContainer}>
                <Text style={styles.textoTitulo}>{dica.titulo}</Text>
                <Text style={styles.textoSecundario}>Toque para ver a dica</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.botao} onPress={voltarAoTopo}>
          <Text style={styles.textoBotao}>Voltar ao topo ▲</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  titulo: {
    color: '#00A86B',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#29e263',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  textoContainer: {
    backgroundColor: '#00A86B',
    padding: 16,
    alignItems: 'center',
  },
  textoTitulo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  textoSecundario: {
    color: '#e0e0e0',
    fontSize: 13,
  },
  botao: {
    backgroundColor: '#00A86B',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});