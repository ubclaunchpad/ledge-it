import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { MONTHS } from '../utils/constants';

const CategoryPieChart = () => {
  const windowWidth = Dimensions.get('window').width;
  const pieRadius = windowWidth / 4;
  const ratio = `${Math.round((calculateExpense.total / calculateBudget.total) * 100)}%`;

  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>{getMonth()}&apos;s Spending</Text>
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
            text={[`$${calculateExpense.total}`, `Spent in ${getMonth()}`]}
          />
        }
      />
      <View style={styles.pbar} key="pbar">
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: '#17C408', borderRadius: 20, width: ratio },
          ]}>
          <Text style={styles.pbarTextExpense}>{ratio}</Text>
        </View>
        <Text style={[styles.pbarTextBudget]}>${calculateBudget.total}</Text>
      </View>
      <View style={styles.categoryView}>
        {sampleData.map((item, index) => {
          return (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: item.color,
                  borderBottomLeftRadius: index === sampleData.length - 1 ? 10 : 0,
                  borderBottomRightRadius: index === sampleData.length - 1 ? 10 : 0,
                },
              ]}
              key={item.x}>
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
  const d = new Date();
  return MONTHS[d.getMonth()];
};

const sampleData = [
  { x: 'Category 1', y: 1000, color: '#FF5E5E' },
  { x: 'Category 2', y: 1000, color: '#D9BBF1' },
  { x: 'Category 3', y: 1000, color: '#92F889' },
  { x: 'Category 4', y: 2500, color: '#FFC36A' },
  { x: 'Category 5', y: 2500, color: '#6DA8FF' },
  { x: 'Amount Left', y: 3000, color: '#fff' },
];

const sampleColor = ['#FF5E5E', '#D9BBF1', '#92F889', '#FFC36A', '#6DA8FF', '#fff'];

const calculateExpense = {
  total: sampleData
    .filter((item) => item.x !== 'Amount Left')
    .reduce((acc, item) => {
      return acc + item.y;
    }, 0),
};

const calculateBudget = {
  total: sampleData.reduce((acc, item) => {
    return acc + item.y;
  }, 0),
};

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
  labelMaj: {
    fontSize: 32,
    color: '#24838F',
    fontWeight: '600',
  },
  labelMin: {
    fontSize: 12,
    color: '#24838F',
    fontWeight: '400',
  },
  pbar: {
    height: 30,
    width: '80%',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: '#17C408',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  pbarTextExpense: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    top: 4,
    left: 10,
  },
  pbarTextBudget: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    right: 10,
    top: 4,
  },
  categoryView: {
    marginTop: 15,
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

export default CategoryPieChart;
