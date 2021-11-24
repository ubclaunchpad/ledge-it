import React from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from '../components/ActionButton';
import ToggleCard from '../components/ToggleCard';
import NetWorthCard from '../components/NetWorthCard';

const HomePage = () => {
  return (
    <View style={styles.container}>
      <NetWorthCard />
      <ToggleCard />
      <ActionButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default HomePage;
