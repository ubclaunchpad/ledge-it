import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import theme from '../../../theme';
import { formatNumber } from '../../utils/formatters';

const BudgetProgressBar = ({ calculateBudget, ratio }) => {
  return (
    <View style={styles.pbar} key="pbar">
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: theme.colors.green, borderRadius: 20, width: ratio },
        ]}
      >
        <Text style={styles.pbarTextExpense}>{ratio}</Text>
      </View>
      <Text style={[styles.pbarTextBudget]}>${formatNumber(calculateBudget || 0, 0)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pbar: {
    height: 30,
    width: '75%',
    borderRadius: 20,
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.white,
    overflow: 'hidden',
  },

  pbarTextExpense: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    top: 4,
    left: 10,
    width: 200,
  },

  pbarTextBudget: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    right: 10,
    top: 4,
  },
});

export default BudgetProgressBar;
