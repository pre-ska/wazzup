import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const Message = ({ message }) => {
  const isMyMessage = () => message.item.user.id === 'u1';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMyMessage() ? 'green' : 'white',
          alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      <Text>{message.item.text}</Text>
      <Text style={styles.time}>
        {dayjs(message.item.createdAt).fromNow(true)}
      </Text>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
  },
});
