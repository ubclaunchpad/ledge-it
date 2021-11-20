import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';

const CategoryPieChart = () => {
  const windowWidth = Dimensions.get('window').width;
  const pieRadius = windowWidth / 4;
  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>{getMonth()} so far</Text>
      <VictoryPie
        radius={pieRadius}
        innerRadius={pieRadius - pieRadius / 3}
        data={sampleData}
        colorScale={sampleColor}
        labels={() => null}
        style={{
          parent: { marginVertical: -pieRadius, alignSelf: 'center' },
        }}
        labelComponent={
          <VictoryLabel
            textAnchor="middle"
            verticalAnchor="middle"
            x={windowWidth / 2}
            y={windowWidth / 2 + pieRadius / 7}
            style={[styles.labelMaj, styles.labelMin]}
            text={[calculateExpense.total, 'Spent in '.concat(getMonth())]}
          />
        }
      />
      <View style={styles.pbar} key="pbar">
        <View
          style={
            ([StyleSheet.absoluteFill],
            { backgroundColor: '#17C408', borderRadius: 5, width: '50%' })
          }>
          <Text style={styles.pbarTextExpense}>{calculateExpense.total}</Text>
        </View>
        <Text style={[styles.pbarTextBudget]}>{calculateBudget.total}</Text>
      </View>
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

const getMonth = () => {
  const monthNames = [
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

  const d = new Date();
  return monthNames[d.getMonth() - 1];
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

const calculateExpense = {
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

const calculateBudget = {
  total: (() => {
    let total = 0;
    sampleData.map((item) => {
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
  title: {
    alignSelf: 'center',
    fontSize: 40,
    color: '#24838F',
    fontWeight: 'bold',
    padding: 20,
  },
  labelMaj: {
    fontSize: 32,
    color: '#24838F',
    fontWeight: '600',
  },
  labelMin: {
    fontSize: 12,
    color: '#24838F',
    fontWeight: '600',
  },
  pbar: {
    height: 30,
    width: '75%',
    marginTop: 20,
    marginHorizontal: 40,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#17C408',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  pbarTextExpense: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  pbarTextBudget: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    left: 215,
  },
  categoryView: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: '#24838F',
    paddingVertical: 10,
    marginHorizontal: 40,
    marginVertical: 20,
  },
  card: {
    paddingVertical: 5,
    paddingHorizontal: 10,
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
