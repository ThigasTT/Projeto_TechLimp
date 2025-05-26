import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Pesquisas recentes</Text>
        <View style={styles.row}>
          <View style={styles.cardSmall}>
            <Image
              source={{ uri: 'https://i.imgur.com/5xhcZB9.jpeg' }}
              style={styles.cardImageSmall}
            />
            <Text style={styles.cardTextSmall}>
              Venâncio Aires promove recolhimento de lixo eletrônico, vidros e óleo de cozinha neste sábado
            </Text>
          </View>
          <View style={styles.cardSmall}>
            <Image
              source={{ uri: 'https://i.imgur.com/TdN7EoD.jpeg' }}
              style={styles.cardImageSmall}
            />
            <Text style={styles.cardTextSmall}>
              Cotiporã: coleta de lixo eletrônico ocorre entre os dias 12 e 14 de maio
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Feed de notícias</Text>

        {[
          {
            text: 'Brasil é 5º país que mais gera lixo eletrônico, mas só 3% é descartado corretamente; saiba como fazer',
            img: 'https://i.imgur.com/zC8CPga.jpeg',
          },
          {
            text: '22ª edição do Ecolions arrecada mais de 6 toneladas de lixo eletrônico',
            img: 'https://i.imgur.com/YYi40Lj.jpeg',
          },
          {
            text: 'Você sabe descartar lixo eletrônico corretamente? Veja 5 dicas',
            img: 'https://i.imgur.com/B01xNym.jpeg',
          },
          {
            text: 'Quase 50 toneladas de lixo eletrônico são descartadas todo mês em Uberlândia; saiba como fazer o processo de forma correta',
            img: 'https://i.imgur.com/cc82fsX.jpeg',
          },
        ].map((item, index) => (
          <View key={index} style={styles.card}>
            <Image source={{ uri: item.img }} style={styles.cardImage} />
            <Text style={styles.cardText}>{item.text}</Text>
          </View>
        ))}

        <TouchableOpacity style={styles.backToTop}>
          <Text style={styles.backToTopText}>Voltar ao topo</Text>
          <AntDesign name="arrowup" size={16} color="#46f47a" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: '#46f47a',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  cardSmall: {
    backgroundColor: '#36602c',
    borderRadius: 12,
    width: '48%',
    overflow: 'hidden',
  },
  cardImageSmall: {
    width: '100%',
    height: 80,
  },
  cardTextSmall: {
    fontSize: 12,
    color: '#fff',
    padding: 8,
  },
  card: {
    backgroundColor: '#36602c',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 120,
  },
  cardText: {
    fontSize: 13,
    color: '#fff',
    padding: 10,
  },
  backToTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  backToTopText: {
    color: '#46f47a',
    fontSize: 16,
    marginRight: 6,
  },
});