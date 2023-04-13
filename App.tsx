import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import PlayerWidgets from './components/PlayerWidget';
import MainPlayerScreen from './components/mainPlayerScreen/native'

import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

Amplify.configure(awsconfig)

import { AppContext } from './AppContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      allowsRecordingIOS: false,
      //interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      playsInSilentModeIOS: true,
      //interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    }).then(() => setIsAudioEnabled(true));

    return () => {
      Audio.setIsEnabledAsync(false);
    };
  }, []);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [songId, setSongId] = useState<string | null>(null);


  if (!isLoadingComplete) {
    return null;
  } else {
    return (

      <SafeAreaProvider>
        <AppContext.Provider value={{
          songId: songId,
          setSongId: (id: string) => setSongId(id),
        }}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
          <PlayerWidgets />

        </AppContext.Provider>
      </SafeAreaProvider>


    );
  }
}
