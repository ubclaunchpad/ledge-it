import React, { useState, useCallback } from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import theme from '../../../../theme';
import MonthSelect from '../../AnalyticPage/MonthView/MonthSelect';

const CalenderPageHeader = ({
  month,
  goToMonth,
  year,
  viewingExpenses,
  setViewingExpenses,
  monthOverview,
}) => {
  return (
    <View style={styles.headerBackground}>
      <View>
        <MonthSelect month={month} goToMonth={goToMonth} />
        <IncomeExpenseToggle
          setViewingExpenses={setViewingExpenses}
          viewingExpenses={viewingExpenses}
          monthOverview={monthOverview}
        />
      </View>
      <View style={styles.screenOptions} />
    </View>
  );
};

const IncomeExpenseToggle = ({ setViewingExpenses, monthOverview, viewingExpenses }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Pressable
        style={() => [
          screenButton.background,
          { backgroundColor: viewingExpenses ? theme.colors.white : theme.colors.primary },
        ]}
        onPress={() => setViewingExpenses(true)}
      >
        <Text style={viewingExpenses ? screenButton.focusedText : screenButton.text}>Expenses</Text>
      </Pressable>
      <Text style={styles.overViewText}>${monthOverview}</Text>
      <Pressable
        style={() => [
          screenButton.background,
          { backgroundColor: viewingExpenses ? theme.colors.primary : theme.colors.white },
        ]}
        onPress={() => setViewingExpenses(false)}
      >
        <Text style={viewingExpenses ? screenButton.text : screenButton.focusedText}>Incomes</Text>
      </Pressable>
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
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  overViewText: {
    fontSize: 24,
    fontWeight: '300',
    color: theme.colors.white,
    marginTop: 5,
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
