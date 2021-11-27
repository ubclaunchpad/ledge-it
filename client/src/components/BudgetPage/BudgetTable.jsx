import React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar, Text, View } from 'react-native';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const BudgetTable = (props) => <BudgetTableHelper renderList={props.renderList} />;

export default BudgetTable;

BudgetTableHelper = (props) => {
  const componentList = props.renderList.map((budget, index) => (
    <List.Item
      key={index}
      // title= {months[budget.month - 1]}
      right={() => (
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 155, height: 20 }}>
            <Text style={styles.month}> {months[budget.month - 1]} </Text>
          </View>
          <View style={{ width: 100, height: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.value}> ${budget.value} </Text>
          </View>
          <View style={{ width: 100, height: 20, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.spent}> -${budget.spent} </Text>
          </View>
        </View>
      )}
      style={{
        borderBottomColor: '#24838f',
        borderBottomWidth: 1,
        marginBottom: 9,
      }}
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
    fontSize: 20,
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
