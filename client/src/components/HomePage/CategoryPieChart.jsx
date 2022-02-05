import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { StyleSheet, Text, SafeAreaView, View, Dimensions } from 'react-native';
import { VictoryPie, VictoryLabel } from 'victory-native';
import { useFocusEffect } from '@react-navigation/native';
import { MONTHS } from '../../utils/constants';
import { theme } from '../../../theme';
import { formatNumber } from '../../utils/formatters';

const URL = process.env.SERVER_URL;

const getMonth = () => {
  const d = new Date();
  return MONTHS[d.getMonth()];
};

const CategoryPieChart = () => {
  const [categoryBudgetData, setCategoryBudgetData] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const pieRadius = windowWidth / 4;

  useFocusEffect(
    useCallback(() => {
      getCategoryBudgets();
    }, []),
  );

  const getCategoryBudgets = () => {
    const d = new Date();
    axios
      .get(`${URL}/budget/category/all`, {
        params: {
          month: d.getMonth() + 1,
          year: d.getFullYear(),
        },
      })
      .then((res) => {
        setCategoryBudgetData(res.data);
      })
      .catch((e) => console.log(e));
  };

  const calculateExpense = {
    total: categoryBudgetData.reduce((acc, item) => {
      return acc + item.spent;
    }, 0),
  };
  const calculateBudget = {
    total: categoryBudgetData.reduce((acc, item) => {
      return acc + item.value;
    }, 0),
  };
  const ratio = `${Math.round((calculateExpense.total / calculateBudget.total) * 100) || 0}%`;

  const categoryData = categoryBudgetData.map((category, index) => ({
    ...category,
    color: theme.gradient[index],
  }));

  categoryData.push({
    _id: String(Math.random()),
    value: 0,
    spent: Math.round(calculateBudget.total - calculateExpense.total),
    category: 'Amount Left',
    color: theme.colors.white,
  });

  return (
    <SafeAreaView style={styles.centeredView}>
      <Text style={styles.title}>{getMonth()}&apos;s Spending</Text>
      {calculateExpense?.total ? (
        <VictoryPie
          radius={pieRadius}
          innerRadius={pieRadius - pieRadius / 3}
          data={categoryData}
          x="category"
          y={(data) => data.spent}
          colorScale={theme.gradient.slice(0, categoryData.length - 1).concat([theme.colors.white])}
          labels={() => null}
          style={{
            parent: {
              marginVertical: -pieRadius,
              alignSelf: 'center',
            },
            data: {
              stroke: theme.colors.grey,
              strokeWidth: 1,
            },
          }}
          labelComponent={
            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              x={windowWidth / 2}
              y={windowWidth / 2 + pieRadius / 7}
              style={[styles.labelMaj, styles.labelMin]}
              text={[`$${formatNumber(calculateExpense.total, 0)}`, `Spent in ${getMonth()}`]}
            />
          }
        />
      ) : (
        <View style={styles.errorTextView}>
          <Text style={styles.errorText}>No spending this month</Text>
        </View>
      )}
      <View style={styles.pbar} key="pbar">
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: theme.colors.green, borderRadius: 20, width: ratio },
          ]}>
          <Text style={styles.pbarTextExpense}>{ratio}</Text>
        </View>
        <Text style={[styles.pbarTextBudget]}>${formatNumber(calculateBudget.total || 0, 0)}</Text>
      </View>
      <View style={styles.categoryView}>
        {calculateExpense?.total ? (
          categoryData.map((item, index) => {
            return (
              <View
                style={[
                  styles.card,
                  {
                    backgroundColor: item.color,
                    borderBottomLeftRadius: index === categoryData.length - 1 ? 10 : 0,
                    borderBottomRightRadius: index === categoryData.length - 1 ? 10 : 0,
                    borderBottomWidth: index === categoryData.length - 1 ? 0 : 1,
                  },
                ]}
                key={item._id}>
                <Text style={styles.cardText}>{item.category}</Text>
                <Text style={styles.cardText}>${formatNumber(item.spent)}</Text>
              </View>
            );
          })
        ) : (
          <></>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    display: 'flex',
    justifyContent: 'center',
    margin: 20,
    borderWidth: 4,
    borderRadius: 10,
    borderColor: theme.colors.primaryDark,
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
  pbar: {
    height: 30,
    width: '80%',
    marginTop: 20,
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: theme.colors.green,
    backgroundColor: theme.colors.white,
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
