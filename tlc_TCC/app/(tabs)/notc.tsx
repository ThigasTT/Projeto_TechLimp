import { router } from 'expo-router';
import React, { useRef } from 'react';
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const scrollRef = useRef<ScrollView>(null);

  const voltarAoTopo = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef}>

        {/* PESQUISAS RECENTES */}
        <Text style={styles.titulo}>Pesquisas recentes</Text>


<View style={styles.pesquisaContainer}>
  <TouchableOpacity onPress={() => router.push('/pesq')}>
    <Text style={{ color: '#a9a9a9', fontSize: 16, fontWeight: 'bold' }}>
      Pesquisa Recente
    </Text>
  </TouchableOpacity>
</View>

        {/* FEED DE NOTÍCIAS */}
        <Text style={styles.titulo}>Feed de notícias</Text>

        {/* CARD 1 */}
        <View style={styles.card}>
          <TouchableOpacity
          onPress={()=> Linking.openURL('https://pt.wikipedia.org/wiki/The_Handmaid%27s_Tale_(s%C3%A9rie_de_televis%C3%A3o)')}>
     <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsmR96rnub9jzI-mne-wSRgUmZOKAxcZpNzA&s' }}
              style={styles.imagem}></Image>


          <View style={styles.textoContainer}>
            <Text style={styles.texto}>
              Brasil é 5º país que mais gera lixo eletrônico, mas só 3% é descartado corretamente; saiba como fazer
            </Text>
          </View>

          </TouchableOpacity>
        </View>

        {/* CARD 2 */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.gazetadopovo.com.br/vida-e-cidadania/reciclagem-lixo-eletronico/')}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xbSx6mNwhTT8YkEhmHe-e5t-9KF1lWN1Jw&s' }}
            style={styles.imagem}
          />
          <View style={styles.textoContainer}>
            <Text style={styles.texto}>
              22ª edição do Ecolions arrecada mais de 6 toneladas de lixo eletrônico
            </Text>
          </View>
        </TouchableOpacity>
      </View>

        {/* CARD 3 */}
       <View style={styles.card}>
      <TouchableOpacity onPress={() => Linking.openURL('https://g1.globo.com/mg/triangulo-mineiro/noticia/2023/10/16/quase-50-toneladas-de-lixo-eletronico-sao-descartadas-todo-mes-em-uberlandia-saiba-como-fazer-o-processo-de-forma-correta.ghtml')}>
 <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsmR96rnub9jzI-mne-wSRgUmZOKAxcZpNzA&s' }}
              style={styles.imagem}>

              </Image>

          <View style={styles.textoContainer}>
            <Text style={styles.texto}>
              Quase 50 toneladas de lixo eletrônico são descartadas todo mês em Uberlândia; saiba como fazer o processo de forma correta
            </Text>
          </View>
          </TouchableOpacity>
        </View>

        {/* CARD 4 */}
        <View style={styles.card}>
      <TouchableOpacity onPress={() => Linking.openURL('https://www.ecosaude.org.br/noticias/ecosaude-arrecada-mais-de-26-toneladas-de-lixo-eletronico/')}>
 <Image
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9xbSx6mNwhTT8YkEhmHe-e5t-9KF1lWN1Jw&s' }}
              style={styles.imagem}>

              </Image>

          <View style={styles.textoContainer}>
            <Text style={styles.texto}>
             ECOSAÚDE ARRECADA MAIS DE 2,6 TONELADAS DE LIXO ELETRÔNICO
            </Text>
          </View>
          </TouchableOpacity>
        </View>

        {/* BOTÃO VOLTAR AO TOPO */}
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
    marginBottom: 12,
  },
  pesquisaContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    color: '#00A86B',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#29e263',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: 160,
    borderRadius: 0, 
  },
  textoContainer: {
    backgroundColor: '#00A86B',
    padding: 8,
  },
  texto: {
    color: '#fff',
    fontSize: 14,
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
