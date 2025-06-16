import React, { useMemo, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Button, ActivityIndicator, Linking, Image } from "react-native";
import BottomSheet, { BottomSheetBackgroundProps } from "@gorhom/bottom-sheet";
import axios from "axios";
import Constants from "expo-constants";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;

// Dicas reais com fonte/link
const dicas = [
  {
    titulo: 'Descarte correto de eletrônicos',
    texto: 'Nunca jogue lixo eletrônico no lixo comum. Procure sempre pontos de coleta especializados, como Ecopontos e lojas autorizadas.',
    fonte: 'https://www.gov.br/mma/pt-br/assuntos/meio-ambiente-urbano-recursos-hidricos-qualidade-ambiental/residuos-solidos-urbanos',
  },
  {
    titulo: 'Apague seus dados pessoais',
    texto: 'Antes de descartar celulares, computadores ou tablets, apague todas suas informações pessoais e restaure para as configurações de fábrica.',
    fonte: 'https://www.google.com/amp/s/www.techtudo.com.br/google/amp/noticias/2018/09/o-que-e-lixo-eletronico-veja-dicas-de-descarte-e-reciclagem-no-brasil.ghtml',
  },
  {
    titulo: 'Doe ou recicle aparelhos em funcionamento',
    texto: 'Se o aparelho ainda funciona, considere doar para ONGs, escolas ou projetos de inclusão digital.',
    fonte: 'https://blog.exercitodoacoes.org.br/2023/09/saiba-o-que-fazer-com-eletronicos-usados/',
  },
  {
    titulo: 'Descarte pilhas e baterias separadamente',
    texto: 'Pilhas e baterias contêm metais pesados e devem ser descartadas em pontos de coleta específicos encontrados em supermercados e farmácias.',
    fonte: 'https://www.uol.com.br/ecoa/ultimas-noticias/2023/03/15/pilhas-e-baterias-como-fazer-o-descarte-correto.htm',
  }
];

const CustomBackground = (props: BottomSheetBackgroundProps) => (
  <View
    style={[
      {
        backgroundColor: "#222",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flex: 1,
      },
      props.style,
    ]}
  />
);

type SheetMode = "DICAS" | "DETAIL" | "SEARCH" | "RECOMMEND";

