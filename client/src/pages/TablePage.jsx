import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import ScrollTable from '../components/TablePage/ScrollTable';
import TablePageHeader from '../components/TablePage/TablePageHeader';
import DefaultActionButton from '../components/ActionButton';
import { theme } from '../../theme';

const url = 'https://money-manager-dev.herokuapp.com';

const TablePage = () => {
  const [type, setType] = useState('Expenses');
  const [categories, setCategories] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getExpenses();
      getIncomes();
    }, []),
  );

  // TODO: Fetch user categories from db here
  useEffect(() => {
    if (type === 'Expenses') {
      setCategories(['Food', 'Housing', 'Fun', 'Other']);
    } else {
      setCategories(['Main job', 'Part-time', 'Passive', 'Other']);
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

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TablePageHeader categories={categories} type={type} setType={setType} />
        <ScrollView style={styles.content}>
          <ScrollTable renderList={type === 'Expenses' ? expenseData : incomeData} type={type} />
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
