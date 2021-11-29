import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import ActionButton from '../components/ActionButton';
import CategoryPieChart from '../components/HomePage/CategoryPieChart';
import ExpenseForm from '../modals/ExpenseForm';
import ToggleCard from '../components/HomePage/ToggleCard';
import NetWorthCard from '../components/HomePage/NetWorthCard';

const HomePage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <NetWorthCard />
          <ToggleCard />
          <CategoryPieChart />
          <View style={{ height: 60 }} />
        </ScrollView>
      </SafeAreaView>
      <ActionButton>
        <ExpenseForm />
      </ActionButton>
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
