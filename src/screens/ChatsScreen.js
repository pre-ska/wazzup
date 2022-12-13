import React from 'react';
import { FlatList } from 'react-native';

import ChatListItem from '../components/ChatListItem';
import chats from '../../assets/data/chats.json';

const ChatsScreens = () => {
  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => <ChatListItem chat={item} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ChatsScreens;
