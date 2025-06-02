import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput, Button } from "react-native";
import BottomSheet, { BottomSheetBackgroundProps} from "@gorhom/bottom-sheet";

const dicas = [
  { titulo: 'Descarte em Locais Apropriados', texto: 'Procure pontos de coleta específicos para lixo eletrônico em sua cidade. Nunca descarte eletrônicos no lixo comum.' },
  { titulo: 'Remova Dados Pessoais', texto: 'Antes de descartar celulares ou computadores, apague todos os dados pessoais e restaure as configurações de fábrica.' },
  { titulo: 'Doe ou Reaproveite', texto: 'Se o aparelho ainda funciona, considere doar para instituições ou pessoas que possam utilizá-lo.' },
  { titulo: 'Separe Pilhas e Baterias', texto: 'Pilhas e baterias devem ser descartadas separadamente em pontos de coleta específicos devido ao risco de contaminação.' },
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


type SheetMode = "DICAS" | "DETAIL" | "SEARCH" | "LIST";

export default function BottomSheetContent({ onFetchNearby }: { onFetchNearby: () => void }) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetMode, setSheetMode] = useState<SheetMode>("DICAS");
  const [selectedDica, setSelectedDica] = useState<typeof dicas[0] | null>(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const snapPoints = useMemo(() => {
    switch (sheetMode) {
      case "DETAIL": return ["35%", "80%"];
      case "SEARCH": return ["40%", "90%"];
      case "LIST": return ["25%", "60%"];
      default: return ["20%", "50%", "85%"];
    }
  }, [sheetMode]);

  // Handlers
  function abrirDica(dica: typeof dicas[0]) {
    setSelectedDica(dica);
    setSheetMode("DETAIL");
    bottomSheetRef.current?.expand();
  }

  function voltarParaDicas() {
    setSelectedDica(null);
    setSheetMode("DICAS");
    bottomSheetRef.current?.snapToIndex(0);
  }

  function iniciarBusca() {
    setSheetMode("SEARCH");
    setSearch("");
    setSearchResults([]);
    bottomSheetRef.current?.expand();
  }

  function buscar() {
    // Simule resultados de busca (troque pela lógica real)
    setSearchResults([
      { id: 1, nome: "Ecoponto Central", endereco: "Rua A, 123" },
      { id: 2, nome: "Ecoponto Norte", endereco: "Rua B, 456" },
    ]);
  }

  function selecionarResultado(r: any) {
    setSelectedDica({ titulo: r.nome, texto: r.endereco });
    setSheetMode("DETAIL");
    // Aqui pode centralizar o mapa, etc
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      backgroundComponent={CustomBackground}
      handleIndicatorStyle={{ backgroundColor: "#00A86B" }}
    >
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

      {/* Detalhe da dica ou ecoponto */}
      {sheetMode === "DETAIL" && selectedDica && (
        <View style={styles.detailContainer}>
          <TouchableOpacity onPress={voltarParaDicas}>
            <Text style={styles.voltar}>◀ Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.titulo}>{selectedDica.titulo}</Text>
          <Text style={{ color: "#fff", marginTop: 8 }}>{selectedDica.texto}</Text>
        </View>
      )}

      {/* Busca */}
      {sheetMode === "SEARCH" && (
        <View style={styles.searchContainer}>
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
          <ScrollView style={{ marginTop: 16 }}>
            {searchResults.length === 0 && <Text style={{ color: "#fff" }}>Nenhum resultado ainda.</Text>}
            {searchResults.map((r) => (
              <TouchableOpacity key={r.id} onPress={() => selecionarResultado(r)} style={styles.resultCard}>
                <Text style={{ color: "#00A86B", fontWeight: "bold", fontSize: 16 }}>{r.nome}</Text>
                <Text style={{ color: "#eee" }}>{r.endereco}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Lista de Ecopontos - você pode implementar depois */}
      {sheetMode === "LIST" && (
        <View style={styles.detailContainer}>
          <Text style={styles.titulo}>Lista de Ecopontos Próximos</Text>
          {/* Implemente a lista real aqui */}
        </View>
      )}
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
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
});