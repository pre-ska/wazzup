import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not Implemented Screen!</Text>
      <Image
        source={{
          uri: 'https://abounds.wpenginepowered.com/wp-content/uploads/2016/06/Ready-Banner.jpg',
        }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

export default NotImplementedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 500,
    height: 500,
  },
  text: {},
});
