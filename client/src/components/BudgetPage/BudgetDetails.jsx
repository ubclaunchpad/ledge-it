import React, { useCallback, useState } from 'react';
import { Text, View, Pressable, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../providers/axios';
import BudgetDetailsTable from './BudgetDetailsTable';
import theme from '../../../theme';
import { MONTHS } from '../../utils/constants';
import CategoryPieChart from './BudgetPieChart'
import BudgetProgressBar from './BudgetProgressBar';
import StyledButton from '../StyledButton';

const URL = process.env.SERVER_URL;

const BudgetDetails = ({ currentMonth, currentYear, isVisible, setVisible }) => {
  const [databaseExpense, setDatabaseExpense] = useState([]);
  const [categoryBudgetData, setCategoryBudgetData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/expense/${currentYear}/${currentMonth}`)
        .then(({ data }) => setDatabaseExpense(data))
        .catch((err) => console.log(err));

        axios
        .get(`${URL}/budget/category/all`, {
          params: {
            month: currentMonth,
            year: currentYear,
          },
        })
        .then((res) => {
          setCategoryBudgetData(res.data);
        })
        .catch((e) => console.log(e));

    }, [currentYear, currentMonth]),
  );

  const calculateExpense = {
    total: categoryBudgetData.reduce((acc, item) => {
      return acc + item.spent;
    }, 0),
  };
  const calculateBudget = {
    total: categoryBudgetData.reduce((acc, item) => {
      return acc + item.value;
    }, 0),
  };

  const ratio = `${Math.round((calculateExpense.total / calculateBudget.total) * 100) || 0 }%`;

  return (
    <SafeAreaView style={styles.listContainer}>
      <View style={styles.header}>
        <Pressable style={styles.closeButton} onPress={() => setVisible(!isVisible)}>
          <Ionicons name="arrow-back-outline" color={theme.colors.textLight} size={35} />
        </Pressable>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Text style={styles.title}>{MONTHS[currentMonth - 1]}</Text>
        </View>
      </View>
      {databaseExpense.length > 0 ? (
        // pie chart --  done
        // progress bar -- done
        // styling
        // sort options          
        <View>
          <CategoryPieChart 
            currentMonth={currentMonth} 
            categoryBudgetData={categoryBudgetData}
            calculateBudget={calculateBudget.total}
            calculateExpense={calculateExpense.total}
            ratio={ratio}
          />
          <View style={styles.row}>
            <BudgetProgressBar
              calculateBudget={calculateBudget.total}
              ratio={ratio}
            />
            <StyledButton
              // customStyles={dropDownStyles}
              label="Sort"
              // onTap={() => setSortModalVisible(true)}
              iconName={'chevron-down'}
            />
          </View>
          {/* sort button */}
          <BudgetDetailsTable renderList={databaseExpense} /> 
        </View>
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
    backgroundColor: theme.colors.primary,
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
    color: theme.colors.textLight,
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  }
});
