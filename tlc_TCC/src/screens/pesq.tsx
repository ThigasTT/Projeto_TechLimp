import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SearchScreen() {
  const [search, setSearch] = useState('');
  const [recent, setRecent] = useState<string[]>([]);

  const handleSearch = () => {
    if (search.trim() === '') return;

    const newRecent = [search, ...recent.filter((item) => item !== search)];
    setRecent(newRecent);
    setSearch('');
  };

  return (
    <View style={styles.container}>
      {/* Barra de pesquisa */}
      <View style={styles.searchBar}>
        <Feather name="search" size={20} color="#0bba64" />
        <TextInput
          style={styles.input}
          placeholder="Pesquise aqui"
          placeholderTextColor="#0bba64"
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch}>
          <Feather name="send" size={24} color="#0bba64" />
        </TouchableOpacity>
      </View>

      {/* Texto "Pesquisa Recente" */}
      <Text style={styles.recentTitle}>Pesquisa Recente</Text>

      {/* Lista dos recentes */}
      <FlatList
        data={recent}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Feather name="map-pin" size={24} color="#0bba64" />
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma pesquisa recente</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2b2b',
    padding: 16,
    paddingTop: 50,
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#1f1f1f',
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#0bba64',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 8,
    fontFamily: 'MadimiOne',
  },
  recentTitle: {
    color: '#0bba64',
    fontSize: 16,
    marginBottom: 10,
    fontFamily: 'MadimiOne',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  itemText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontFamily: 'MadimiOne',
  },
  empty: {
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'MadimiOne',
  },
});