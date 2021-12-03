import React, {useState, useEffect} from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Text, View } from 'react-native';
import BudgetDetailsTableComponent from './BudgetDetailsTableComponent';
import { theme } from '../../../theme';


const BudgetDetailsTableHelper = ({renderList}) => {
  const [splitList, setSplitList] = useState([]);
  const [stickyList, setStickyList] = useState([]);

  const categoryIndex = new Map();

  useEffect( () => {
    const tempList = [];
    var currentIndex = 0;
    var stickyIndex = [];
    renderList.forEach((expense) => {
      const category = expense.category;
      if (!categoryIndex.has(category)){
        categoryIndex.set(category, currentIndex);
        stickyIndex.push(currentIndex*2);
        currentIndex++;
        tempList.push({category, valueTotal: 0, spentTotal: 0, splitCategories: []});
      }
      tempList[categoryIndex.get(category)].splitCategories.push(expense);
    })
    setSplitList(tempList);
    setStickyList(stickyIndex);

}, [renderList]) ;

  const componentList = splitList.map((budget, index) => [  
    <View style={{height: 40, backgroundColor: theme.colors.primaryDark}}>
       <Text style = {styles.text}> Category: {budget.category}                  ${budget.valueTotal}/ ${budget.spentTotal}</Text>
    </View>,
    <View>
    <BudgetDetailsTableComponent mult = {budget.splitCategories}/>
    </View>
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} stickyHeaderIndices={stickyList}>
        {componentList}
      </ScrollView>
    </SafeAreaView>
  );
};

const BudgetDetailsTable = ({renderList, currentMonth, currentYear}) => (
  <BudgetDetailsTableHelper renderList={renderList}/>
);

export default BudgetDetailsTable;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: theme.colors.primaryLight,
      marginHorizontal: 20,
      borderRadius: 10,
    },
    text: {
      fontSize: 20,
      margin: 8,
      color: 'white'
    },
    header: {
      fontSize: 42,
      margin: 8,
      backgroundColor: '#24838f',
      marginHorizontal: 20,
      borderRadius: 10,
    },
    subheader: {
      color: 'white',
      fontSize: 20
    },
    month:{
      color: 'black',
      fontSize: 16
    },
    value:{
      color: 'green',
      fontSize: 16,
      textAlign: 'center'
    },
    spent:{
      color: 'red',
      fontSize: 16,
      textAlign: 'center'
    }
  });