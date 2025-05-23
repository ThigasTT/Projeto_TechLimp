import * as Google from 'expo-auth-session/providers/google';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Configuração do Login com Google
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: 'SEU_CLIENT_ID_EXPO.apps.googleusercontent.com',
    webClientId: '78635470984-847crapsjqdr5fvn4gdci0ib5ubc56db.apps.googleusercontent.com',
  });

  // Efeito para lidar com a resposta do Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleAuth(id_token);
    }
  }, [response]);

  const handleLogin = async () => {
    if (email === '' || senha === '') {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      router.replace('/perf');
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha incorretos!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async (idToken: string) => {
    setLoading(true);
    try {
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      router.replace('/perf');
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

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#228b22"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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
            Não tem uma conta? <Link href="/register" style={styles.signupLink}>Crie uma!</Link>
          </Text>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.altText}>Você também pode entrar com...</Text>
          
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
    minHeight: '100%', // Garante que o container ocupe toda a tela
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
    marginTop: 20,
  },
  icon: {
    width: 40,
    height: 40,
  },
});