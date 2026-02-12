import { useUser } from '../../services/userContext';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useEffect } from 'react';
import { updateUser } from '../../services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    profileImage, setProfileImage
  } = useUser(); // Usa o contexto para tudo

// use id_user no seu update
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
  };

  const handleSave = async () => {
    const id_user = await AsyncStorage.getItem('id_user');
    try {
      const dadosEditar = {
        id_user:Number(id_user),
        nome_user:name,
        email_user:email,
        senha_user:password,
      }

      const respostaEdit = await updateUser(dadosEditar);
      console.log("resposta do backend para a edicao: ",respostaEdit);
      Alert.alert('Atualizado com sucesso')
    } catch (error) {
      let errorMessage = 'Erro ao atualizar o usuário!';
            if (error instanceof Error) {
              errorMessage = error.message;
            }
            Alert.alert("Erro: ", errorMessage);
    }
    navigation.goBack();
  };
{/*
  useEffect(() => {
  const setData = async () => {
     let nome = await AsyncStorage.getItem('nome_user');
     let email = await AsyncStorage.getItem('email_user');
     setName(nome);
     setEmail(email);
   }
   setData();
  }, [])*/}

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Feather name="arrow-left" size={24} color="#0bba64" />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Perfil</Text>
          </View>

          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={pickImage}>
              <View style={styles.avatar}>
                {profileImage ? (
                  <>
                    <Image source={{ uri: profileImage }} style={styles.avatarImage} />
                    <TouchableOpacity 
                      style={styles.removeImageButton} 
                      onPress={removeImage}
                    >
                      <Feather name="x" size={16} color="white" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <Feather name="user" size={36} color="#0bba64" />
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={pickImage} style={styles.changePhotoButton}>
              <Text style={styles.changePhotoText}>
                {profileImage ? 'Alterar foto' : 'Adicionar foto'}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Digite seu nome"
                  placeholderTextColor="#666"
                />
                <Feather name="edit-2" size={18} color="#0bba64" style={styles.editIcon} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Digite seu email"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                />
                <Feather name="edit-2" size={18} color="#0bba64" style={styles.editIcon} />
              </View>
            </View>

           <View style={styles.inputGroup}>
              <Text style={styles.label}>senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#666"
                  secureTextEntry
               //   keyboardType="phone-pad"
                />
                <Feather name="edit-2" size={18} color="#0bba64" style={styles.editIcon} />
              </View>
            </View>

           {/*<View style={styles.inputGroup}>
              <Text style={styles.label}>Endereço</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Digite seu endereço"
                  placeholderTextColor="#666"
                />
                <Feather name="edit-2" size={18} color="#0bba64" style={styles.editIcon} />
              </View>
            </View>*/}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  backButton: {
    top: 30,
    marginRight: 15,
  },
  title: {
    color: '#0bba64',
    marginLeft: 10,
    top: 30,
    fontSize: 20,
    fontFamily: 'MadimiOne',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
    top: 20,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2b2b2b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoButton: {
    padding: 8,
  },
  changePhotoText: {
    color: '#0bba64',
    fontSize: 14,
    fontFamily: 'MadimiOne',
  },
  formContainer: {
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#0bba64',
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2b2b2b',
    borderRadius: 8,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
    fontFamily: 'MadimiOne',
  },
  editIcon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#0bba64',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'MadimiOne',
  },
});