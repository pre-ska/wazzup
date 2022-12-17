import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/Navigation';
import { Amplify, API, Auth, graphqlOperation } from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
import { useEffect } from 'react';
import { createUser } from './src/graphql/mutations';
import { getUser } from './src/graphql/queries';

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

const App = () => {
  useEffect(() => {
    const syncUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser({
        bypassCache: true,
      });

      const userData = await API.graphql(
        graphqlOperation(getUser, { id: authUser.attributes?.sub })
      );

      if (userData?.data?.getUser) {
        console.log('user exists in DB');
        return;
      }

      console.log('stvaram novog usera');

      const newUser = {
        id: authUser?.attributes?.sub,
        name: authUser?.attributes?.phone_number,
        status: "Hey, I'm using wazzup",
      };

      const newUserResponse = await API.graphql(
        graphqlOperation(createUser, {
          input: newUser,
        })
      );

      console.log('created user', newUserResponse);
    };

    syncUser();
  }, []);

  return (
    <View style={styles.container}>
      <Navigator />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',
  },
});

export default withAuthenticator(App);
