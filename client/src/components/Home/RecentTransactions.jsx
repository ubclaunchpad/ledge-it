import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';

const RecentTransactions = () => {
  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>Recent transactions</Text>
      <View style={styles.categoryView}>
        <View style={styles.card}>
          <Text style={styles.labelText}>Name</Text>
          <Text style={styles.labelText}>Category</Text>
          <Text style={styles.labelText}>Amount</Text>
        </View>
        {sampleData.map((item, index) => {
          return (
            <View style={styles.card} key={item.id}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardText}>{item.name}</Text>
              </View>
              <View style={styles.cardMid}>
                <Text style={styles.cardText}>{item.category}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardText}>${item.amount.toFixed(2)}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const sampleData = [
  { id: 1, name: 'Name', category: 'Category 1', amount: 25.0 },
  { id: 2, name: 'Name', category: 'Category 1', amount: 20.1 },
  { id: 3, name: 'Name', category: 'Category 2', amount: 250.0 },
  { id: 4, name: 'Name', category: 'Category 2', amount: 20.0 },
  { id: 5, name: 'Name', category: 'Category 3', amount: 10.75 },
  { id: 6, name: 'Name', category: 'Category 1', amount: 20.25 },
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
    paddingBottom: 10,
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 10,
    color: '#24838F',
  },
  card: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#24838F75',
  },
  cardLeft: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  cardMid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRight: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  labelText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#909090',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#24838F',
  },
});

export default RecentTransactions;
