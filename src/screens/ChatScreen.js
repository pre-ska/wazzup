import { ImageBackground, StyleSheet, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import messages from '../../assets/data/messages.json';
import bg from '../../assets/images/BG.png';
import Message from '../components/Message';
import InputBox from '../components/InputBox';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  return (
    <ImageBackground source={bg} style={styles.bg}>
      <FlatList
        data={messages}
        renderItem={(item) => <Message message={item} />}
        style={styles.list}
        inverted
      />
      <InputBox />
    </ImageBackground>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
});
