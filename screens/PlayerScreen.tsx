import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ToastAndroid
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Slider from '@react-native-community/slider';
import { FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { Audio } from 'expo-av';
import { Sound } from "expo-av/build/Audio/Sound";
import { API, graphqlOperation } from 'aws-amplify';
import { AppContext } from '../AppContext';
import { getSong } from "../src/graphql/queries";
import { Song } from "../types";

const PlayerScreen = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [song, setSong] = useState<Song>({
    id: '',
    title: '',
    artist: '',
    uri: '',
    imageUri: '',
  });
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);

  const { songId } = useContext(AppContext);
  useEffect(() => {
    const fetchSong = async () => {
      try {
        const { data } = await API.graphql(graphqlOperation(getSong, { id: songId }));
        setSong(data.getSong);
      } catch (e) {
        console.log(e);
      }
    }
    fetchSong();

  }, [songId])

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);


  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
    }
    if (status.didJustFinish) {
      setIsPlaying(false);
      setPosition(0);
    }
  };

  const onSeekSliderSlidingComplete = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const playCurrentSong = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    const { sound: newSound } = await Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: isPlaying },
      onPlaybackStatusUpdate
    )

    setSound(newSound);
  }

  useEffect(() => {
    if (song) {
      playCurrentSong();
    }
  }, [song])




  const onPlayPausePress = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    } else {
      await sound.playAsync();
      setIsPlaying(true);
    }
  }

  const handlePress = () => {
    setIsLiked(!isLiked);
  };

  const onDownloadPress = async () => {
    if (!song.uri) {
      return;
    }
  
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
  
      if (status !== 'granted') {
        const { canAskAgain } = await MediaLibrary.getPermissionsAsync();
        if (canAskAgain) {
          const { status } = await MediaLibrary.requestPermissionsAsync();
          if (status === 'granted') {
            alert('Permission granted! Please press the download button again to download the track.');
          }
        } else {
          alert('Permission needed to download the track.');
        }
        return;
      }
  
      const { data } = await API.graphql(graphqlOperation(getSong, { id: song.id }));
  
      const downloadedTrack = await MediaLibrary.getAssetsAsync({
        mediaType: 'audio',
        first: 500,
      });
  
      const track = downloadedTrack.assets.find((item) => item.uri === data.getSong.uri);
  
      if (track) {
        alert('The track has already been downloaded.');
        return;
      }
  
      const downloadResumable = FileSystem.createDownloadResumable(song.uri, FileSystem.documentDirectory + song.title + '.mp3');
  
      const { uri } = await downloadResumable.downloadAsync();
  
      await MediaLibrary.createAssetAsync(uri);
      alert('The track has been downloaded successfully.');
    } catch (error) {
      console.log(error);
      alert('Error downloading the track.');
    }
  };

  const checkDocumentDirectory = async () => {
    const contents = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
    console.log(contents);
  };


  return (
    <View style={styles.container}>
      <Image source={{ uri: song.imageUri }} style={styles.artwork} resizeMode="contain" />
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor="#1db954"
          maximumTrackTintColor="#fff"
          thumbTintColor="#1db954"
          onSlidingComplete={onSeekSliderSlidingComplete}
          disabled={!sound}
        />
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{new Date(position).toISOString().substr(14, 5)}</Text>
          <Text style={styles.progressText}>{new Date(duration).toISOString().substr(14, 5)}</Text>
        </View>
      </View>
      <View style={styles.playdownload}>
        <View style={styles.likeButton}>
          <TouchableOpacity onPress={handlePress}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              size={30}
              color={isLiked ? 'red' : 'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.playButton}>
          <TouchableOpacity onPress={onPlayPausePress}>
            <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color={"white"} />
          </TouchableOpacity>
        </View>
        <View style={styles.downloadButton}>
          <TouchableOpacity onPress={onDownloadPress}>
            <Entypo name="download" size={30} color="white" />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  artwork: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  sliderContainer: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
  playPauseButton: {
    marginTop: 30,
  },
  playdownload: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },
  playButton: {
    alignItems: 'center',
    justifyContent: 'center',
    //marginLeft: 'auto',
    marginLeft: 130,
  },
  downloadButton: {
    marginLeft: 120,
    flexGrow: 1,
  },
  likeButton: {
    marginLeft: 20,
  }
});

export default PlayerScreen;