import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useExpense from '../hooks/useExpense';
import useIncome from '../hooks/useIncome';
import ScrollTable from '../components/TablePage/ScrollTable';
import TablePageHeader from '../components/TablePage/TablePageHeader';
import DefaultActionButton from '../components/ActionButton';
import theme from '../../theme';
import { formatString } from '../utils/formatters';

const TablePage = () => {
  // TODO: behaviour during loading for either incomes or expenses; likewise, error-handling
  const { incomeLoading, incomeErrors, incomes, getIncomes } = useIncome();
  const { expenseLoading, expenseErrors, expenses, getExpenses } = useExpense();

  const [type, setType] = useState('Expenses');
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allButton, setAllButton] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({});

  const filterEntries = () => {
    if (type === 'Expenses') {
      return expenses.filter((entry) =>
        formatString(entry.name).includes(formatString(searchQuery)),
      );
    } else if (type === 'Income') {
      return incomes.filter((entry) =>
        formatString(entry.name).includes(formatString(searchQuery)),
      );
    }
  };

  const filterCategories = (data) => data.filter((entry) => !!selectedCategories[entry.category]);

  useFocusEffect(
    useCallback(() => {
      getExpenses();
      getIncomes();
    }, [getExpenses, getIncomes]),
  );

  // TODO: Fetch user categories from db here
  useEffect(() => {
    if (type === 'Expenses') {
      setCategories(['Housing', 'Food', 'Transport', 'Clothes', 'Entertainment', 'Other']);
    } else {
      setCategories(['Salary', 'Investments', 'Business', 'Other']);
    }
  }, [type]);

  useEffect(() => {
    setAllButton(true);
    setSelectedCategories((sl) => {
      const copyOfSelectedLookup = sl;
      categories.forEach((category) => {
        copyOfSelectedLookup[category] = true;
      });
      return { ...copyOfSelectedLookup };
    });
  }, [categories]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TablePageHeader
          categories={categories}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          type={type}
          setType={setType}
          allButton={allButton}
          setAllButton={setAllButton}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
        <ScrollView style={styles.content}>
          <ScrollTable renderList={filterCategories(filterEntries())} type={type} />
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
