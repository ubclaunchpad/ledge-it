import React from 'react';
import { StyleSheet, View } from 'react-native';
import StyledButton from './StyledButton';
import theme from '../../theme';

export default ({ type, setType }) => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderWidth: 3,
        borderColor: theme.colors.primary,
        marginBottom: 10,
      }}>
      <StyledButton
        label="Expense"
        onTap={() => setType('Expense')}
        customStyles={expenseStyles}
        backgroundStyle={[
          expenseStyles.background,
          type !== 'Expense' && { backgroundColor: theme.colors.white },
        ]}
        textStyle={[expenseStyles.text, type !== 'Expense' && { color: theme.colors.primary }]}
        underlayColor={theme.colors.primary}
        activeOpacity={0.9}
      />
      <StyledButton
        label="Income"
        onTap={() => setType('Income')}
        customStyles={incomeStyles}
        backgroundStyle={[
          incomeStyles.background,
          type !== 'Income' && { backgroundColor: theme.colors.white },
        ]}
        textStyle={[incomeStyles.text, type !== 'Income' && { color: theme.colors.primary }]}
        underlayColor={theme.colors.primary}
        activeOpacity={0.9}
      />
    </View>
  );
};

const expenseStyles = StyleSheet.create({
  pressable: {
    width: '50%',
  },
  highlightStyle: {
    borderBottomLeftRadius: 17,
  },
  background: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 17,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});

const incomeStyles = StyleSheet.create({
  pressable: {
    width: '50%',
  },
  highlightStyle: {
    borderBottomRightRadius: 17,
  },
  background: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    alignItems: 'center',
    borderBottomRightRadius: 17,
    shadowOffset: { width: 0, height: 0 },
  },

  text: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
