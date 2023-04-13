import { View, Text, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';

const PlayerScreen = () => {
  const route = useRoute();
  const albumId = route.params.id;

    return (
        <View>
          <Text>this is mainplayer</Text>
        </View>
      )
}

export default PlayerScreen;