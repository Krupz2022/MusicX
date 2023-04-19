import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Audio } from 'expo-av';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import PlayerWidgets from './components/PlayerWidget';
import MainPlayerScreen from './components/mainPlayerScreen/native'

import { Amplify , Auth} from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator , AmplifyTheme} from 'aws-amplify-react-native';
//const AppWithAuth = withAuthenticator(App, false)



Amplify.configure(awsconfig)

import { AppContext } from './AppContext';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

 
function App() {
  //Auth.signOut();
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
        </AppContext.Provider>
      </SafeAreaProvider>


    );
  }
}

const signUpConfig = {
  header: "My Customized Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
  ],
};

const customTheme = {...AmplifyTheme}

export default withAuthenticator(App, {signUpConfig, theme: customTheme}); 


