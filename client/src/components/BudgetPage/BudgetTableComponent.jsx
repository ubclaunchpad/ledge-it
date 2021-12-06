import React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { MONTHS } from '../../utils/constants';
import { theme } from '../../../theme';

const BudgetTableComponent = ({ budget, isVisible, setVisible, setMonth, setYear }) => {
  return (
    <>
      <List.Item
        key={`${budget.month}-${budget.year}`}
        right={() => (
          <View style={{ flexDirection: 'row', height: 20 }}>
            <View style={{ width: '40%' }}>
              <Text style={styles.month}>{MONTHS[budget.month]}</Text>
            </View>
            <View style={{ width: '30%' }}>
              <Text style={styles.value}>${budget.value}</Text>
            </View>
            <View style={{ width: '30%' }}>
              <Text style={styles.spent}>-${budget.spent}</Text>
            </View>
          </View>
        )}
        onPress={() => {
          setVisible(!isVisible);
          setMonth(MONTHS[budget.month]);
          setYear(budget.year);
        }}
        style={styles.listItem}
      />
    </>
  );
};

export default BudgetTableComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: theme.colors.primaryBackground,
  },
  listItem: {
    borderBottomColor: theme.colors.primaryDark,
    borderBottomWidth: 1,
    marginBottom: 9,
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
