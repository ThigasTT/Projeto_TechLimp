import React, { useRef, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import SearchBar from "../../components/SearchBar";
import BottomSheetContent from "../../components/BottomSheetContent";
import SideDrawerContent from "../../components/SideDrawerContent";
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
      } else {
        Alert.alert("Nenhum resultado", "Não foi possível encontrar o local pesquisado.");
      }
    } catch (err) {
      Alert.alert("Erro", "Erro ao buscar localização no SerpAPI.");
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
        style={styles.map}
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

      <TouchableOpacity style={styles.fabLeft}>
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
  map: {
    width: "100%",
    height: Dimensions.get("window").height * 0.53,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    marginBottom: -22,
    zIndex: 1,
  },
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