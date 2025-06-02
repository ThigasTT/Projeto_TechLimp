import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import {
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
import { auth } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';


WebBrowser.maybeCompleteAuthSession();

type RootStackParamList = {
  Map: undefined;
  Register: undefined;
  // add other routes here if needed
};
const redirectUri = AuthSession.makeRedirectUri({
  native: 'techlimp://',    // seu scheme
});

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Map'>>();

  // Configuração do Login com Google
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '1017515796520-01p1gtitf5ej4jpn11bck2n1gut08g5s.apps.googleusercontent.com',
    androidClientId: '1017515796520-7o3k0poksim3fk3hn9nmo6c4hjpifkdu.apps.googleusercontent.com',
    scopes: ['openid', 'profile', 'email'],
  });

  // Efeito para lidar com a resposta do Google
  useEffect(() => {
    if (response?.type === 'success') {
      const id_token = response.params.id_token || response.authentication?.idToken;

      console.log('Google Auth Success Response (with useIdTokenAuthRequest):', JSON.stringify(response, null, 2));
      console.log('Received id_token:', id_token);

      if (id_token) {
        handleGoogleAuth(id_token);
      } else {
        Alert.alert('Erro de Autenticação', 'Não foi possível obter o id_token do Google mesmo com useIdTokenAuthRequest.');
        console.error('id_token still missing:', response);
        setLoading(false);
      }
    } else if (response?.type === 'error') {
      console.error('Google Auth Error Response:', JSON.stringify(response, null, 2));
      Alert.alert('Erro Google', 'Falha na autenticação com Google: ' + (response.error?.message || 'Erro desconhecido'));
      setLoading(false);
    } else if (response?.type === 'cancel' || response?.type === 'dismiss') {
      console.log('Google Auth Canceled/Dismissed by User');
      setLoading(false);
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
      navigation.navigate('Map');
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
      navigation.navigate('Map');
    } catch (error: any) {
      Alert.alert('Erro Firebase', 'Falha na autenticação com Google via Firebase.');
      console.error('Firebase signInWithCredential error:', error);
      console.error('Firebase error code:', error.code);
      console.error('Firebase error message:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para iniciar o login com Google
  const startGoogleLogin = async () => {
    try {
      setLoading(true);
      await promptAsync();
    } catch (e) {
      console.error("Erro ao iniciar autenticação Google:", e);
      Alert.alert("Erro", "Não foi possível iniciar a autenticação com Google.");
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
          <Image
            source={require('../../assets/images/Logo.png')}
            style={styles.logo}
          />

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
            Não tem uma conta? <Text onPress={() => navigation.navigate('Register')} style={styles.signupLink}>Crie uma!</Text>
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
            onPress={startGoogleLogin}
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
    minHeight: '100%',
  },
  logo: {
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#5cff9b',
    borderRadius: 15,
    padding: 12,
    color: '#5cff9b',
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'MadimiOne',
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
    fontFamily: 'MadimiOne',
  },
  signupText: {
    color: '#ccc',
    marginBottom: 20,
    fontFamily: 'MadimiOne',
  },
  signupLink: {
    color: '#5cff9b',
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
    fontFamily: 'MadimiOne',
  },
  altText: {
    color: '#ccc',
    marginBottom: 10,
    fontFamily: 'MadimiOne',
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