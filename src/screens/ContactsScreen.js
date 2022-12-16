import { API, graphqlOperation } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { listUsers } from '../graphql/queries';

const ContactsScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.graphql(graphqlOperation(listUsers)).then((result) => {
      setUsers(result?.data?.listUsers?.items);
    });
  }, []);

  listUsers;
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <ContactListItem user={item} />}
      style={{ backgroundColor: 'white' }}
    />
  );
};

export default ContactsScreen;
