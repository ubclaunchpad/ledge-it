import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions } from 'react-native';
import theme from '../../../theme';
import BudgetTableComponent from './BudgetTableComponent';
import BudgetHeader from './BudgetPageHeader';

const BudgetTable = ({ renderList, isVisible, setVisible, setMonth, year, setYear }) => {
  const [sortMethod, setSortMethod] = useState('new->old');

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
                  isVisible={isVisible}
                  setVisible={setVisible}
                  setMonth={setMonth}
                  setYear={setYear}
                />
              ))}
          </List.Section>
          <View style={{ height: 300 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default BudgetTable;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
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
    minHeight: Dimensions.get('window').height - 200,
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
