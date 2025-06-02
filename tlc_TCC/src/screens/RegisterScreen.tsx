
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
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../../Navigation'; // Adjust path if needed

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  // Importa métodos do contexto
  const { loading, signUpWithEmail } = useAuth();

  const handleSubmit = async () => {
    if (!nome || !email || !senha || !cep || !numero || !telefone) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await signUpWithEmail({
        nome,
        email,
        senha,
        telefone,
        cep,
        numero,
        complemento,
      });
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      navigation.navigate('Map');
    } catch (error: any) {
      let errorMessage = 'Erro ao criar usuário!';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Erro', errorMessage);
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
          <Text style={styles.txt}>Número</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Número" 
            placeholderTextColor="#228b22" 
            value={numero} 
            onChangeText={setNumero}
            keyboardType="numeric"
          />
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

          <Text style={styles.signupText}>
            Já tem uma conta?{" "}
            <Text
              style={styles.signupLink}
              onPress={() => navigation.navigate('Login')}
            >
              Entrar
            </Text>
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
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'MadimiOne',
  },
  googleButtonText: {
    color: '#333',
    fontFamily: 'MadimiOne',
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
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'flex-start',
    textAlign: 'left',
    width: '100%',
    fontFamily: 'MadimiOne',
  },
});