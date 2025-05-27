import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserProvider } from './userContext'; 

function IndexScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../assets/images/Logo.png')} 
        style={styles.logo}
      />

      {/* Slogan */}
      <Text style={{...styles.section, color: 'white'}}>
        O APP QUE VAI MUDAR O FUTURO.
      </Text>

      {/* Botão Entrar */}
      <Link href="/login" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>
            Entrar
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export default function App() {
  return (
    <UserProvider>
      <IndexScreen />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  section: {
    color: 'BLACK',
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'MadimiOne',
  },
  button: {
    backgroundColor: '#29e263',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
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