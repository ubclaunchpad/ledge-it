import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../../theme';
import { getDay, getMonth, getYear } from '../../utils/formatters';
import { MONTHS } from '../../utils/constants';

const BudgetDetailsTableComponent = ({ expenses }) => (
  <View style={styles.list}>
    {expenses.map((expense, index) => (
      <List.Item
        key={index}
        title={<Text style={styles.subheader}>{expense.name}</Text>}
        description={
          <View>
            <Text style={styles.text}>{expense.category}</Text>
            <Text style={styles.text}>
              {MONTHS[getMonth(expense.date) - 1]} {getDay(expense.date)}, {getYear(expense.date)}
            </Text>
          </View>
        }
        right={() => (
          <View>
            <Text />
            <Text style={styles.price}>
              -${expense.price || expense.amount} {expense.currency.toUpperCase()}
            </Text>
          </View>
        )}
        style={styles.listItem}
      />
    ))}
  </View>
);

export default BudgetDetailsTableComponent;

const styles = StyleSheet.create({
  list: {
    marginVertical: 10,
    backgroundColor: theme.colors.textLight,
  },
  header: {
    fontSize: 30,
    color: theme.colors.textDark,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textDark,
  },
  text: {
    fontSize: 12,
    color: theme.colors.textDark,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textDark,
    justifyContent: 'space-evenly',
  },
  listItem: {
    backgroundColor: theme.colors.textLight,
    marginVertical: 5,
    borderBottomWidth: 1,
    width: '100%',
  },
});
