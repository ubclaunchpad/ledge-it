import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

const RecentTransactions = () => {
  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>Recent transactions</Text>
      <View>
        {sampleData.map((item, index) => {
          return (
            <View style={styles.card} key={item.name}>
              <Text style={styles.cardText}>{item.name}</Text>
              <Text style={styles.cardText}>{item.category}</Text>
              <Text style={styles.cardText}>{item.amount.toFixed(2)}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const sampleData = [
  { name: 'Expense 1', category: 'Category 1', amount: 25.0 },
  { name: 'Expense 2', category: 'Category 1', amount: 20.1 },
  { name: 'Income 1', category: 'Category 2', amount: 250.0 },
  { name: 'Expense 3', category: 'Category 2', amount: 250.0 },
  { name: 'Expense 4', category: 'Category 3', amount: 10.75 },
  { name: 'Expense 5', category: 'Category 1', amount: 20.25 },
];

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#4993ec',
    backgroundColor: 'lightgrey',
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 20,
  },
  card: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RecentTransactions;
