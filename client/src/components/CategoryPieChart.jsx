import React from 'react';
import { StyleSheet, FlatList, Text, SafeAreaView, ScrollView } from 'react-native';
import { VictoryPie } from 'victory-native';

const CategoryPieChart = () => {
  return (
    <SafeAreaView>
      <FlatList
        data={sampleData}
        renderItem={({ item }) => <Text style={styles.item_style}>{item.x}</Text>}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={getHeader}
      />
    </SafeAreaView>
  );
};

const getHeader = () => {
  return (
    <VictoryPie
      innerRadius={100}
      data={sampleData}
      colorScale={sampleColor}
      style={{ labels: { fill: '#FFFFFF00' } }}
    />
  );
};

const sampleData = [
  { x: 'Category 1', y: 20 },
  { x: 'Category 2', y: 20 },
  { x: 'Category 3', y: 20 },
  { x: 'Category 4', y: 20 },
  { x: 'Category 5', y: 10 },
  { x: 'Amount Left', y: 10 },
];

const sampleColor = ['#FF5E5E', '#D9BBF1', '#92F889', '#FFC36A', '#6DA8FF', 'grey'];

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  item_style: {
    backgroundColor: '#B591FF',
    padding: 20,
    marginVertical: 3,
    marginHorizontal: 16,
    borderRadius: 5,
  },
});

export default CategoryPieChart;
