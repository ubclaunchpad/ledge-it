import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import ActionButton from '../components/ActionButton';
import CategoryPieChart from '../components/CategoryPieChart';
import ExpenseForm from '../modals/ExpenseForm';
import ToggleCard from '../components/ToggleCard';
import NetWorthCard from '../components/NetWorthCard';

const HomePage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <NetWorthCard />
          <ToggleCard />
          <CategoryPieChart />
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
