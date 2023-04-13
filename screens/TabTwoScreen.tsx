import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Song } from '../types';
import { API, graphqlOperation } from 'aws-amplify';
import { listSongs } from "../src/graphql/queries";
import { AppContext } from '../AppContext';
import PlayerWidget from '../components/PlayerWidget';

type SearchPageProps = {
  songs: Song[];
};

const TabTwoScreen = ({  }: SearchPageProps) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const { songId, setSongId } = useContext(AppContext);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await API.graphql(graphqlOperation(listSongs));
        setSongs(response.data.listSongs.items);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSongs();
  }, []);

  const handleSearch = (text: string) => {
    setSearchTerm(text);

    const filtered = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(text.toLowerCase()) ||
        song.artist.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredSongs(filtered);
  };

  const handleSongSelect = (id: string) => {
    setSongId(id);
  };

  const renderItem = ({ item }: { item: Song }) => (
    <TouchableOpacity style={styles.songContainer} onPress={() => handleSongSelect(item.id)}>
      <Image source={{ uri: item.imageUri }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#B8B8B8" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B8B8B8"
          style={styles.searchInput}
          onChangeText={handleSearch}
          value={searchTerm}
        />
      </View>
      <FlatList
        data={filteredSongs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    fontSize: 16,
  },
  list: {
    marginHorizontal: 20,
  },
  songContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    fontSize: 16,
  },
  artist: {
    color: '#B8B8B8',
    fontSize: 14,
    marginTop: 5,
  },
});

export default TabTwoScreen;
