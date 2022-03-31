import React, { useState } from 'react';
import { List, Button } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions } from 'react-native';
import theme from '../../../theme';
import BudgetTableComponent from './BudgetTableComponent';
import BudgetHeader from './BudgetPageHeader';
import axios from '../../providers/axios';

const BudgetTable = ({
  renderList,
  month,
  year,
  setMonth,
  setYear,
  setShowTable,
  setShowDetails,
  setShowEdit,
}) => {
  const [sortMethod, setSortMethod] = useState('new->old');

  const URL = process.env.SERVER_URL;

  const createIfBudgetDNE = async () => {
    try {
      await axios.get(`${URL}/budget`, { params: { month, year } });
    } catch (error) {
      await initializeBudget();
    }
  };

  const initializeBudget = () => {
    return Promise.all([initializeBudgetAmount(), initializeBudgetCategories()]);
  };

  const initializeBudgetAmount = () => {
    return axios.post(`${URL}/budget`, {
      month,
      year,
      value: 0,
      spent: 0,
    });
  };

  const initializeBudgetCategories = async () => {
    try {
      const response = await axios.get(`${URL}/expense_categories`);
      const userCategories = response.data;
      const promises = [];
      userCategories.forEach(async (categoryInfo) => {
        promises.push(initializeBudgetCategory(categoryInfo.name));
      });
      return Promise.all(promises);
    } catch (error) {
      console.log(`initializeBudgetCategories error: ${error}`);
    }
  };

  const initializeBudgetCategory = async (categoryName) => {
    return axios.post(`${URL}/budget/category`, {
      month,
      year,
      value: 0,
      spent: 0,
      category: categoryName,
    });
  };

  const sortBudgets = () => {
    if (sortMethod === 'old->new') {
      return renderList.sort((a, b) => {
        return a.year + a.month / 12 - (b.year + b.month / 12);
      });
    } else if (sortMethod === 'high->low') {
      return renderList.sort((a, b) => {
        return b.value - a.value;
      });
    } else if (sortMethod === 'low->high') {
      return renderList.sort((a, b) => {
        return a.value - b.value;
      });
    } else {
      return renderList.sort((a, b) => {
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
            <View style={{ width: '30%', alignItems: 'center' }}>
              <List.Icon style={styles.value} color={theme.colors.green} icon="arrow-up-bold" />
            </View>
            <View style={{ width: '30%', alignItems: 'center' }}>
              <List.Icon style={styles.spent} color={theme.colors.red} icon="arrow-down-bold" />
            </View>
          </View>
        )}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <List.Section>
            {sortBudgets()
              .filter((monthBudget) => monthBudget.year === year)
              .map((budget) => (
                <BudgetTableComponent
                  key={`${budget.month}-${budget.year}`}
                  budget={budget}
                  setMonth={setMonth}
                  setYear={setYear}
                  setShowDetails={setShowDetails}
                  setShowTable={setShowTable}
                />
              ))}
          </List.Section>
          <View style={{ height: 300 }} />
        </ScrollView>
      </SafeAreaView>
      <View style={styles.centeredView}>
        <Button
          mode="contained"
          color={theme.colors.primary}
          labelStyle={{ fontSize: 20 }}
          uppercase={false}
          style={styles.fab}
          onPress={async () => {
            await createIfBudgetDNE();
            setShowTable(false);
            setShowEdit(true);
          }}>
          Edit Budget
        </Button>
      </View>
    </>
  );
};

export default BudgetTable;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
  },
  fab: {
    position: 'absolute',
    margin: 25,
    height: 44,
    right: 0,
    bottom: 10,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
  },
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
  scrollView: {
    minHeight: Dimensions.get('window').height - 360,
  },
  month: {
    color: theme.colors.textDark,
    fontSize: 16,
  },
  value: {
    color: theme.colors.green,
    fontSize: 16,
    textAlign: 'center',
  },
  spent: {
    color: theme.colors.red,
    fontSize: 16,
    textAlign: 'center',
  },
});
