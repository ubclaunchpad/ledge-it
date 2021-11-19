import React from 'react';
import { Text, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import CategoryPieChart from '../components/CategoryPieChart';

const HomePage = () => {
  return (
    <>
      <View>
        <Text>Home Page</Text>
        <Text>This is the home page</Text>
        <CategoryPieChart />
      </View>
      <ActionButton />
    </>
  );
};

export default HomePage;
