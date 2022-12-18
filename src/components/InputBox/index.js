import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../graphql/mutations';

const InputBox = ({ chatroom }) => {
  const [newMessage, setNewMessage] = useState('');

  const onSend = async (e) => {
    const authUser = await Auth.currentAuthenticatedUser();
    const payload = {
      chatroomID: chatroom.id,
      text: newMessage,
      userID: authUser.attributes.sub,
    };

    const newMessageData = await API.graphql(
      graphqlOperation(createMessage, { input: payload })
    );

    setNewMessage('');

    API.graphql(
      graphqlOperation(updateChatRoom, {
        input: {
          id: chatroom.id,
          chatRoomLastMessageId: newMessageData.data?.createMessage?.id,
          _version: chatroom._version,
        },
      })
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={styles.container}>
        {/** Icon plus */}
        <AntDesign name="plus" size={20} color="royalblue" />

        {/** text input */}
        <TextInput
          value={newMessage}
          placeholder="type your message..."
          style={styles.input}
          onChangeText={setNewMessage}
        />

        {/** icon send */}
        <MaterialIcons
          name="send"
          size={16}
          color="white"
          style={styles.send}
          onPress={onSend}
        />
      </View>
    </SafeAreaView>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    padding: 5,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderColor: 'lightgray',
    borderWidth: StyleSheet.hairlineWidth,
  },
  send: {
    backgroundColor: 'royalblue',
    padding: 7,
    borderRadius: 15,
    overflow: 'hidden',
  },
});
