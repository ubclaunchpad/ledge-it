import React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import theme from '../../../theme';
import { Swipeable } from 'react-native-gesture-handler';
import { getDay, getMonth, getYear } from '../../utils/formatters';
import { MONTHS } from '../../utils/constants';
import axios from '../../providers/axios';

const URL = process.env.SERVER_URL;

const BudgetDetailsTableComponent = ({ expenses }) => {
  const deleteExpense = (id) => {
    axios
      .delete(`${URL}/expense/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  const DeleteComponent = (id) => {
    return (
      <Pressable style={styles.delete} onPress={() => deleteExpense(id)}>
        <Text>Delete</Text>
      </Pressable>
    )
  }

  return (
    <View style={styles.list}>
      {expenses.map((expense, index) => (
        <Swipeable key={index} renderRightActions={() => DeleteComponent(expense._id)}>
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
        </Swipeable>
      ))}
    </View>
  )
};

export default BudgetDetailsTableComponent;

const styles = StyleSheet.create({
  list: {
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
    borderBottomWidth: 1,
    width: '100%',
  },
  delete: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  }
});
