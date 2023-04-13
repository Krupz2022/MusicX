import {
  Ionicons,
  Entypo,
  EvilIcons,
  MaterialCommunityIcons,
  FontAwesome5
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import HomeScreen from '../screens/HomeScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import AlbumScreen from "../screens/AlbumScreen";
import PlayerScreen from "../screens/PlayerScreen";
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
import { TouchableOpacity, Text, StyleSheet} from 'react-native';
import { Auth } from 'aws-amplify';

function HeaderRight(props: any) {
  return (
    <TouchableOpacity style={styles.button} onPress={props.handleSignOut}>
      <Text style={{ color: 'white' }}>Sign Out</Text>
    </TouchableOpacity>
  );
}


export default function BottomTabNavigator() {
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('Error signing out:', error);
    }
  };
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Home"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <Entypo name="home" size={30} style={{ marginBottom: -3 }} color={color} />,
          headerRight: () => <HeaderRight handleSignOut={handleSignOut} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <EvilIcons name="search" size={30} style={{ marginBottom: -3 }} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={HomeScreen}
        options={{ headerTitle: '' }}

        
      />

      <TabOneStack.Screen
        name="AlbumScreen"
        component={AlbumScreen}
        options={{ headerTitle: 'Album' }}
      />

      <TabOneStack.Screen
        name="PlayerScreen"
        component={PlayerScreen}
        options={{ headerTitle: 'Player' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: '' }}
      />
    </TabTwoStack.Navigator>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
    alignSelf: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
 
});
