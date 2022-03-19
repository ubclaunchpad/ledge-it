import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { theme } from '../../../../theme';
import { formatNumber, formatDateBE } from '../../../utils/formatters';

const URL = process.env.SERVER_URL;

const months = [
  { label: 'January', value: 1 },
  { label: 'Febuary', value: 2 },
  { label: 'March', value: 3 },
  { label: 'April', value: 4 },
  { label: 'May', value: 5 },
  { label: 'June', value: 6 },
  { label: 'July', value: 7 },
  { label: 'August', value: 8 },
  { label: 'September', value: 9 },
  { label: 'October', value: 10 },
  { label: 'November', value: 11 },
  { label: 'December', value: 12 },
];

const CalenderPageHeader = ({ month, setMonth, year }) => {
  const [incomeOverview, setIncomeOverview] = useState([]);
  const [expenseOverview, setExpenseOverview] = useState([]);
  const [monthDropdownVisible, setMonthDropdownVisible] = useState(false);
  const [expenseScreenVisible, setExpenseScreenVisible] = useState(true); // use this to show correct calendar
  const dropdownTextStyle = monthDropdownVisible ? styles.placeholder : styles.text;

  useFocusEffect(() => {
    getMonthOverview();
  });

  const getMonthOverview = useCallback(() => {
    const options = { year: '4-digit', month: '2-digit', day: '2-digit' };
    const start_time = formatDateBE(new Date(year, month, 1).toLocaleDateString(options));
    const end_time = formatDateBE(new Date(year, month + 1, 0).toLocaleDateString(options));

    axios
      .get(`${URL}/income/ranged/${start_time}/${end_time}`, {})
      .then((res) => {
        const income = res.data.reduce((acc, item) => acc + item.amount, 0);
        setIncomeOverview(income);
      })
      .catch((e) => setIncomeOverview(0));
    axios
      .get(`${URL}/expense/ranged/${start_time}/${end_time}`, {})
      .then((res) => {
        const expense = res.data.reduce((acc, item) => acc + item.price, 0);
        setExpenseOverview(expense);
      })
      .catch((e) => setExpenseOverview(0));
    return formatNumber(incomeOverview + expenseOverview);
  }, [expenseOverview, incomeOverview, month, year]);

  return (
    <View style={styles.headerBackground}>
      <View style={styles.monthTitle}>
        <DropDownPicker
          style={[styles.choiceSelect, { border: 'none' }]}
          open={monthDropdownVisible}
          value={month + 1}
          items={months}
          setOpen={setMonthDropdownVisible}
          setValue={setMonth}
          placeholder="January"
          placeholderStyle={styles.placeholder}
          textStyle={dropdownTextStyle}
          dropDownContainerStyle={styles.dropDown}
          containerStyle={styles.container}
          listMode="SCROLLVIEW"
          showArrowIcon={false}
        />
      </View>
      <View style={styles.screenOptions}>
        <Pressable
          style={() => [
            screenButton.background,
            { backgroundColor: expenseScreenVisible ? theme.colors.white : theme.colors.primary },
          ]}
          onPress={() => setExpenseScreenVisible(true)}>
          <Text style={expenseScreenVisible ? screenButton.focusedText : screenButton.text}>
            Expenses
          </Text>
        </Pressable>
        <Pressable
          style={() => [
            screenButton.background,
            { backgroundColor: expenseScreenVisible ? theme.colors.primary : theme.colors.white },
          ]}
          onPress={() => setExpenseScreenVisible(false)}>
          <Text style={expenseScreenVisible ? screenButton.text : screenButton.focusedText}>
            Incomes
          </Text>
        </Pressable>
      </View>
      <Text style={styles.overViewText}>${getMonthOverview()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5%',
    backgroundColor: theme.colors.primary,
  },
  monthTitle: {
    display: 'flex',
    alignSelf: 'center',
    width: '60%',
    zIndex: 1,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  choiceSelect: {
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 30,
    paddingHorizontal: 10,
    backgroundColor: theme.colors.white,
    borderWidth: 2,
    borderColor: theme.colors.primaryDark,
    borderRadius: 20,
    color: theme.colors.primary,
  },
  text: {
    display: 'flex',
    textAlign: 'center',
    color: theme.colors.primaryDark,
    fontSize: 36,
    fontWeight: '300',
  },
  dropDown: {
    borderColor: theme.colors.primaryDark,
    borderWidth: 2,
    borderTopWidth: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
    marginTop: -30,
    marginBottom: 100,
  },
  container: {
    marginTop: 10,
  },
  placeholder: {
    color: theme.colors.lightgrey,
  },
  screenOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overViewText: {
    fontSize: 24,
    fontWeight: '300',
    color: theme.colors.white,
    textAlign: 'center',
    marginTop: -5,
  },
});

const screenButton = StyleSheet.create({
  background: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: theme.colors.white,
  },
  focusedText: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: theme.colors.primary,
  },
});

export default CalenderPageHeader;
