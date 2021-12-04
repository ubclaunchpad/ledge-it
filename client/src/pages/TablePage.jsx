import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import ScrollTable from '../components/TablePage/ScrollTable';
import TablePageHeader from '../components/TablePage/TablePageHeader';
import ActionButton from '../components/ActionButton';
import ExpenseForm from '../modals/ExpenseForm';
import { theme } from '../../theme';

// Note: These are just sample data of expense/income from the database.

const expenseDatabase = [
  {
    name: 'Gym',
    price: '65.00',
    date: '2022-10-21',
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    name: 'Gym',
    price: '65.00',
    date: '2021-10-21',
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    name: 'Coffee',
    price: '4.29',
    date: '2021-10-17',
    currency: 'CAD',
    category: 'Category #12',
  },
  {
    name: 'Monitor',
    price: '205.00',
    date: '2021-09-27',
    currency: 'CAD',
    category: 'Category #13',
  },
  {
    name: 'Mouse',
    price: '54.99',
    date: '2021-09-05',
    currency: 'CAD',
    category: 'Category #22',
  },
  {
    name: 'Skateboard',
    price: '80.99',
    date: '2021-08-17',
    currency: 'USD',
    category: 'Category #25',
  },
];

const incomeDatabase = [
  {
    name: 'Part Time: Piano Lessons',
    price: '650.00',
    date: '2021-10-21',
    currency: 'CAD',
    category: 'Category #1',
  },
  {
    name: 'Tax Refunds',
    price: '205.00',
    date: '2021-09-27',
    currency: 'CAD',
    category: 'Category #13',
  },
  {
    name: 'Part Time: CPSC 312 TA',
    price: '1344.99',
    date: '2021-09-05',
    currency: 'CAD',
    category: 'Category #1',
  },
  {
    name: 'Monthly Allowance',
    price: '80.99',
    date: '2021-08-17',
    currency: 'USD',
    category: 'Category #25',
  },
];

const TablePage = () => {
  const [type, setType] = useState('Expenses');
  const [categories, setCategories] = useState([]);

  // Fetch user categories from db here
  useEffect(() => {
    if (type === 'Expenses') {
      setCategories(['Food', 'Housing', 'Fun', 'Other']);
    } else {
      setCategories(['Main job', 'Part-time', 'Passive', 'Other']);
    }
  }, [type]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TablePageHeader categories={categories} type={type} setType={setType} />
        <ScrollView style={styles.content}>
          <ScrollTable
            renderList={type === 'Expenses' ? expenseDatabase : incomeDatabase}
            type={type}
          />
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
    backgroundColor: theme.colors.primaryLight,
  },
});

export default TablePage;
