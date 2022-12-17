export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            LastMessage {
              id
              createdAt
              text
            }
            users {
              items {
                id
                user {
                  name
                  image
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
