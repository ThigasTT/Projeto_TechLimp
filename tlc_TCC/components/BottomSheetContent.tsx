import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function BottomSheetContent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisas recentes</Text>
      <View style={styles.cardsRow}>
        <View style={styles.card}>
          <Text style={styles.cardText}>Rua X</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardText}>Avenida Y</Text>
        </View>
      </View>
      <Text style={styles.tipsTitle}>Dicas de descarte</Text>
      <View style={styles.tipsCard}>
        <Text style={styles.tipsText}>Nunca descarte pilhas no lixo comum!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { color: "#39A28D", fontSize: 20, fontWeight: "bold" },
  cardsRow: { flexDirection: "row", marginVertical: 8 },
  card: {
    width: 120,
    height: 80,
    backgroundColor: "#ccc",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardText: { color: "#222", fontWeight: "bold", fontSize: 15 },
  tipsTitle: { color: "#39A28D", fontSize: 16, marginTop: 12 },
  tipsCard: {
    marginTop: 6,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
  },
  tipsText: { color: "#fff" },
});