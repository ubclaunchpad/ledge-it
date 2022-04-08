import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../providers/axios';
import ScrollTable from '../components/TablePage/ScrollTable';
import TablePageHeader from '../components/TablePage/TablePageHeader';
import DefaultActionButton from '../components/ActionButton';
import theme from '../../theme';
import { formatString } from '../utils/formatters';

const URL = process.env.SERVER_URL;

const TablePage = () => {
  const [type, setType] = useState('Expenses');
  const [categories, setCategories] = useState(new Map());
  const [expenseData, setExpenseData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [allButton, setAllButton] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState({});

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

  useEffect(() => {
    if (type === 'Expenses') {
      axios
        .get(`${URL}/expense_categories`)
        .then(({ data }) => {
          const categoriesMap = new Map();
          data.forEach(({ name, color }) => categoriesMap.set(name, color));
          setCategories(categoriesMap);
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .get(`${URL}/income_categories`)
        .then(({ data }) => {
          const categoriesMap = new Map();
          data.forEach(({ name, color }) => categoriesMap.set(name, color));
          setCategories(categoriesMap);
        })
        .catch((e) => console.log(e));
    }
  }, [type]);

  useEffect(() => {
    setAllButton(true);
    setSelectedCategories((sl) => {
      const copyOfSelectedLookup = sl;
      Array.from(categories.keys()).forEach((category) => {
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
          <ScrollTable
            renderList={filterCategories(filterEntries())}
            type={type}
            categories={categories}
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
    backgroundColor: theme.colors.textLight,
  },
});

export default TablePage;
