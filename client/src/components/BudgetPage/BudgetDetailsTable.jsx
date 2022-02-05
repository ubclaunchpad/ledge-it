import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions } from 'react-native';
import BudgetDetailsTableComponent from './BudgetDetailsTableComponent';
import { theme } from '../../../theme';

const BudgetDetailsTable = ({ renderList }) => {
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
        tempList.push({ category, valueTotal: 0, spentTotal: 0, splitCategories: [] });
      }
      tempList[categoryIndex.get(category)].splitCategories.push(expense);
    });

    setSplitList(tempList);
    setStickyList(stickyIndex);
  }, [renderList]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} stickyHeaderIndices={stickyList}>
        {splitList.map((budget) => [
          <View style={styles.header}>
            <Text style={styles.text}>
              {/* Category: {budget.category} ${budget.valueTotal}/ ${budget.spentTotal} */}
              {budget.category}
            </Text>
          </View>,
          <View>
            <BudgetDetailsTableComponent expenses={budget.splitCategories} />
          </View>,
        ])}
        <View style={{ height: 200 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BudgetDetailsTable;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 100,
  },
  scrollView: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  header: {
    backgroundColor: theme.colors.primaryDark,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
    color: theme.colors.white,
  },
});
