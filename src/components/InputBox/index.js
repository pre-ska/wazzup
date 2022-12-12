import {
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

const InputBox = () => {
  const [newMessage, setNewMessage] = useState('');
  const onSend = (e) => {
    console.log('sending new message', newMessage);
    setNewMessage('');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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
    </KeyboardAvoidingView>
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
