import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import ActionButton from '../components/ActionButton';
import CategoryPieChart from '../components/CategoryPieChart';
import RecentTransactions from '../components/Home/RecentTransactions';
import ExpenseForm from '../modals/ExpenseForm';

const HomePage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <CategoryPieChart />
          <RecentTransactions />
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
  },
  content: {
    display: 'flex',
  },
});

export default HomePage;
