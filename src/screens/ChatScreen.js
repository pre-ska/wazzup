import {
  ImageBackground,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import messages from '../../assets/data/messages.json';
import bg from '../../assets/images/BG.png';
import Message from '../components/Message';
import InputBox from '../components/InputBox';
import { useNavigation, useRoute } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { getChatRoom, listMessagesByChatRoom } from '../graphql/queries';
import { onCreateMessage } from '../graphql/subscriptions';

const getPlatform = () => {
  if (Platform) {
    return Platform.OS;
  } else {
    console.log(window.navigator.userAgent);
  }
};

const ChatScreen = () => {
  const [chatRoom, setChatRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [platform, setPlatform] = useState(getPlatform());

  const route = useRoute();
  const navigation = useNavigation();
  const chatroomID = route.params.id;

  //fetch chat room
  useEffect(() => {
    navigation.setOptions({ title: route.params.name });

    API.graphql(graphqlOperation(getChatRoom, { id: chatroomID })).then(
      (result) => setChatRoom(result.data?.getChatRoom)
    );
  }, [chatroomID]);

  //fetch messages
  useEffect(() => {
    API.graphql(
      graphqlOperation(listMessagesByChatRoom, {
        chatroomID,
        sortDirection: 'DESC',
      })
    ).then((result) => setMessages(result.data?.listMessagesByChatRoom?.items));

    //subscribe to new messages
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage, {
        filter: { chatroomID: { eq: chatroomID } },
      })
    ).subscribe({
      next: ({ value }) => {
        const newMessage = value.data?.onCreateMessage;
        newMessage && setMessages((prev) => [newMessage, ...prev]);
      },
      error: (error) => console.warn(error),
    });

    return () => subscription.unsubscribe();
  }, [chatroomID]);

  //chat title
  useEffect(() => {
    navigation.setOptions({ title: route.params.name });
  }, [route.params.name]);

  if (!chatRoom) {
    return <ActivityIndicator />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={messages}
          renderItem={(item) => <Message message={item} />}
          style={styles.list}
          inverted
        />
        <InputBox chatroom={chatRoom} />
      </ImageBackground>
    </KeyboardAvoidingView>
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
