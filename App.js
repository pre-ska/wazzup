import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ChatsScreens from './src/screens/ChatsScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <ChatsScreens />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingVertical: 15,
  },
});
