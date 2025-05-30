import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type SideDrawerContentProps = {
  onClose: () => void;
  onLogout: () => void;
  onAbout: () => void;
};

export default function SideDrawerContent({ onClose, onLogout, onAbout }: SideDrawerContentProps) {
  return (
    <View style={styles.drawer}>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Ionicons name="arrow-back" size={24} color="#39A28D" />
      </TouchableOpacity>
      <View style={styles.profile}>
        <Ionicons name="person-circle" size={90} color="#39A28D" />
        <Text style={styles.name}>Seu nome</Text>
        <TouchableOpacity>
          <Text style={styles.edit}>Editar Perfil ✎</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.drawerBtn} onPress={onLogout}>
          <Ionicons name="log-out-outline" size={24} color="#39A28D" />
          <Text style={styles.btnText}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerBtn} onPress={onAbout}>
          <Ionicons name="information-circle-outline" size={24} color="#39A28D" />
          <Text style={styles.btnText}>Sobre nós</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    flex: 1,
    backgroundColor: "#2B2B2B",
    paddingTop: 36,
    width: 260,
  },
  closeBtn: { position: "absolute", top: 12, right: 12 },
  profile: { alignItems: "center", marginTop: 32, marginBottom: 32 },
  name: { color: "#39A28D", fontSize: 22, fontWeight: "bold" },
  edit: { color: "#39A28D", marginTop: 4, textDecorationLine: "underline" },
  footer: { position: "absolute", bottom: 36, left: 10, width: "90%" },
  drawerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  btnText: { color: "#39A28D", marginLeft: 10, fontSize: 17, fontWeight: "bold" },
});