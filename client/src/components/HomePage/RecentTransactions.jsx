import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useExpense from '../../hooks/useExpense';
import useIncome from '../../hooks/useIncome';
import theme from '../../../theme';
import { formatNumber } from '../../utils/formatters';

// merge two sorted arrays
const getTransactionsToDisplay = (incomes, expenses) => {
  let i = 0,
    j = 0,
    k = 0;
  const temp = [];

  while (i < expenses.length && j < incomes.length && k < 10) {
    const compareDates = new Date(expenses[i].date) - new Date(incomes[j].date);
    if (
      compareDates === 0
        ? new Date(expenses[i].created_at) - new Date(incomes[j].created_at)
        : compareDates
    ) {
      temp[k++] = { ...expenses[i], price: -expenses[i].price };
      i++;
    } else {
      temp[k++] = { ...incomes[j], price: incomes[j].amount };
      j++;
    }
  }

  while (i < expenses.length && k < 10) {
    temp[k++] = { ...expenses[i], price: -expenses[i].price };
    i++;
  }

  while (j < incomes.length && k < 10) {
    temp[k++] = { ...incomes[j], price: incomes[j].amount };
    j++;
  }

  return temp;
};

const RecentTransactions = () => {
  // merge expense and income dataset and come up with an array sorted by date
  // only show 10 items max

  // TODO: behaviour during loading for either incomes or expenses; likewise, error-handling
  const { incomeLoading, incomeErrors, incomes, getIncomes } = useIncome();
  const { expenseLoading, expenseErrors, expenses, getExpenses } = useExpense();

  const [displayData, setDisplayData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      getExpenses();
      getIncomes();
    }, [getExpenses, getIncomes]),
  );

  useEffect(() => {
    setDisplayData(getTransactionsToDisplay(incomes.slice(0, 10), expenses.slice(0, 10)));
  }, [incomes, expenses]);

  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>Recent transactions</Text>
      <View style={styles.categoryView}>
        <View style={styles.card}>
          <Text style={styles.labelText}>Name</Text>
          <Text style={styles.labelText}>Category</Text>
          <Text style={styles.labelText}>Amount</Text>
        </View>
        {displayData?.length ? (
          displayData.map((item) => (
            <View style={styles.card} key={item._id}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardText}>{item.name}</Text>
              </View>
              <View style={styles.cardMid}>
                <Text style={styles.cardText}>{item.category}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text
                  style={[
                    styles.cardText,
                    item.price < 0 ? styles.expenseText : styles.incomeText,
                  ]}>
                  {item.price < 0 && '-'}${formatNumber(item.price || item.amount)}
                </Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.errorTextView}>
            <Text style={styles.errorText}>No recent transactions</Text>
          </View>
        )}
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
  incomeText: {
    color: theme.colors.green,
  },
  expenseText: {
    color: theme.colors.red,
  },
  errorTextView: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: theme.colors.textDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecentTransactions;
