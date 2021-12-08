import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import DefaultActionButton from '../components/ActionButton';
import CategoryPieChart from '../components/HomePage/CategoryPieChart';
import ToggleCard from '../components/HomePage/ToggleCard';
import NetWorthCard from '../components/HomePage/NetWorthCard';
import RecentTransactions from '../components/HomePage/RecentTransactions';

const HomePage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <NetWorthCard />
          <ToggleCard />
          <CategoryPieChart />
          <RecentTransactions />
          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>
      <DefaultActionButton />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  content: {
    display: 'flex',
  },
});

export default HomePage;
