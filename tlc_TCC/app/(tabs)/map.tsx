// app/(tabs)/Mapa.tsx
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function MapScreen() {
  return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/map.png')}
          style={styles.mapImage}
          resizeMode="cover"
        />

        <View style={styles.overlayTextContainer}>
          <Text style={styles.overlayText}>Nossa Área de Atuação</Text>
          <Text style={styles.overlaySubText}>Pontos de coleta marcados na imagem</Text>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  overlayTextContainer: {
    position: 'absolute',
    top: 50,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
  },
  overlayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  overlaySubText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
});