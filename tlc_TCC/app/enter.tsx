import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { createUser } from '@/services/userService';
import { getCeps, createCeps } from '@/services/cepService'; // Você precisa desses serviços

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [nome, setNome] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      // 1. Buscar id_cep
      let respostaCep = await getCeps(cep);
      let id_cep = Array.isArray(respostaCep.data)
        ? respostaCep.data[0]?.id_cep
        : respostaCep.data?.id_cep;

      // 2. Se não existir, cadastrar o CEP
      if (!id_cep) {
        const novoCep = await createCeps({ cep }); // pode precisar de mais campos, depende do backend
        id_cep = Array.isArray(novoCep.data)
          ? novoCep.data[0]?.id_cep
          : novoCep.data?.id_cep;
      }
      if (!id_cep) {
        Alert.alert('Erro', 'Não foi possível obter o id_cep!');
        return;
      }

      // 3. Montar o objeto conforme o backend espera
      const dadosUsuario = {
        id_cep,
        nome_user: nome,
        telefone_celular_user: telefone,
        email_user: email,
        senha_user: senha,
        complemento,
        // número: seu backend não espera esse campo
      };

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
      <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#228b22" value={nome} onChangeText={setNome} />
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