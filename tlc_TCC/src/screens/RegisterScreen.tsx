
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
import type { RootStackParamList } from '../../Navigation'; 
import { createUser } from '../../services/userService';
import { createCeps, getCeps } from '../../services/cepService';

type RegisterScreenProps = StackScreenProps<RootStackParamList, 'Register'>;

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  {/*const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');*/}
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<StackNavigationProp<any>>();


  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios!');
      return;
    }

   
try {
  {/*let idCepFinal = '';
  const respostaCep = await getCeps(cep);

  if (Array.isArray(respostaCep.data) && respostaCep.data.length > 0) {
    idCepFinal = respostaCep.data[0].id_cep;
    setCep(idCepFinal); 
  } else if (respostaCep.data.message) {
    const respostaNovoCep = await createCeps({cep});
    console.log('resposta novo cep:',respostaNovoCep);
    const novoCep = await getCeps(cep);
    idCepFinal = novoCep.data[0].id_cep;
    setCep(idCepFinal); 
  } else {
    throw new Error('Erro ao buscar ou criar o CEP');
  }*/}

    const dadosUsuario = {
      nome_user:nome,
      email_user:email,
      senha_user:senha,
    };
      setLoading(true)
      const resposta = await createUser(dadosUsuario);
      console.log('Dados enviados:', dadosUsuario);
      console.log('resposta do back para criacao:',resposta)
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      navigation.navigate('Map');
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
            source={require('../../assets/Logo.png')} 
            style={styles.logo}
          />

          <Text style={styles.section}>Cadastro</Text>
          <Text style={styles.txt}>Nome</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nome" 
            placeholderTextColor="#0bba64" 
            value={nome} 
            onChangeText={setNome}
          />
          <Text style={styles.txt}>Email</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#0bba64" 
            value={email} 
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.txt}>Senha</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Senha" 
            placeholderTextColor="#0bba64" 
            secureTextEntry 
            value={senha} 
            onChangeText={setSenha} 
          />
          {/*<Text style={styles.txt}>Telefone</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Telefone" 
            placeholderTextColor="#0bba64" 
            value={telefone} 
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />
          <Text style={styles.txt}>CEP</Text>  
          <TextInput 
            style={styles.input} 
            placeholder="CEP" 
            placeholderTextColor="#0bba64" 
            value={cep} 
            onChangeText={setCep}
            keyboardType="numeric"
          />
          <Text style={styles.txt}>Número</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Número" 
            placeholderTextColor="#0bba64" 
            value={numero} 
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <Text style={styles.txt}>Complemento</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Complemento (Opcional)" 
            placeholderTextColor="#0bba64" 
            value={complemento} 
            onChangeText={setComplemento} 
          />*/}

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
    height: 200,
    marginBottom: 20,
    marginTop: 50
  },
  button: {
    backgroundColor: '#0bba64',
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
    color: '#0bba64',
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
    color: '#0bba64',
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
