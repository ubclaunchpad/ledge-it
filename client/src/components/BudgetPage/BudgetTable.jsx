import React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, Text, View } from 'react-native';
import { MONTHS } from '../../utils/constants';
import { theme } from '../../../theme';
import BudgetTableComponent from './BudgetTableComponent';

const BudgetTable = ({ renderList, isVisible, setVisible, setMonth, setYear }) => {
  const componentList = renderList.map((budget, index) => (
    <BudgetTableComponent budget = {budget} index = {index} isVisible = {isVisible} setVisible = {setVisible} setMonth = {setMonth} setYear = {setYear}/>
  ));

  return (
    <>
      <List.Item
        style={styles.header}
        right={() => (
          <View style={{ flexDirection: 'row', alignItems: 'center', height: 40 }}>
            <View style={{ width: '40%' }}>
              <Text style={styles.subheader}> Month</Text>
            </View>
            <View style={{ width: '30%' , alignItems: 'center'}}>
              <List.Icon style={styles.value} color={theme.colors.green} icon="arrow-up-bold" />
            </View>
            <View style={{ width: '30%' , alignItems: 'center'}}>
              <List.Icon style={styles.spent} color={theme.colors.red} icon="arrow-down-bold" />
            </View>
          </View>
        )}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <List.Section>{componentList}</List.Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default BudgetTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 42,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  subheader: {
    color: theme.colors.textLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    backgroundColor: theme.colors.primaryBackground,
  },
  listItem: {
    borderBottomColor: theme.colors.primaryDark,
    borderBottomWidth: 1,
    marginBottom: 9,
  },
  month: {
    color: theme.colors.textDark,
    fontSize: 16,
  },
  value: {
    color: theme.colors.green,
    fontSize: 16,
    textAlign: 'center',
  },
  spent: {
    color: theme.colors.red,
    fontSize: 16,
    textAlign: 'center',
  },
});
