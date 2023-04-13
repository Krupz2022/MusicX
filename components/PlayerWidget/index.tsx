import React, { useContext, useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';

import { useNavigation } from '@react-navigation/native';

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { API, graphqlOperation } from 'aws-amplify';

import styles from './styles';
import { Song } from "../../types";
import { Sound } from "expo-av/build/Audio/Sound";

import { AppContext } from '../../AppContext';
import { getSong } from "../../src/graphql/queries";

//import { Player } from '../../types';

//export type PlayerProps = {
//  player: Player,
//}
const PlayerWidget = () => {

  //const navigation = useNavigation();

  //const onPress = () => {
   // navigation.navigate('PlayerScreen', { id: props.player.id })
    //console.warn(`pressed`)
 // }
  

  const [song, setSong] = useState(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  const { songId } = useContext(AppContext);


  useEffect(() => {
    const fetchSong = async () => {
      try {
        const data = await API.graphql(graphqlOperation(getSong, { id: songId }))
        setSong(data.data.getSong);
      } catch (e) {
        //console.log(e);
      }
    }

    fetchSong();
  }, [songId])

  const onPlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
  }

  const playCurrentSong = async () => {
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: isPlaying },
      onPlaybackStatusUpdate
    )

    setSound(newSound)
    
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
      await sound.stopAsync();
    } else {
      await sound.playAsync();
    }
  }

  const getProgress = () => {
    if (sound === null || duration === null || position === null) {
      return 0;
    }

    return (position / duration) * 100;
  }

  if (!song) {
    return null;
  }

  return (
    //<TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.progress, { width: `${getProgress()}%` }]} />
        <View style={styles.row}>
          <View style={styles.up}>

            <View>
              <Button type="clear"
                icon={<AntDesign name="up" size={10} color="white" />}
              />
            </View>
          
          <Image source={{ uri: song.imageUri }} style={styles.image} />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.nameContainer}>
            <Text style={styles.title}>{song.title}</Text>
            <Text style={styles.artist}>{song.artist}</Text>
          </View>

          <View style={styles.iconsContainer}>
            <AntDesign name="hearto" size={30} color={"white"} />
            <TouchableOpacity onPress={onPlayPausePress}>
              <FontAwesome name={isPlaying ? 'pause' : 'play'} size={30} color={"white"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View >
   //</TouchableWithoutFeedback >
  )
}



export default PlayerWidget;

