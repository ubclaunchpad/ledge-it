import React, { useCallback, useState } from 'react';
import { Text, View, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../providers/axios';
import BudgetDetailsTable from './BudgetDetailsTable';
import theme from '../../../theme';
import { MONTHS } from '../../utils/constants';

const URL = process.env.SERVER_URL;

const BudgetDetails = ({ currentMonth, currentYear, isVisible, setVisible }) => {
  const [databaseExpense, setDatabaseExpense] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/expense/${currentYear}/${currentMonth}`)
        .then(({ data }) => setDatabaseExpense(data))
        .catch((err) => console.log(err));
    }, [currentYear, currentMonth]),
  );

  return (
    <SafeAreaView style={styles.listContainer}>
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => setVisible(!isVisible)}>
          <Ionicons name="arrow-back-outline" color={theme.colors.primaryDark} size={35} />
        </Pressable>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.title}>{MONTHS[currentMonth - 1]}</Text>
        </View>
      </View>
      {databaseExpense.length > 0 ? (
        <BudgetDetailsTable renderList={databaseExpense} />
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
