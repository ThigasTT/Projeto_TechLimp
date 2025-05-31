import React, { useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import SearchBar from "../../components/SearchBar";
import BottomSheetContent from "../../components/BottomSheetContent";
import SideDrawerContent from "../../components/SideDrawerContent";
import * as Location from "expo-location";
import axios from "axios";

const DEFAULT_LOCATION = { latitude: -23.6815319, longitude: -46.6209645 };

export default function MapScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [markers, setMarkers] = useState([
    {
      id: "etec",
      latitude: DEFAULT_LOCATION.latitude,
      longitude: DEFAULT_LOCATION.longitude,
      title: "ETEC JK - Diadema",
      description: "Ponto base"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState(DEFAULT_LOCATION);

  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef(null);

  async function handleSearch() {
    if (!search.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get("https://serpapi.com/search.json", {
        params: {
          engine: "google_maps",
          q: search,
          api_key: "478dbbc3eec15887e53738ab44693ace3e951e72f171a46b022c7da518d8a328"
        }
      });

      const location = response.data?.place_results?.gps_coordinates;
      const title = response.data?.place_results?.title ?? search;
      const address = response.data?.place_results?.address ?? "";

      if (location && location.latitude && location.longitude) {
        setMarkers([
          ...markers,
          {
            id: Date.now().toString(),
            latitude: location.latitude,
            longitude: location.longitude,
            title,
            description: address
          }
        ]);
        setLastLocation({ latitude: location.latitude, longitude: location.longitude });
        mapRef.current?.animateToRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        });
      } else {
        Alert.alert("Nenhum resultado", "Não foi possível encontrar o local pesquisado.");
      }
    } catch (err) {
      Alert.alert("Erro", "Erro ao buscar localização no SerpAPI.");
    } finally {
      setLoading(false);
    }
  }

  // Função para centralizar no usuário
  async function handleCenterOnUser() {
    try {
      setLoading(true);
      // Pede permissão
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permissão negada", "Não foi possível obter permissão para acessar a localização.");
        return;
      }
      // Pega localização atual
      let location = await Location.getCurrentPositionAsync({});
      mapRef.current?.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      });
      setLastLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    } catch (e) {
      Alert.alert("Erro", "Não foi possível obter sua localização.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      {drawerOpen && (
        <View style={styles.drawerOverlay}>
          <SideDrawerContent
            onClose={() => setDrawerOpen(false)}
            onLogout={() => {/* lógica de logout */}}
            onAbout={() => {/* lógica sobre nós */}}
          />
        </View>
      )}

      <SearchBar
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
      />

      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: DEFAULT_LOCATION.latitude,
          longitude: DEFAULT_LOCATION.longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        }}
        showsUserLocation
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.title}
            description={m.description}
            pinColor={m.id === "etec" ? "#39A28D" : "#222"}
          />
        ))}
      </MapView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#39A28D" />
        </View>
      )}

      {/* Agora o botão chama a função de centralização na localização do usuário */}
      <TouchableOpacity style={styles.fabLeft} onPress={handleCenterOnUser}>
        <MaterialIcons name="location-pin" size={30} color="#39A28D" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fabRight} onPress={() => setDrawerOpen(true)}>
        <Ionicons name="settings-sharp" size={26} color="#39A28D" />
      </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[220, 80]}
        index={0}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: "#222", borderTopLeftRadius: 24, borderTopRightRadius: 24 }}
        handleIndicatorStyle={{ backgroundColor: "#39A28D" }}
      >
        <BottomSheetContent />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  fabLeft: {
    position: "absolute", right: 60, top: 86, backgroundColor: "#222", borderRadius: 18, width: 36, height: 36, alignItems: "center", justifyContent: "center", zIndex: 10,
  },
  fabRight: {
    position: "absolute", right: 12, top: 86, backgroundColor: "#222", borderRadius: 18, width: 36, height: 36, alignItems: "center", justifyContent: "center", zIndex: 10,
  },
  drawerOverlay: {
    position: "absolute", left: 0, top: 0, bottom: 0, width: 260, zIndex: 1000, backgroundColor: "#222d",
    shadowColor: "#000", shadowOpacity: 0.4, shadowRadius: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#0006",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
});