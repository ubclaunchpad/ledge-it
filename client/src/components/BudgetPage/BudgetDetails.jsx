import React, { useCallback, useState } from 'react';
import { Text, View, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../providers/axios';
import BudgetDetailsTable from './BudgetDetailsTable';
import theme from '../../../theme';
import { MONTHS } from '../../utils/constants';
import CategoryPieChart from './BudgetPieChart';
import BudgetProgressBar from './BudgetProgressBar';
import StyledButton from '../StyledButton';
import Modal from '../CustomModal';

const URL = process.env.SERVER_URL;

const BudgetDetails = ({ currentMonth, currentYear, isVisible, setVisible }) => {
  const [databaseExpense, setDatabaseExpense] = useState([]);
  const [categoryBudgetData, setCategoryBudgetData] = useState([]);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [sortMethod, setSortMethod] = useState('vlow->vhigh');

  useFocusEffect(
    useCallback(() => {
      async function getExpenses() {
        await axios
          .get(`${URL}/expense/${currentYear}/${currentMonth}`)
          .then(({ data }) => setDatabaseExpense(data))
          .catch((err) => console.log(err));
      }

      async function getBudgets() {
        await axios
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
      }

      getExpenses();
      getBudgets();
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

  const ratio = `${Math.round((calculateExpense.total / calculateBudget.total) * 100) || 0}%`;

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
        <View>
          <CategoryPieChart
            currentMonth={currentMonth}
            categoryBudgetData={categoryBudgetData}
            calculateBudget={calculateBudget.total}
            calculateExpense={calculateExpense.total}
            ratio={ratio}
          />
          <View style={styles.row}>
            <BudgetProgressBar calculateBudget={calculateBudget.total} ratio={ratio} />
            <StyledButton
              customStyles={dropDownStyles}
              label="Sort"
              onTap={() => setSortModalVisible(true)}
              iconName={sortModalVisible ? 'chevron-up' : 'chevron-down'}
              underlayColor={theme.colors.primaryBackground}
              activeOpacity={1}
            />
          </View>
          <BudgetDetailsTable
            renderList={databaseExpense}
            categoryBudget={categoryBudgetData}
            sortMethod={sortMethod}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.message}>No expenses in this month</Text>
        </View>
      )}
      <Modal isModalVisible={sortModalVisible} setModalVisible={setSortModalVisible}>
        <View>
          <StyledButton
            onTap={() => {
              setSortMethod('vhigh->vlow');
              setSortModalVisible(false);
            }}
            customStyles={btnCustomStyles}
            label="Budget Value (high to low)"
          />
          <StyledButton
            onTap={() => {
              setSortMethod('vlow->vhigh');
              setSortModalVisible(false);
            }}
            customStyles={btnCustomStyles}
            label="Budget Value (low to high)"
          />
          <StyledButton
            onTap={() => {
              setSortMethod('shigh->slow');
              setSortModalVisible(false);
            }}
            customStyles={btnCustomStyles}
            label="Budget Spent (high to low)"
          />
          <StyledButton
            onTap={() => {
              setSortMethod('slow->shigh');
              setSortModalVisible(false);
            }}
            customStyles={btnCustomStyles}
            label="Budget Spent (low to high)"
          />
        </View>
      </Modal>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 15,
  },
});

const dropDownStyles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.colors.textLight,
    borderWidth: 2,
    justifyContent: 'center',
    paddingVertical: 1,
    paddingHorizontal: 7,
  },

  text: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const btnCustomStyles = StyleSheet.create({
  background: {
    color: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: 40,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: theme.colors.primary,
  },
});
