import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import ChatListItem from '../../components/ChatListItem';
import chats from '../../../assets/data/chats.json';
import { AppRegistry } from 'react-native-web';
import { listChatRooms } from './queries';

const ChatsScreens = () => {
  const [chatRooms, setChatRooms] = useState({ rooms: [], authUser: {} });

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );

      setChatRooms({
        rooms: response?.data?.getUser?.ChatRooms?.items || [],
        authUser,
      });
    };

    fetchChatRooms();
  }, []);

  if (!chatRooms.rooms.length) {
    return null;
  }

  return (
    <FlatList
      data={chatRooms.rooms}
      renderItem={({ item }) => (
        <ChatListItem
          chat={item.chatRoom}
          authUserSUB={chatRooms.authUser.attributes?.sub}
        />
      )}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ChatsScreens;
