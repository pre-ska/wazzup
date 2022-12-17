import { API, Auth, graphqlOperation } from 'aws-amplify';

export const getCommonChatRoomWithUser = async (userID) => {
  const authUser = await Auth.currentAuthenticatedUser();
  // get all chat rooms for user 1
  console.log(authUser.attributes.sub);
  const response = await API.graphql(
    graphqlOperation(listChatRooms, {
      id: authUser.attributes.sub,
    })
  );

  const chatRooms = response?.data?.getUser.ChatRooms?.items || [];

  const chatRoom = chatRooms.find((roomItem) =>
    roomItem.chatRoom.users.items.some(
      (userItem) => userItem.user.id === userID
    )
  );

  return chatRoom;
};

export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            users {
              items {
                id
                user {
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`;
