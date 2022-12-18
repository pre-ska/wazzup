import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import ChatListItem from '../../components/ChatListItem';
import { listChatRooms } from './queries';

const ChatsScreens = () => {
  const [chatRooms, setChatRooms] = useState({ rooms: [], authUser: {} });

  useEffect(() => {
    const fetchChatRooms = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const response = await API.graphql(
        graphqlOperation(listChatRooms, { id: authUser.attributes.sub })
      );
      const rooms = response?.data?.getUser?.ChatRooms?.items;

      const sortedRooms = rooms.sort(
        (a, b) =>
          new Date(b.chatRoom.updatedAt) - new Date(a.chatRoom.updatedAt)
      );
      setChatRooms({
        rooms: sortedRooms,
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
