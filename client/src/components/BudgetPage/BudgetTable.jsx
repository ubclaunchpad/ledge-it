import React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Text, View } from 'react-native';
import { MONTHS } from '../../utils/constants';

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
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
  },
  listItem: {
    borderBottomColor: '#24838f',
    borderBottomWidth: 1,
    marginBottom: 9,
  },
  month: {
    color: 'black',
    fontSize: 16,
  },
  value: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
  },
  spent: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
