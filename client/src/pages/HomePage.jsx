import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { AddIncomeButton, AddExpenseButton } from '../components/ActionButton';
import CategoryPieChart from '../components/CategoryPieChart';
import ExpenseForm from '../modals/ExpenseForm';
import IncomeForm from '../modals/IncomeForm';

const HomePage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <CategoryPieChart />
        </ScrollView>
      </SafeAreaView>
      <AddIncomeButton>
        <IncomeForm />
      </AddIncomeButton>
      <AddExpenseButton>
        <ExpenseForm />
      </AddExpenseButton>
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
