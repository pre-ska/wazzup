import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Auth } from 'aws-amplify';

dayjs.extend(relativeTime);

const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);

  useEffect(() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      setIsMe(message.item.userID === authUser.attributes.sub);
    };

    isMyMessage();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isMe ? '#DCF8C5' : 'white',
          alignSelf: isMe ? 'flex-end' : 'flex-start',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 2,
  },
  time: {
    color: 'gray',
    alignSelf: 'flex-end',
  },
});

const aaa = {
  index: 12,
  item: {
    createdAt: '2022-10-03T14:53:00.000Z',
    id: 'm13',
    text: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in',
    user: { id: 'u1', name: 'Vadim' },
  },
};
