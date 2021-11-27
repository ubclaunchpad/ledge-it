import React from 'react';
import { Text, View } from 'react-native';
import { List, Colors } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import ActionButton from '../components/ActionButton';
import BudgetTable from '../components/BudgetPage/BudgetTable';

const budgetDatabase = [
  {
    month: 12,
    year: 2021,
    value: 500.01,
    spent: 300.01,
  },
  {
    month: 11,
    year: 2021,
    value: 200.27,
    spent: 100.99,
  },
  {
    month: 9,
    year: 2021,
    value: 82.74,
    spent: 13.78,
  },
  {
    month: 8,
    year: 2021,
    value: 98.23,
    spent: 387.92,
  },
  {
    month: 7,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 6,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 5,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 4,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 3,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 2,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  }
];

const BudgetPage = () => {
  return (
    <>
    <List.Item title = {<Text style={styles.subheader}>   Month</Text>}
              style = {styles.header}
              right = {props => <>
                                <List.Icon {...props} color = {Colors.green600} icon="arrow-up-bold" />
                                <Text>              </Text>
                                <List.Icon {...props} color = {Colors.red600} icon="arrow-down-bold" />
                                <Text>       </Text>
                                </>}> </List.Item>
    <BudgetTable renderList = {budgetDatabase}></BudgetTable>
    {/* <ActionButton /> */}
    </>
  );
};

export default BudgetPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 10,
  },
  text: {
    fontSize: 42,
    margin: 8,
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
  value:{
    color: 'green',
    fontSize: 16
  },
  spent:{
    color: 'red',
    fontSize: 16
  }
});

