import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import BudgetTable from '../components/BudgetPage/BudgetTable';
import BudgetHeader from '../components/BudgetPage/BudgetPageHeader';
import { theme } from '../../theme';

const budgetDatabase = [
  {
    month: 11,
    year: 2021,
    value: 200.27,
    spent: 100.99,
  },
  {
    month: 9,
    year: 2021,
    value: 82.74,
    spent: 13.78,
  },
  {
    month: 8,
    year: 2021,
    value: 98.23,
    spent: 387.92,
  },
  {
    month: 7,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 6,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 5,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 4,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 3,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 2,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 0,
    year: 2021,
    value: 1098.63,
    spent: 906.54,
  },
  {
    month: 11,
    year: 2020,
    value: 1098.63,
    spent: 906.54,
  },
  {
    month: 10,
    year: 2020,
    value: 1098.63,
    spent: 906.54,
  },
  {
    month: 0,
    year: 2019,
    value: 1098.63,
    spent: 906.54,
  },
];

const BudgetPage = () => {
  const [sortMethod, setSortMethod] = useState('new->old');
  const [year, setYear] = useState(2021);
  const sortBudgets = () => {
    if (sortMethod === 'old->new') {
      console.log(sortMethod);
      return budgetDatabase.sort((a, b) => {
        return a.year + a.month / 12 - (b.year + b.month / 12);
      });
    } else if (sortMethod === 'high->low') {
      return budgetDatabase.sort((a, b) => {
        return b.value - a.value;
      });
    } else if (sortMethod === 'low->high') {
      return budgetDatabase.sort((a, b) => {
        return a.value - b.value;
      });
    } else {
      return budgetDatabase.sort((a, b) => {
        return b.year + b.month / 12 - (a.year + a.month / 12);
      });
    }
  };

  return (
    <>
      <BudgetHeader year={year} setYear={setYear} sortFunction={setSortMethod} />
      <List.Item
        style={styles.header}
        right={() => (
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
            <View style={{ width: '40%' }}>
              <Text style={styles.subheader}> Month</Text>
            </View>
            <View style={{ width: '30%' }}>
              <List.Icon style={styles.value} color={theme.colors.green} icon="arrow-up-bold" />
            </View>
            <View style={{ width: '30%' }}>
              <List.Icon style={styles.spent} color={theme.colors.red} icon="arrow-down-bold" />
            </View>
          </View>
        )}
      />
      <BudgetTable renderList={sortBudgets().filter((monthBudget) => monthBudget.year === year)} />
    </>
  );
};

export default BudgetPage;

const styles = StyleSheet.create({
  header: {
    fontSize: 42,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  subheader: {
    color: theme.colors.textLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    color: theme.colors.green,
    alignSelf: 'center',
  },
  spent: {
    color: theme.colors.red,
    alignSelf: 'center',
  },
});
