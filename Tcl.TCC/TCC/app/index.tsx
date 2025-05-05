import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      
      <Text style={styles.logo}>TechLimp</Text>

      
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#5cff9b" />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#5cff9b" secureTextEntry />

      
      <Text style={styles.signupText}>
        Não tem uma conta? <Text style={styles.signupLink}>Crie uma!</Text>
      </Text>

     
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      
      <Text style={styles.altText}>Você também pode entrar com...</Text>

    
      <View style={styles.socialIcons}>
        <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.icon} />
        <Image source={{ uri: 'https://img.icons8.com/fluency/48/facebook-new.png' }} style={styles.icon} />
        <Image source={{ uri: 'https://img.icons8.com/color/48/windows-10.png' }} style={styles.icon} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5cff9b',
    marginBottom: 40,
    fontFamily: 'monospace',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#5cff9b',
    borderRadius: 10,
    padding: 12,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  signupText: {
    color: '#ccc',
    marginBottom: 20,
  },
  signupLink: {
    color: '#5cff9b',
    fontWeight: 'bold',
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
  },
  altText: {
    color: '#ccc',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});


