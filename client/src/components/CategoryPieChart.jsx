import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { VictoryPie } from 'victory-native';

const CategoryPieChart = () => {
  return (
    <SafeAreaView style={styles.centeredView}>
      <VictoryPie
        innerRadius={100}
        data={sampleData}
        colorScale={sampleColor}
        labels={() => null}
        style={{ parent: { marginBottom: -50 } }}
      />
      <View style={styles.categoryView}>
        {sampleData.map((item) => {
          const bgColor = item.color;
          return (
            <View style={[styles.card, { backgroundColor: bgColor }]} key={item.x}>
              <Text style={styles.cardText}>{item.x}</Text>
              <Text style={styles.cardText}>${item.y}</Text>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const sampleData = [
  { x: 'Category 1', y: 1000, color: '#FF5E5E' },
  { x: 'Category 2', y: 2000, color: '#D9BBF1' },
  { x: 'Category 3', y: 2000, color: '#92F889' },
  { x: 'Category 4', y: 2500, color: '#FFC36A' },
  { x: 'Category 5', y: 1500, color: '#6DA8FF' },
  { x: 'Amount Left', y: 1000, color: 'grey' },
];

const sampleColor = ['#FF5E5E', '#D9BBF1', '#92F889', '#FFC36A', '#6DA8FF', 'grey'];

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
  },
  categoryView: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#24838F',
    paddingVertical: 10,
    margin: 40,
  },
  card: {
    padding: 10,
    marginVertical: 3,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default CategoryPieChart;
