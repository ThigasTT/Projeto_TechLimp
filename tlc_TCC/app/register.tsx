import * as Google from 'expo-auth-session/providers/google';
import { Link, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../firebaseConfig';
import { createUser } from '../services/userService';
import { createCeps, getCeps } from 'services/cepService';

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


export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [id_cep,SetIdCep] = useState(''); 
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

// Configuração do Login com Google
const [request, response, promptAsync] = Google.useAuthRequest({
  /*expoClientId: 'SEU_CLIENT_ID_EXPO.apps.googleusercontent.com',*/
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
   
try {
  let idCepFinal = '';
  const respostaCep = await getCeps(cep);

  if (Array.isArray(respostaCep.data) && respostaCep.data.length > 0) {
    idCepFinal = respostaCep.data[0].id_cep;
    SetIdCep(idCepFinal); // opcional, só para manter o estado atualizado
  } else if (respostaCep.data.message) {
    const respostaNovoCep = await createCeps({cep});
    console.log('resposta novo cep:',respostaNovoCep);
    const novoCep = await getCeps(cep);
    idCepFinal = novoCep.data[0].id_cep;
    SetIdCep(idCepFinal); // opcional, só para manter o estado atualizado
  } else {
    throw new Error('Erro ao buscar ou criar o CEP');
  }

    const dadosUsuario = {
      nome_user:nome,
      email_user:email,
      senha_user:senha,
      telefone_celular_user:telefone,
      id_cep: idCepFinal,
      complemento,
    };

      const resposta = await createUser(dadosUsuario);
      console.log('Dados enviados:', dadosUsuario);
      console.log('resposta do back para criacao:',resposta)
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      router.replace('/notc');
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
      Alert.alert('Sucesso', 'notc com Google realizado!');
      router.replace('/notc');
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
          <Image
            source={require('../assets/images/Logo.png')} // Substitua pelo caminho da sua logo
            style={styles.logo}
          />

          <Text style={styles.section}>Cadastro</Text>
          <Text style={styles.txt}>Nome</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nome *" 
            placeholderTextColor="#228b22" 
            value={nome} 
            onChangeText={setNome}
          />
          <Text style={styles.txt}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Email *" 
            placeholderTextColor="#228b22" 
            value={email} 
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.txt}>Senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Senha *" 
            placeholderTextColor="#228b22" 
            secureTextEntry 
            value={senha} 
            onChangeText={setSenha} 
          />
          <Text style={styles.txt}>Telefone</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Telefone" 
            placeholderTextColor="#228b22" 
            value={telefone} 
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />
          <Text style={styles.txt}>CEP</Text>  
          <TextInput 
            style={styles.input} 
            placeholder="CEP" 
            placeholderTextColor="#228b22" 
            value={cep} 
            onChangeText={setCep}
            keyboardType="numeric"
          />
         {/*<Text style={styles.txt}>Número</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Número" 
            placeholderTextColor="#228b22" 
            value={numero} 
            onChangeText={setNumero}
            keyboardType="numeric"
          />*/}
          <Text style={styles.txt}>Complemento</Text>
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
    width: 300,
    height: 150,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#29e263',
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 5,
    width: '100%',
    alignItems: 'center',
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
  signupLink: {
    color: '#5cff9b',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'MadimiOne',
  },
  googleButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  signupText: {
    color: '#ccc',
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
    fontFamily: 'MadimiOne',
  },
  divider: {
    color: '#ccc',
    marginVertical: 15,
    textAlign: 'center',
    width: '100%',
    fontFamily: 'MadimiOne',
  },
  section: {
    color: '#5cff9b',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
    textAlign: 'center',
    width: '100%',
    fontFamily: 'MadimiOne',
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#5cff9b',
    borderRadius: 10,
    padding: 12,
    color: '#5cff9b',
    fontSize: 20,
    marginBottom: 5,
    fontFamily: 'MadimiOne',
  },
  txt: {
    color: '#5cff9b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '100%',
    fontFamily: 'MadimiOne',
  },
});
