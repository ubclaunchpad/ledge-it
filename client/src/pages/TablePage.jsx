import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../providers/axios';
import ScrollTable from '../components/TablePage/ScrollTable';
import TablePageHeader from '../components/TablePage/TablePageHeader';
import DefaultActionButton from '../components/ActionButton';
import theme from '../../theme';
import { formatString } from '../utils/formatters';
import { METHODS, sortTransactions } from '../utils/sorts';

const URL = process.env.SERVER_URL;

const TablePage = () => {
  const [type, setType] = useState('Expenses');
  const [categories, setCategories] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allButton, setAllButton] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({});
  const [sortMethod, setSortMethod] = useState(METHODS.NEW_TO_OLD);

  const getExpenses = () => {
    axios
      .get(`${URL}/expenses`)
      .then(({ data }) => setExpenseData(data))
      .catch((err) => console.log(`${err}`));
  };

  const getIncomes = () => {
    axios
      .get(`${URL}/incomes`)
      .then(({ data }) => setIncomeData(data))
      .catch((err) => console.log(`${err}`));
  };

  const filterEntries = () => {
    if (type === 'Expenses') {
      return expenseData.filter((entry) =>
        formatString(entry.name).includes(formatString(searchQuery)),
      );
    } else if (type === 'Income') {
      return incomeData.filter((entry) =>
        formatString(entry.name).includes(formatString(searchQuery)),
      );
    }
  };

  const filterCategories = (data) => data.filter((entry) => !!selectedCategories[entry.category]);

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
          sortFunction={setSortMethod}
        />
        <ScrollView style={styles.content}>
          <ScrollTable
            renderList={sortTransactions(filterCategories(filterEntries()), sortMethod)}
            type={type}
          />
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
