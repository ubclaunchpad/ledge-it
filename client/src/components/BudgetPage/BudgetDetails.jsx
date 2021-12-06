import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BudgetDetailsTable from './BudgetDetailsTable';
import { theme } from '../../../theme';
import { MONTHS } from '../../utils/constants';
import { getMonth, getYear } from '../../utils/formatters';

const BudgetDetails = ({ expenseDatabase, currentMonth, currentYear, isVisible, setVisible }) => {
  const [splitList, setSplitList] = useState([]);

  useEffect(() => {
    const tempList = [];
    expenseDatabase.forEach((expense) => {
      const month = MONTHS[getMonth(expense.date) - 1];
      const year = getYear(expense.date);
      if (month === currentMonth && year === currentYear) {
        tempList.push(expense);
      }
    });
    setSplitList(tempList);
  }, [expenseDatabase, currentMonth, currentYear]);

  return (
    <SafeAreaView style={styles.listContainer}>
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => setVisible(!isVisible)}>
          <Ionicons name="arrow-back-outline" color={theme.colors.primaryDark} size={35} />
        </Pressable>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.title}>{currentMonth}</Text>
        </View>
      </View>
      {splitList.length > 0 ? (
        <BudgetDetailsTable renderList={splitList} />
      ) : (
        <View>
          <Text style={styles.message}>No expenses in this month</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BudgetDetails;

const styles = StyleSheet.create({
  listContainer: {
    display: 'flex',
    overflow: 'scroll',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: theme.colors.primary,
  },
  message: {
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: theme.colors.black,
  },
  closeButton: {
    position: 'absolute',
    left: 15,
    top: 20,
  },
});
