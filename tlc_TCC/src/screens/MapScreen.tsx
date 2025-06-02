import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import Constants from "expo-constants";
import * as Location from "expo-location";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, PixelRatio, StyleSheet, TouchableOpacity, View, Text, Linking } from 'react-native';
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import BottomSheetContent from "../../components/BottomSheetContent";
import SearchBar from "../../components/SearchBar";
import SideDrawerContent from "../../components/SideDrawerContent";

const GOOGLE_MAPS_API_KEY = Constants.expoConfig?.extra?.googleMapsApiKey;

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 480;
function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// Substitua pelo seu local padrão
const DEFAULT_LOCATION = { latitude: -23.6815319, longitude: -46.6209645 };
export default function MapScreen() {
  const navigation = useNavigation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [markers, setMarkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastLocation, setLastLocation] = useState(DEFAULT_LOCATION);

  const mapRef = useRef<MapView>(null);
  const sheetRef = useRef<BottomSheet>(null);

  // NOVO: Centralizar mapa e buscar pontos próximos à localização do usuário ao abrir o app
  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLoading(false);
          Alert.alert("Permissão de localização negada", "Não foi possível obter sua localização. O mapa será centralizado no local padrão.");
          setLastLocation(DEFAULT_LOCATION);
          await fetchNearbyRecyclingPoints(DEFAULT_LOCATION);
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const userLoc = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
        setLastLocation(userLoc);

        // Atualize marcador do usuário
        setMarkers((prev) => [
          ...prev.filter((m) => m.id !== "user"),
          {
            id: "user",
            latitude: userLoc.latitude,
            longitude: userLoc.longitude,
            title: "Você",
            description: "Sua localização atual",
            type: "usuario"
          },
        ]);

        // Centraliza o mapa
        mapRef.current?.animateToRegion({
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        });

        // Busca pontos próximos
        await fetchNearbyRecyclingPoints(userLoc);
      } catch (e) {
        Alert.alert("Erro", "Não foi possível obter sua localização.");
        setLastLocation(DEFAULT_LOCATION);
        await fetchNearbyRecyclingPoints(DEFAULT_LOCATION);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Busca local pelo Google Places
  async function handleSearch() {
    if (!search.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/textsearch/json`,
        {
          params: {
            query: search,
            location: `${lastLocation.latitude},${lastLocation.longitude}`,
            radius: 2000,
            key: GOOGLE_MAPS_API_KEY
          }
        }
      );

      const place = response.data.results && response.data.results[0];
      if (place && place.geometry) {
        setMarkers([
          ...markers,
          {
            id: place.place_id + Date.now(),
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
            title: place.name || search,
            description: place.formatted_address || "",
            type: "coleta"
          }
        ]);
        setLastLocation({ latitude: place.geometry.location.lat, longitude: place.geometry.location.lng });
        mapRef.current?.animateToRegion({
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        });
      } else {
        Alert.alert("Nenhum resultado", "Não foi possível encontrar o local pesquisado.");
      }
    } catch (err) {
      Alert.alert("Erro", "Erro ao buscar localização no Google Places.");
    } finally {
      setLoading(false);
    }
  }

  // Buscar pontos de coleta próximos usando Google Places Nearby Search
  // AGORA aceita parâmetro opcional de localização para reuso
  async function fetchNearbyRecyclingPoints(locationParam?: { latitude: number, longitude: number }, mapFitMarkers?: boolean) {
    setLoading(true);
    try {
      const loc = locationParam || lastLocation;

      // Função para buscar pontos em um raio específico
      const fetchPointsInRadius = async (radius: number) => {
        const response = await axios.get(
          "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
          {
            params: {
              location: `${loc.latitude},${loc.longitude}`,
              radius,
              keyword: 'e-lixo, PEV, lixo eletrônico, descarte de lixo eletrônico, eletrônicos',
              key: GOOGLE_MAPS_API_KEY,
            }
          }
        );
        return response.data.results || [];
      };

      // 1. Tenta com 3km (3000m)
      let points = await fetchPointsInRadius(3000);

      // 2. Se não achou, tenta com 5km (5000m)
      if (!points.length) {
        points = await fetchPointsInRadius(5000);
      }

      if (points.length) {
        const newMarkers = points.map((place: any) => ({
          id: place.place_id,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          title: place.name,
          description: place.vicinity,
          type: "coleta"
        }));
        setMarkers((prev) => [
          ...prev.filter((m) => m.type !== "coleta"),
          ...newMarkers
        ]);

        if (mapFitMarkers && mapRef.current) {
          setTimeout(() => {
            mapRef.current?.fitToCoordinates(
              newMarkers.map((m: { latitude: any; longitude: any; }) => ({
                latitude: m.latitude,
                longitude: m.longitude
              })),
              {
                edgePadding: { top: 100, right: 100, bottom: 100, left: 100 },
                animated: true,
              }
            );
          }, 600);
        }
      } else {
        Alert.alert("Nenhum ecoponto encontrado em até 5km.");
      }
    } catch (err) {
      Alert.alert("Erro", "Erro ao buscar pontos de coleta.");
    } finally {
      setLoading(false);
    }
  }

  // Centralizar no usuário e buscar pontos de coleta próximos
  async function handleCenterOnUser() {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permissão negada", "Não foi possível obter permissão para acessar a localização.");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const userLoc = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      };
      mapRef.current?.animateToRegion({
        latitude: userLoc.latitude,
        longitude: userLoc.longitude,
        latitudeDelta: 0.012,
        longitudeDelta: 0.012,
      });
      setLastLocation(userLoc);
      setMarkers((prev) => [
        ...prev.filter((m) => m.id !== "user"),
        {
          id: "user",
          latitude: userLoc.latitude,
          longitude: userLoc.longitude,
          title: "Você",
          description: "Sua localização atual",
          type: "usuario"
        },
      ]);
      // Busca pontos de coleta próximos
      await fetchNearbyRecyclingPoints(userLoc);
    } catch (e) {
      Alert.alert("Erro", "Não foi possível obter sua localização.");
    } finally {
      setLoading(false);
    }
  }

  // Botão para buscar ecopontos e ajustar mapa para mostrar todos
  async function handleFetchNearbyEcopointsAndFit() {
    await fetchNearbyRecyclingPoints(lastLocation, true);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      {drawerOpen && (
        <View style={styles.drawerOverlay}>
          <SideDrawerContent
            onClose={() => setDrawerOpen(false)}
            onLogout={() => navigation.navigate("Login")}
            onAbout={() => Linking.openURL('http://192.168.0.15:5500/site_Tech_Limp/index%20(1).html')}
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
        provider="google"
        style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
        initialRegion={{
          latitude: lastLocation.latitude,
          longitude: lastLocation.longitude,
          latitudeDelta: 0.012,
          longitudeDelta: 0.012,
        }}
        showsUserLocation={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        {markers.map((m: any) => (
          <Marker
            key={m.id}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            title={m.title}
            description={m.description}
          >
            <Image
              source={
                m.type === "usuario"
                  ? require("../../assets/eco_lamp.png")
                  : m.type === "coleta"
                  ? require("../../assets/recycle-bin.png")
                  : undefined
              }
              style={{ width: normalize(44), height: normalize(44) }}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#39A28D" />
        </View>
      )}

      <TouchableOpacity style={styles.fabLeft} onPress={handleCenterOnUser}>
        <MaterialIcons name="location-pin" size={30} color="#39A28D" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fabEco} onPress={handleFetchNearbyEcopointsAndFit}>
        <MaterialIcons name="recycling" size={26} color="#39A28D" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.fabRight} onPress={() => setDrawerOpen(true)}>
        <Ionicons name="settings-sharp" size={26} color="#39A28D" />
      </TouchableOpacity>

      <BottomSheetContent onFetchNearby={fetchNearbyRecyclingPoints} />
    </View>
  );
}

const styles = StyleSheet.create({
  fabLeft: {
    position: "absolute", right: 12, bottom: 236, backgroundColor: "#222", borderRadius: 38, width: 48, height: 48, alignItems: "center", justifyContent: "center", zIndex: 0,
  },
  fabEco: {
    position: "absolute", right: 12, bottom: 184, backgroundColor: "#222", borderRadius: 38, width: 48, height: 48, alignItems: "center", justifyContent: "center", zIndex: 0,
  },
  fabRight: {
    position: "absolute", right: 12, bottom: 290, backgroundColor: "#222", borderRadius: 38, width: 48, height: 48, alignItems: "center", justifyContent: "center", zIndex: 0,
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