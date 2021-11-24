import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import AddExpense from '../modals/AddExpense';

const HomePage = () => {
  return (
    <>
      <View>
        <Text>Home Page</Text>
        <Text>This is the home page</Text>
      </View>
      <ActionButton height={Dimensions.get('window').height}>
        <AddExpense/>
      </ActionButton>
    </>
  );
};

export default HomePage;
