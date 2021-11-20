import React from 'react';
import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';

const CategoryPieChart = () => {
  return (
    <SafeAreaView style={styles.centeredView}>
      <VictoryPie
        innerRadius={100}
        data={sampleData}
        colorScale={sampleColor}
        labels={() => null}
        style={{
          parent: { marginBottom: -50 },
        }}
        labelComponent={
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={205} // these are absolute, need to change to relative
            y={220}
            style={[styles.labelMaj, styles.labelMin]}
            text={[calculateTotal.total, 'Spent this month']}
          />
        }
      />
      <View style={styles.categoryView}>
        {sampleData.map((item) => {
          return (
            <View style={[styles.card, { backgroundColor: item.color }]} key={item.x}>
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

const calculateTotal = {
  total: (() => {
    let total = 0;
    sampleData
      .filter((item) => item.x !== 'Amount Left')
      .map((item) => {
        total += item.y;
        return item;
      });
    return `$${String(total)}`;
  })(),
};

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
  },
  labelMaj: {
    fontSize: 35,
    color: 'black',
    fontWeight: '600',
  },
  labelMin: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
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