const BottomSheetContent = forwardRef(function BottomSheetContent(
  {
    lastLocation,
    onSelectPlace,
    onSheetChange
  }: {
    lastLocation: { latitude: number; longitude: number };
    onSelectPlace: (place: any) => void;
    onSheetChange?: (index: number) => void;
  },
  ref
) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetMode, setSheetMode] = useState<SheetMode>("DICAS");
  const [selectedDica, setSelectedDica] = useState<typeof dicas[0] | null>(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recomendados, setRecomendados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<any | null>(null);

  // NOVO: permite abrir detalhes do local ao clicar no marcador do mapa!
  async function abrirDetalhesDoLocal(local: any) {
    setSelectedDica(null); // limpa dica selecionada
    setSelectedPlace(local);
    setSheetMode("DETAIL");
    bottomSheetRef.current?.expand();
  }

  useImperativeHandle(ref, () => ({
    abrirRecomendacoes,
    fecharSheet,
    abrirDetalhesDoLocal, // ← expondo para uso externo!
  }));

  const snapPoints = useMemo(() => {
    switch (sheetMode) {
      case "DETAIL": return ["35%", "80%"];
      case "SEARCH": return ["40%", "90%"];
      case "RECOMMEND": return ["40%", "90%"];
      default: return ["20%", "50%", "85%"];
    }
  }, [sheetMode]);

  async function abrirRecomendacoes() {
    setSheetMode("RECOMMEND");
    setSelectedPlace(null);
    setSelectedDica(null);
    setRecomendados([]);
    setLoading(true);
    try {
      const response = await axios.get(
        "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        {
          params: {
            location: `${lastLocation.latitude},${lastLocation.longitude}`,
            radius: 2000,
            keyword: "e-lixo,PEV,lixo eletrônico,descarte de lixo eletrônico,eletrônicos",
            key: GOOGLE_MAPS_API_KEY,
          },
        }
      );
      setRecomendados(response.data.results || []);
    } catch (e) {
      setRecomendados([]);
    } finally {
      setLoading(false);
      bottomSheetRef.current?.expand();
    }
  }

  function fecharSheet() {
    bottomSheetRef.current?.snapToIndex(0);
    setSheetMode("DICAS");
    setSelectedDica(null);
    setSelectedPlace(null);
    setRecomendados([]);
    setLoading(false);
  }

  function abrirDica(dica: typeof dicas[0]) {
    setSelectedDica(dica);
    setSelectedPlace(null);
    setSheetMode("DETAIL");
    bottomSheetRef.current?.expand();
  }

  function voltarParaDicas() {
    setSelectedDica(null);
    setSheetMode("DICAS");
    setSelectedPlace(null);
    bottomSheetRef.current?.snapToIndex(0);
  }

  function iniciarBusca() {
    setSheetMode("SEARCH");
    setSearch("");
    setSearchResults([]);
    setSelectedDica(null);
    setSelectedPlace(null);
    bottomSheetRef.current?.expand();
  }

  function buscar() {
    setSearchResults([
      { id: 1, nome: "Ecoponto Central", endereco: "Rua A, 123" },
      { id: 2, nome: "Ecoponto Norte", endereco: "Rua B, 456" },
    ]);
  }

  function selecionarResultado(r: any) {
    setSelectedDica({ titulo: r.nome, texto: r.endereco, fonte: "" });
    setSelectedPlace(null);
    setSheetMode("DETAIL");
  }

  // Mantido para seleção de local a partir da lista (RECOMMEND)
  function handleSelectPlace(place: any) {
    setSelectedPlace(place);
    setSelectedDica(null);
    setSheetMode("DETAIL");
    onSelectPlace?.({
      place_id: place.place_id,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      name: place.name,
      address: place.vicinity,
      photos: place.photos,
      rating: place.rating,
      vicinity: place.vicinity,
    });
  }

  function handleVoltarRecomend() {
    setSelectedPlace(null);
    setSheetMode("RECOMMEND");
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundComponent={CustomBackground}
      handleIndicatorStyle={{ backgroundColor: "#00A86B" }}
      onChange={onSheetChange}
    >
      {/* Botão de fechar */}
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity onPress={fecharSheet} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Recomendações de locais (Google Places) */}
      {sheetMode === "RECOMMEND" && (
        <ScrollView style={styles.searchContainer}>
          <Text style={styles.titulo}>Locais recomendados próximos</Text>
          {loading
            ? <ActivityIndicator color="#00A86B" size="large" style={{ marginTop: 12 }} />
            : (
              <>
                {recomendados.length === 0 && <Text style={{ color: "#fff", alignSelf: "center" }}>Nenhum local encontrado.</Text>}
                {recomendados.map((r: any) => (
                  <TouchableOpacity key={r.place_id} style={styles.resultCard} onPress={() => handleSelectPlace(r)}>
                    <Text style={{ color: "#00A86B", fontWeight: "bold", fontSize: 16 }}>{r.name}</Text>
                    <Text style={{ color: "#eee" }}>{r.vicinity}</Text>
                    {r.rating ? <Text style={{ color: "#ccc", fontSize: 13 }}>Avaliação: {r.rating}⭐</Text> : null}
                  </TouchableOpacity>
                ))}
              </>
            )}
        </ScrollView>
      )}

      {/* Dicas iniciais */}
      {sheetMode === "DICAS" && (
        <ScrollView contentContainerStyle={styles.contentContainer}>
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
          <TouchableOpacity style={styles.botao} onPress={iniciarBusca}>
            <Text style={styles.textoBotao}>Buscar Ecopontos</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* Detalhe da dica ou local - agora com ScrollView para rolar o detalhe */}
      {sheetMode === "DETAIL" && (selectedDica || selectedPlace) && (
        <ScrollView style={styles.detailContainer} contentContainerStyle={{paddingBottom: 32}}>
          <TouchableOpacity onPress={selectedPlace ? handleVoltarRecomend : voltarParaDicas}>
            <Text style={styles.voltar}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>{selectedPlace ? selectedPlace.name : selectedDica?.titulo}</Text>
          
          {/* Carrossel de imagens do local */}
          {selectedPlace?.photos?.length > 0 && (
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              style={styles.carouselContainer}
            >
              {selectedPlace.photos.map((photo: any, index: number) => (
                <View key={index} style={styles.carouselImageWrapper}>
                  <Image
                    source={{
                      uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`,
                    }}
                    style={styles.carouselImage}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </ScrollView>
          )}

          <Text style={{ color: "#fff", marginTop: 8 }}>
            {selectedPlace
              ? `${selectedPlace.vicinity}${selectedPlace.rating ? "\nAvaliação: " + selectedPlace.rating + "⭐" : ""}`
              : selectedDica?.texto}
          </Text>
          {/* Exibe a fonte/link se for dica */}
          {selectedDica?.fonte ? (
            <TouchableOpacity onPress={() => Linking.openURL(selectedDica.fonte)}>
              <Text style={{ color: "#00A86B", marginTop: 16, textDecorationLine: 'underline' }}>
                Leia mais sobre!
              </Text>
            </TouchableOpacity>
          ) : null}
        </ScrollView>
      )}

      {/* Busca manual (mock) */}
      {sheetMode === "SEARCH" && (
        <ScrollView style={styles.searchContainer}>
          <TouchableOpacity onPress={voltarParaDicas}>
            <Text style={styles.voltar}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>Buscar Ecopontos</Text>
          <TextInput
            value={search}
            placeholder="Digite o nome ou endereço"
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor="#bbb"
          />
          <Button title="Buscar" onPress={buscar} color="#00A86B" />
          <View style={{ marginTop: 16 }}>
            {searchResults.length === 0 && <Text style={{ color: "#fff" }}>Nenhum resultado ainda.</Text>}
            {searchResults.map((r) => (
              <TouchableOpacity key={r.id} onPress={() => selecionarResultado(r)} style={styles.resultCard}>
                <Text style={{ color: "#00A86B", fontWeight: "bold", fontSize: 16 }}>{r.nome}</Text>
                <Text style={{ color: "#eee" }}>{r.endereco}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  closeButtonContainer: {
    alignItems: "flex-end",
    marginTop: 4,
    marginRight: 8,
    zIndex: 10,
  },
  closeButton: {
    backgroundColor: "#333",
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    top: -1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  titulo: {
    color: '#00A86B',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
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
    fontFamily: 'MadimiOne',
  },
  textoTitulo: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'MadimiOne',
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
    marginTop: 8,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    flex: 1,
  },
  voltar: {
    color: "#00A86B",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    flex: 1,
  },
  input: {
    backgroundColor: "#333",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    marginBottom: 10,
    fontSize: 16,
  },
  resultCard: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  carouselContainer: {
    marginTop: 10,
    marginBottom: 10,
    height: 180,
  },
  carouselImageWrapper: {
    width: 280,
    height: 180,
    marginRight: 16,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#222",
  },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
});

export default BottomSheetContent;