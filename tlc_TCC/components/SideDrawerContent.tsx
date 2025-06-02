import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from '../services/userContext';
import type { StackNavigationProp } from "@react-navigation/stack";

type SideDrawerContentProps = {
  onClose: () => void;
  onLogout: () => void;
  onAbout: () => void;
};

export default function SideDrawerContent({ onClose, onLogout, onAbout }: SideDrawerContentProps) {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { name, profileImage } = useUser();

  return (
    <View style={styles.drawer}>
      <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
        <Ionicons name="arrow-back" size={24} color="#39A28D" />
      </TouchableOpacity>
      <View style={styles.profile}>
        {profileImage ? (
          <Image
            source={{ uri: profileImage }}
            style={{ width: 90, height: 90, borderRadius: 45, marginBottom: 10 }}
          />
        ) : (
          <Ionicons name="person-circle" size={90} color="#39A28D" />
        )}
        <Text style={styles.name}>{name || "Seu nome"}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")} style={{ marginTop: 8 }}>
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
  closeBtn: { position: "absolute", top: 60, right: 20, zIndex: 1, padding: 10 },
  profile: { alignItems: "center", marginTop: 32, marginBottom: 32 },
  name: { color: "#39A28D", fontSize: 22, fontFamily: "MadimiOne" },
  edit: { color: "#39A28D", marginTop: 4, textDecorationLine: "underline", fontFamily: "MadimiOne" },
  footer: { position: "absolute", bottom: 36, left: 10, width: "90%" },
  drawerBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  btnText: { color: "#39A28D", marginLeft: 10, fontSize: 17, fontFamily: "MadimiOne" }, 
});