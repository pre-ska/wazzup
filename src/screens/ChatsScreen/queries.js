export const listChatRooms = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      ChatRooms {
        items {
          chatRoom {
            id
            updatedAt
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
