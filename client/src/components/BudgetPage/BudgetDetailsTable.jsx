import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Text, View, Dimensions } from 'react-native';
import axios from '../../providers/axios';
import { useFocusEffect } from '@react-navigation/native';
import BudgetDetailsTableComponent from './BudgetDetailsTableComponent';
import theme from '../../../theme';

const URL = process.env.SERVER_URL;

const BudgetDetailsTable = ({ renderList, sortMethod }) => {
  const [splitList, setSplitList] = useState([]);
  const [stickyList, setStickyList] = useState([]);
  const [categoryBudget, setCategoryBudget] = useState([]);  

  const getCategoryBudgets = () => {
    const d = new Date();
    axios
      .get(`${URL}/budget/category/all`, {
        params: {
          month: d.getMonth() + 1,
          year: d.getFullYear(),
        },
      })
      .then((res) => {
        setCategoryBudget(res.data);
      })
      .catch((e) => console.log(e));
  }

  useFocusEffect(
    useCallback(() => {
      getCategoryBudgets();
    }, []),
  );

  useEffect(() => {
    const tempList = [];
    let currentIndex = 0;
    const stickyIndex = [];
    const categoryIndex = new Map();

    getCategoryBudgets();

    renderList.forEach((expense) => {
      const { category } = expense;

      if (!categoryIndex.has(category)) {
        categoryIndex.set(category, currentIndex);
        stickyIndex.push(currentIndex * 2);
        currentIndex++;

        let valueTotal = 0;

        categoryBudget.forEach((budget) => {
          const budgetCategory = budget.category;
          if (category == budgetCategory) {
            valueTotal = budget.value;
          }
        })

        tempList.push({ category, valueTotal: valueTotal, spentTotal: 0, splitCategories: [] });
      }
    
      tempList[categoryIndex.get(category)].splitCategories.push(expense);
      tempList[categoryIndex.get(category)].spentTotal += expense.price;
    });

    setSplitList(tempList);
    setStickyList(stickyIndex);
    

    switch(sortMethod) {
      
      case "vhigh->vlow":
        splitList.sort((a,b) => {
          b.value - a.value
        });
        break;
      
      case "vlow->vhigh": {
        splitList.sort((a,b) => {
          a.value - b.value
        });
        break;
      }

      case "shigh->slow": {
        splitList.sort((a,b) => {
          b.spent - a.spent
        });
        break;
      }

      case "slow->shigh": {
        splitList.sort((a,b) => {
          a.spent - b.spent
        });
        break;
      }  
    }
  }, [renderList]);


  return (
    <SafeAreaView style={styles.container}>
      <View style={{borderRadius: 10, overflow: 'hidden'}}>
        <ScrollView style={styles.scrollView} stickyHeaderIndices={stickyList}>
          {splitList.map((budget) => [
            <View style={styles.header}>  
              <Text style={styles.text}>
                {budget.category}     ${budget.spentTotal} / ${budget.valueTotal}
              </Text>
            </View>,
            <View style>
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
  scrollView: {
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.gradient[0], //add js to css??
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 8,
    color: theme.colors.white,
  },
});
