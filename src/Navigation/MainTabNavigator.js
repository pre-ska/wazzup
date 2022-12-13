import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import ChatsScreens from '../screens/ChatsScreen';
import NotImplementedScreen from './NotImplementedScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Chats">
      <Tab.Screen name="Status" component={NotImplementedScreen} />
      <Tab.Screen name="Calls" component={NotImplementedScreen} />
      <Tab.Screen name="Camera" component={NotImplementedScreen} />
      <Tab.Screen name="Chats" component={ChatsScreens} />
      <Tab.Screen name="Settings" component={NotImplementedScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
