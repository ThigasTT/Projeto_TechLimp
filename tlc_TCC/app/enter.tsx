import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { createUser } from '@/services/userService';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const dadosUsuario = {
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
      router.replace('/'); // Volta para a tela de login
    } catch (error) {
      Alert.alert('Erro', 'Erro ao criar usuário!');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Text style={styles.logo}>TechLimp</Text>

      <Text style={styles.section}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#228b22" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#228b22" secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput style={styles.input} placeholder="Telefone" placeholderTextColor="#228b22" value={telefone} onChangeText={setTelefone} />

      <Text style={styles.section}>Endereço</Text>
      <TextInput style={styles.input} placeholder="CEP" placeholderTextColor="#228b22" value={cep} onChangeText={setCep} />
      <TextInput style={styles.input} placeholder="Número" placeholderTextColor="#228b22" value={numero} onChangeText={setNumero} />
      <TextInput style={styles.input} placeholder="Complemento (Opcional)" placeholderTextColor="#228b22" value={complemento} onChangeText={setComplemento} />

      <Text style={styles.signupText}>
        Já tem uma conta? <Link href="/" style={styles.signupLink}>Entrar</Link>
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Criar</Text>
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
    marginBottom: 30,
    fontFamily: 'monospace',
  },
  section: {
    color: '#5cff9b',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15,
    alignSelf: 'center',
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
  signupText: {
    color: '#ccc',
    marginBottom: 15,
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
    justifyContent: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
});