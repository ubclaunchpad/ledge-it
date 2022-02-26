import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import StyledButton from '../../StyledButton';
import { theme } from '../../../../theme';

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

const CalenderPageHeader = ({ month, setMonth }) => {
  const [monthDropdownVisible, setMonthDropdownVisible] = useState(false);
  const [expenseScreenVisible, setExpenseScreenVisible] = useState(true); // use this to show correct calendar
  const dropdownTextStyle = monthDropdownVisible ? styles.placeholder : styles.text;

  return (
    <View style={styles.headerBackground}>
      <View style={styles.monthTitle}>
        <DropDownPicker
          style={[styles.choiceSelect, { border: 'none' }]}
          open={monthDropdownVisible}
          value={month}
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
          <Text
            style={() => [
              screenButton.text,
              { color: expenseScreenVisible ? theme.colors.primary : theme.colors.white },
            ]}>
            Expenses
          </Text>
        </Pressable>
        <Pressable
          style={() => [
            screenButton.background,
            { backgroundColor: expenseScreenVisible ? theme.colors.primary : theme.colors.white },
          ]}
          onPress={() => setExpenseScreenVisible(false)}>
          <Text
            style={() => [
              screenButton.text,
              { color: expenseScreenVisible ? theme.colors.white : theme.colors.primary },
            ]}>
            Incomes
          </Text>
        </Pressable>
      </View>
      <Text>$-1023.00</Text>
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
    marginTop: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
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
    marginTop: -20,
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
});

const screenButton = StyleSheet.create({
  background: {
    padding: 10,
    paddingHorizontal: 10,
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  text: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
});

export default CalenderPageHeader;
