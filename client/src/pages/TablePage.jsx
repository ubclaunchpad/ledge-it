import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import ScrollTable from '../components/TablePage/ScrollTable';
import TablePageHeader from '../components/TablePage/TablePageHeader';
import DefaultActionButton from '../components/ActionButton';
import { theme } from '../../theme';

const url = 'https://ledge-it.herokuapp.com';

const TablePage = () => {
  const [type, setType] = useState('Expenses');
  const [categories, setCategories] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      getExpenses();
      getIncomes();
    }, []),
  );

  // TODO: Fetch user categories from db here
  useEffect(() => {
    if (type === 'Expenses') {
      setCategories(['Housing', 'Food', 'Transport', 'Clothes', 'Entertainment', 'Other']);
    } else {
      setCategories(['Salary', 'Investments', 'Business', 'Other']);
    }
  }, [type]);

  const getExpenses = () => {
    axios
      .get(`${url}/expenses`)
      .then(({ data }) => setExpenseData(data))
      .catch((err) => console.log(`${err}`));
  };

  const getIncomes = () => {
    axios
      .get(`${url}/incomes`)
      .then(({ data }) => setIncomeData(data))
      .catch((err) => console.log(`${err}`));
  };

  const filterEntries = () => {
    if (type === 'Expenses') {
      return expenseData.filter((entry) => entry.name.includes(searchQuery));
    } else if (type === 'Income') {
      return incomeData.filter((entry) => entry.name.includes(searchQuery));
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TablePageHeader
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          type={type}
          setType={setType}
        />
        <ScrollView style={styles.content}>
          <ScrollTable renderList={filterEntries()} type={type} />
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
  },
  content: {
    display: 'flex',
    backgroundColor: theme.colors.primaryLight,
  },
});

export default TablePage;
