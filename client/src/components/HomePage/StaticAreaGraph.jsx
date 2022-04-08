import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { VictoryChart, VictoryArea, VictoryAxis } from 'victory-native';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import axios from '../../providers/axios';
import theme from '../../../theme';

const URL = process.env.SERVER_URL;

const StaticAreaGraph = ({ setButton }) => {
  const today = new Date();
  const todayString = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    .toISOString()
    .split('T')[0];
  const lowerBound = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
  const lowerBoundString = lowerBound.toISOString().split('T')[0];
  const [databaseExpense, setDatabaseExpense] = useState([]);
  const [compressedData, setCompressedData] = useState([]);

  const handleProcessingData = (data) => {
    if (data === undefined || data === null || data.length < 1) {
      setCompressedData([]);
      return;
    }

    const selectedData = data.map((obj) => {
      return {
        x: obj.date,
        y: obj.price,
      };
    });

    // Make sure there is only one entry for each date.
    // If there are more than one entry with the same date, compress them into one entry
    let temp = [];
    selectedData.forEach((row) => {
      if (temp.length <= 0) {
        temp.push(row);
      } else {
        const previous = temp.pop();
        if (previous.x === row.x) {
          previous.y += row.y;
          temp.push(previous);
        } else {
          temp.push(previous);
          temp.push(row);
        }
      }
    });

    temp = temp.map((obj) => {
      return {
        x: new Date(obj.x).getTime(),
        y: obj.y.toFixed(2),
      };
    });

    setCompressedData(temp);
  };

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/expense/ranged/${lowerBoundString}/${todayString}`)
        .then(({ data }) => setDatabaseExpense(data.reverse()))
        .catch((err) => console.log(err));
    }, [lowerBoundString, todayString]),
  );

  useEffect(() => {
    handleProcessingData(databaseExpense);
  }, [databaseExpense]);

  useEffect(() => {
    if (compressedData.length >= 2) {
      setButton(true);
    } else {
      setButton(false);
    }
  });

  return (
    <View style={styles.container}>
      <View>
        {compressedData.length >= 2 ? (
          <VictoryChart
            width={Dimensions.get('window').width / 0.93}
            height={Dimensions.get('window').height / 3}
            style={{
              parent: {
                width: '100%',
                height: 'auto',
                marginTop: -30,
                marginLeft: -40,
                marginBottom: -70,
                paddingRight: 30,
                overflow: 'visible',
              },
              data: {
                overflow: 'visible',
              },
            }}>
            <Defs>
              <LinearGradient id="gradientFill" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop stopColor="white" offset="20%" stopOpacity="0.9" />
                <Stop stopColor={theme.colors.primary} offset="100%" stopOpacity="1" />
              </LinearGradient>
            </Defs>
            <VictoryArea
              style={{
                data: {
                  fill: 'url(#gradientFill)',
                  stroke: theme.colors.primaryDark,
                  strokeWidth: 3,
                },
              }}
              interpolation="catmullRom"
              data={compressedData}
            />
            <VictoryAxis
              labels={(d) => d.y}
              style={{
                axis: { stroke: 'transparent' },
                ticks: { stroke: 'transparent' },
                tickLabels: { fill: 'transparent' },
              }}
            />
          </VictoryChart>
        ) : (
          <Text
            style={{
              fontSize: 25,
              fontWeight: '600',
              textAlign: 'center',
              color: theme.colors.primary,
              marginHorizontal: 20,
            }}>
            You haven&apos;t had many expenses this week!
          </Text>
        )}
      </View>
    </View>
  );
};

export default StaticAreaGraph;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
    paddingHorizontal: 5,
    // flexGrow: 1,
  },
});
