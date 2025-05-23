import { createUser } from '@/services/userService';
import * as Google from 'expo-auth-session/providers/google';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// Configuração necessária para o Expo
WebBrowser.maybeCompleteAuthSession();

// Configure Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBLL9WWIWgPpNNFzvTH4Y-zrd6IaGcPElw",
  authDomain: "auth-e3708.firebaseapp.com",
  projectId: "auth-e3708",
  storageBucket: "auth-e3708.firebasestorage.app",
  messagingSenderId: "756468624869",
  appId: "1:756468624869:web:c6e35c27b19bf2860d930c",
  measurementId: "G-BHRM0MH6QF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Configuração do Login com Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'SEU_CLIENT_ID_EXPO.apps.googleusercontent.com',
    webClientId: '78635470984-847crapsjqdr5fvn4gdci0ib5ubc56db.apps.googleusercontent.com',
  });

  // Efeito para lidar com a resposta do Google
  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      handleGoogleAuth(response.authentication.accessToken);
    }
  }, [response]);

  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      return;
    }

    setLoading(true);
    const dadosUsuario = {
      nome,
      email,
      senha,
      telefone,
      cep,
      numero,
      complemento,
    };

    try {
      await createUser(dadosUsuario);
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      router.replace('/login');
    } catch (error) {
      let errorMessage = 'Erro ao criar usuário!';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (token: string) => {
    setLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(null, token);
      await signInWithCredential(auth, credential);
      Alert.alert('Sucesso', 'Login com Google realizado!');
      router.replace('/login');
    } catch (error) {
      Alert.alert('Erro', 'Falha na autenticação com Google');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.innerContainer}>
          <Text style={styles.logo}>TechLimp</Text>

          <Text style={styles.section}>Cadastro</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nome *" 
            placeholderTextColor="#228b22" 
            value={nome} 
            onChangeText={setNome}
          />
          <TextInput 
            style={styles.input} 
            placeholder="Email *" 
            placeholderTextColor="#228b22" 
            value={email} 
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Senha *" 
            placeholderTextColor="#228b22" 
            secureTextEntry 
            value={senha} 
            onChangeText={setSenha} 
          />
          <TextInput 
            style={styles.input} 
            placeholder="Telefone" 
            placeholderTextColor="#228b22" 
            value={telefone} 
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />
          <TextInput 
            style={styles.input} 
            placeholder="CEP" 
            placeholderTextColor="#228b22" 
            value={cep} 
            onChangeText={setCep}
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Número" 
            placeholderTextColor="#228b22" 
            value={numero} 
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Complemento (Opcional)" 
            placeholderTextColor="#228b22" 
            value={complemento} 
            onChangeText={setComplemento} 
          />

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Criar Conta</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.divider}>ou</Text>

          <TouchableOpacity 
            style={styles.googleButton}
            onPress={() => promptAsync()}
            disabled={!request || loading}
          >
            <Image 
              source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} 
              style={styles.googleIcon} 
            />
            <Text style={styles.googleButtonText}>Cadastre-se com Google</Text>
          </TouchableOpacity>

          <Text style={styles.signupText}>
            Já tem uma conta? <Link href="/login" style={styles.signupLink}>Entrar</Link>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#2b2b2b',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: '100%',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#5cff9b',
    marginBottom: 30,
    fontFamily: 'monospace',
  },
  section: {
    color: '#5cff9b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
    width: '100%',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#5cff9b',
    borderRadius: 10,
    padding: 12,
    color: '#5cff9b',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#29e263',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',

  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  divider: {
    color: '#ccc',
    marginVertical: 15,
    textAlign: 'center',
    width: '100%',
  },
  signupText: {
    color: '#ccc',
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
  },
  signupLink: {
    color: '#5cff9b',
    fontWeight: 'bold',
  },
});