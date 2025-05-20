import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
// Importe seu serviço de login se já existir (exemplo: import { loginUser } from '@/services/userService';)

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  // Exemplo de handleLogin (ajuste conforme seu backend)
  const handleLogin = async () => {
    // Exemplo para ilustrar
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    try {
      // const response = await loginUser({ email, senha });
      // if (response.ok) {
      //   router.replace('/home');
      // } else {
      //   Alert.alert('Erro', 'Usuário ou senha inválidos!');
      // }
      Alert.alert('Atenção', 'Funcionalidade de login ainda não implementada!');
    } catch (error) {
      Alert.alert('Erro', 'Erro ao tentar logar!');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.logo}>TechLimp</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#228b22"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#228b22"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.signupText}>
        Não tem uma conta? <Link href="/enter" style={styles.signupLink}>Crie uma!</Link>
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.altText}>Você também pode entrar com...</Text>

      <View style={styles.socialIcons}>
        <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.icon} />
        <Image source={{ uri: 'https://img.icons8.com/fluency/48/facebook-new.png' }} style={styles.icon} />
        <Image source={{ uri: 'https://img.icons8.com/color/48/windows-10.png' }} style={styles.icon} />
      </View>
    </KeyboardAvoidingView>
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