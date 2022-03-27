import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions } from 'react-native';
import BudgetDetailsTableComponent from './BudgetDetailsTableComponent';
import theme from '../../../theme';
import { formatNumber } from '../../utils/formatters';

const BudgetDetailsTable = ({ renderList, sortMethod, categoryBudget }) => {
  const [splitList, setSplitList] = useState([]);
  const [stickyList, setStickyList] = useState([]);

  useEffect(() => {
    const tempList = [];
    let currentIndex = 0;
    const stickyIndex = [];
    const categoryIndex = new Map();

    renderList.forEach((expense) => {
      const { category } = expense;

      if (!categoryIndex.has(category)) {
        categoryIndex.set(category, currentIndex);
        stickyIndex.push(currentIndex * 2);
        currentIndex++;

        let valueTotal = 0;

        categoryBudget.forEach((budget) => {
          const budgetCategory = budget.category;
          if (category === budgetCategory) {
            valueTotal = budget.value;
          }
        });

        tempList.push({ category, valueTotal, spentTotal: 0, splitCategories: [] });
      }

      tempList[categoryIndex.get(category)].splitCategories.push(expense);
      tempList[categoryIndex.get(category)].spentTotal += expense.price;
    });

    switch (sortMethod) {
      case 'vhigh->vlow':
        setSplitList(
          tempList.sort((a, b) => {
            return b.valueTotal - a.valueTotal;
          }),
        );
        break;

      case 'vlow->vhigh': {
        setSplitList(
          tempList.sort((a, b) => {
            return a.valueTotal - b.valueTotal;
          }),
        );
        break;
      }

      case 'shigh->slow': {
        setSplitList(
          tempList.sort((a, b) => {
            return b.spentTotal - a.spentTotal;
          }),
        );
        break;
      }

      case 'slow->shigh': {
        setSplitList(
          tempList.sort((a, b) => {
            return a.spentTotal - b.spentTotal;
          }),
        );
        break;
      }
    }

    setSplitList(tempList);
    setStickyList(stickyIndex);
  }, [renderList, categoryBudget, sortMethod]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ borderRadius: 10, overflow: 'hidden' }}>
        <ScrollView style={styles.scrollView} stickyHeaderIndices={stickyList}>
          {splitList.map((budget) => [
            <View>
              <View style={styles.header}>
                <Text style={styles.text}>{budget.category}</Text>
                <Text style={styles.text}>
                  ${formatNumber(budget.spentTotal)} / ${formatNumber(budget.valueTotal)}
                </Text>
              </View>
            </View>,
            <View>
              <BudgetDetailsTableComponent expenses={budget.splitCategories} />
            </View>,
          ])}
          <View style={{ height: 220 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default BudgetDetailsTable;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 100,
    backgroundColor: theme.colors.primary,
  },
  scrollView: {},
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.gradient[0],
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.white,
    marginVertical: 7,
    marginHorizontal: 10,
  },
});
