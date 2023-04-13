import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { AntDesign } from "@expo/vector-icons";

class MainPlayerScreen extends React.Component {
  render() {
    return (
      <View >
         <View>
              <Button type="clear"
                icon={<AntDesign name="up" size={10} color="white" />}
              />
            </View>
        <Text>Add friends here!</Text>
      </View>
    );
  }
}

// ...

export default MainPlayerScreen;