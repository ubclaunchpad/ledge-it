import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { theme } from '../../../theme';

// data taken directly from "../pages/TablePage"
const expenseDatabase = [
  {
    id: 0,
    name: 'Gym',
    price: '65.00',
    date: new Date('2022-10-21T10:34:23'),
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    id: 1,
    name: 'Gym',
    price: '65.00',
    date: new Date('2021-10-21T10:34:23'),
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    id: 2,
    name: 'Coffee',
    price: '4.29',
    date: new Date('2021-10-17T10:34:23'),
    currency: 'CAD',
    category: 'Category #12',
  },
  {
    id: 3,
    name: 'Monitor',
    price: '205.00',
    date: new Date('2021-09-27T10:34:23'),
    currency: 'CAD',
    category: 'Category #13',
  },
  {
    id: 4,
    name: 'Mouse',
    price: '54.99',
    date: new Date('2021-09-05T10:34:23'),
    currency: 'CAD',
    category: 'Category #22',
  },
  {
    id: 5,
    name: 'Skateboard',
    price: '80.99',
    date: new Date('2021-08-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
];

const incomeDatabase = [
  {
    id: 6,
    name: 'Part Time: Piano Lessons',
    price: '650.00',
    date: new Date('2021-10-21T10:34:23'),
    currency: 'CAD',
    category: 'Category #1',
  },
  {
    id: 7,
    name: 'Tax Refunds',
    price: '205.00',
    date: new Date('2021-09-27T10:34:23'),
    currency: 'CAD',
    category: 'Category #13',
  },
  {
    id: 8,
    name: 'Part Time: CPSC 312 TA',
    price: '1344.99',
    date: new Date('2021-09-05T10:34:23'),
    currency: 'CAD',
    category: 'Category #1',
  },
  {
    id: 9,
    name: 'Monthly Allowance',
    price: '80.99',
    date: new Date('2021-08-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
];

const getTransactionsToDisplay = () => {
  const expenses = expenseDatabase.slice(0, 10);
  const incomes = incomeDatabase.slice(0, 10);

  // merge two sorted arrays
  let i = 0,
    j = 0,
    k = 0;
  const temp = [];
  while (i < expenses.length && j < incomes.length && k < 10) {
    if (expenses[i].date - incomes[j].date) {
      temp[k] = expenses[i];
      i += 1;
      temp[k].price = '-$'.concat(temp[k].price);
    } else {
      temp[k] = incomes[j];
      j += 1;
      temp[k].price = '$'.concat(temp[k].price);
    }
    k += 1;
  }

  while (i < expenses.length && k < 10) {
    temp[k] = expenses[i];
    i += 1;
    k += 1;
  }
  while (j < incomes.length && k < 10) {
    temp[k] = incomes[j];
    j += 1;
    k += 1;
  }

  return temp;
};

const RecentTransactions = () => {
  // merge expense and income dataset and come up with an array sorted by date
  // only show 10 items max
  const transactionsToDisplay = getTransactionsToDisplay();

  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>Recent transactions</Text>
      <View style={styles.categoryView}>
        <View style={styles.card}>
          <Text style={styles.labelText}>Name</Text>
          <Text style={styles.labelText}>Category</Text>
          <Text style={styles.labelText}>Amount</Text>
        </View>
        {transactionsToDisplay.map((item) => {
          return (
            <View style={styles.card} key={item.id}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardText}>{item.name}</Text>
              </View>
              <View style={styles.cardMid}>
                <Text style={styles.cardText}>{item.category}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardText}>{item.price}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: theme.colors.primaryDark,
    paddingBottom: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
    color: theme.colors.primary,
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: theme.colors.primaryDark,
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingRight: 5,
  },
  cardMid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.grey,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
  },
});

export default RecentTransactions;
