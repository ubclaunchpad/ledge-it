import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { Svg, Circle } from 'react-native-svg';
import { MONTHS } from '../../utils/constants';
import theme from '../../../theme';
import { formatNumber } from '../../utils/formatters';

const CategoryPieChart = ({
  currentMonth,
  categoryBudgetData,
  calculateBudget,
  calculateExpense,
  ratio,
}) => {
  const windowWidth = Dimensions.get('window').width;
  const pieRadius = windowWidth / 4;

  const categoryData = categoryBudgetData.map((category, index) => ({
    ...category,
    color: theme.gradient[index],
  }));

  categoryData.push({
    _id: String(Math.random()),
    value: 0,
    spent: Math.round(calculateBudget - calculateExpense),
    category: 'Amount Left',
    color: theme.colors.white,
  });

  return (
    <SafeAreaView>
      {calculateExpense ? (
        <View>
          <Svg height={windowWidth / 2 + pieRadius / 2}>
            <Circle
              cx={190}
              cy={120}
              r={pieRadius - pieRadius / 3 + 10}
              fill={theme.colors.textLight}
            />
            <VictoryPie
              standalone={false}
              height={windowWidth / 2 + pieRadius / 2}
              radius={pieRadius}
              innerRadius={pieRadius - pieRadius / 3}
              data={categoryData}
              x="category"
              y={(data) => data.spent}
              colorScale={theme.gradient
                .slice(0, categoryData.length - 1)
                .concat([theme.colors.white])}
              labels={() => null}
              style={{
                parent: {
                  marginVertical: -pieRadius,
                  alignSelf: 'center',
                },
                data: {
                  stroke: theme.colors.grey,
                  strokeWidth: 0,
                },
              }}
              labelComponent={
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={windowWidth / 2}
                  y={windowWidth / 4 + pieRadius / 3}
                  style={[styles.labelMaj, styles.labelMin]}
                  text={[
                    `$${formatNumber(calculateExpense, 0)}`,
                    `${ratio} of ${MONTHS[currentMonth - 1]} Spending`,
                  ]}
                />
              }
            />
          </Svg>
        </View>
      ) : (
        <View style={styles.errorTextView}>
          <Text style={styles.errorText}>No spending this month</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
    paddingBottom: 50,
  },
  title: {
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 20,
    color: theme.colors.primary,
  },
  labelMaj: {
    fontSize: 30,
    fontFamily: '',
    color: theme.colors.primary,
    fontWeight: '600',
  },
  labelMin: {
    fontSize: 12,
    fontFamily: '',
    color: theme.colors.primary,
    fontWeight: '400',
  },
  categoryView: {
    marginTop: 15,
  },
  card: {
    borderBottomColor: theme.colors.grey,
    paddingVertical: 5,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorTextView: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: theme.colors.textDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryPieChart;
