import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import axios from 'axios';
import { theme } from '../../../theme';
import { formatNumber } from '../../utils/formatters';

// merge two sorted arrays
const getTransactionsToDisplay = (incomes, expenses) => {
  let i = 0,
    j = 0,
    k = 0;
  const temp = [];

  while (i < expenses.length && j < incomes.length && k < 10) {
    if (expenses[i].date - incomes[j].date) {
      temp[k] = expenses[i++];
      temp[k++].price *= -1;
    } else {
      temp[k++] = incomes[j++];
    }
  }

  while (i < expenses.length && k < 10) {
    temp[k] = expenses[i++];
    temp[k++].price *= -1;
  }

  while (j < incomes.length && k < 10) {
    temp[k++] = incomes[j++];
  }

  return temp;
};

const RecentTransactions = () => {
  // merge expense and income dataset and come up with an array sorted by date
  // only show 10 items max
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const url = 'https://money-manager-dev.herokuapp.com/';

  useEffect(() => {
    getExpenses();
    getIncomes();
  }, []);

  useEffect(() => {
    setDisplayData(getTransactionsToDisplay(incomeData.slice(0, 10), expenseData.slice(0, 10)));
  }, [incomeData, expenseData]);

  const getExpenses = () => {
    axios
      .get(`${url}expenses`)
      .then((res) => {
        const exp = res.data;
        exp.forEach((ex) => (ex.date = new Date(ex.created_at)));
        setExpenseData(exp);
        console.log(exp);
      })
      .catch((err) => console.log(`${err}`));
  };

  const getIncomes = () => {
    axios
      .get(`${url}incomes`)
      .then((res) => {
        const inc = res.data;
        inc.forEach((i) => (i.date = new Date(i.created_at)));
        setIncomeData(inc);
        console.log(inc);
      })
      .catch((err) => console.log(`${err}`));
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>Recent transactions</Text>
      <View style={styles.categoryView}>
        <View style={styles.card}>
          <Text style={styles.labelText}>Name</Text>
          <Text style={styles.labelText}>Category</Text>
          <Text style={styles.labelText}>Amount</Text>
        </View>
        {displayData.map((item) => {
          return (
            <View style={styles.card} key={item.id}>
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
                  {item.price < 0 && '-'}${formatNumber(item.price)}
                </Text>
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
  incomeText: {
    color: theme.colors.green,
  },
  expenseText: {
    color: theme.colors.red,
  },
});

export default RecentTransactions;
