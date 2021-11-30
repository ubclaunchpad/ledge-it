import React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, Text, View } from 'react-native';
import { MONTHS } from '../../utils/constants';
import { theme } from '../../../theme';

const BudgetTable = ({ renderList }) => {
  const componentList = renderList.map((budget, index) => (
    <List.Item
      key={index}
      right={() => (
        <View style={{ flexDirection: 'row', height: 20 }}>
          <View style={{ width: '40%' }}>
            <Text style={styles.month}>{MONTHS[budget.month]}</Text>
          </View>
          <View style={{ width: '30%' }}>
            <Text style={styles.value}>${budget.value}</Text>
          </View>
          <View style={{ width: '30%' }}>
            <Text style={styles.spent}>-${budget.spent}</Text>
          </View>
        </View>
      )}
      style={styles.listItem}
    />
  ));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <List.Section>{componentList}</List.Section>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BudgetTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
