import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IndexScreen() {
  return (
    <View
      style={styles.container}
    >
      {/* Logo */}
      <Image
        source={require('../assets/images/Logo.png')} // Substitua pelo caminho da sua logo
        style={styles.logo}
      />

      {/* Slogan */}
      <Text style={styles.section}>
        Transformando tecnologia em soluções sustentáveis.
      </Text>

      {/* Botão Entrar */}
      <Link href="/login" asChild>
        <TouchableOpacity
          style={{
            backgroundColor: '#4ADE80',
            paddingVertical: 12,
            paddingHorizontal: 50,
            borderRadius: 10,
          }}
        >
          <Text style={styles.section}>
            Entrar
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  section: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'MadimiOne',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2b2b2b',
    padding: 20,
  },
});
