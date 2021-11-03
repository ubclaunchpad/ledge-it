import React from 'react';
import { Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';

const HomePage = () => {
  return (
    <React.Fragment>
      <View>
        <Text>Home Page</Text>
        <Text>This is the home page</Text>
      </View>
      <ActionButton />
    </React.Fragment>
  );
};

export default HomePage;
