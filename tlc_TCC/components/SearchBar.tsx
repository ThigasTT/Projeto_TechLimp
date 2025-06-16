import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";

type Props = {
  value: string;
  onChange: (t: string) => void;
  onSearch: () => void;
  onFocus?: () => void; // <-- Adicione essa linha
};

export default function SearchBar({ value, onChange, onSearch, onFocus }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={22} color="#39A28D" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Pesquise aqui"
        placeholderTextColor="#A8B8B8"
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        onFocus={onFocus} // <-- Adicione essa linha
      />
      <Image
        style={styles.logo}
        source={require("../assets/images/Logo.png")}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginHorizontal: 18,
    borderRadius: 16,
    height: 44,
    zIndex: 20,
  },
  icon: {
    marginLeft: 10,
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: "#39A28D",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 0,
  },
  logo: {
    width: 85,
    height: 75,
    marginRight: 10,
  },
});