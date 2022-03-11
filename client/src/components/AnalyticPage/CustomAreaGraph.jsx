import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import * as shape from 'd3-shape';
import {
  SlideAreaChart,
  CursorProps,
  ToolTipProps,
  ToolTipTextRenderersInput,
  GradientProps,
} from '@connectedcars/react-native-slide-charts';

import { Stop, LinearGradient } from 'react-native-svg';

let priceToDisplay = '';
let earliestExpense = new Date();

const CustomAreaGraph = ({ dateStringData, dateData }) => {
  const [dateRange, setDateRange] = useState(null);
  const [dateHeader, setDateHeader] = useState('All Time');
  const [priceHeader, setPriceHeader] = useState(0);
  const [selectedRange, setSelectedRange] = useState('All');

  const calculateEarliest = (data) => {
    if (data.length > 0) {
      earliestExpense = new Date(data[0].x);
    }
  };

  const calculateTotal = (data) => {
    let total = 0;
    data.forEach((row) => {
      total += Number(row.y);
    });
    total = total.toFixed(2);
    setPriceHeader(total);
  };

  const handleRangeChange = (newBounds) => {
    const today = new Date();
    let lowerBound = new Date();
    setSelectedRange(newBounds);
    if (newBounds === '1W') {
      lowerBound = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    } else if (newBounds === '1M') {
      lowerBound = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    } else if (newBounds === '3M') {
      lowerBound = new Date(today.getFullYear(), today.getMonth() - 3, today.getDate());
    } else if (newBounds === '1Y') {
      lowerBound = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
    } else if (newBounds === '2Y') {
      lowerBound = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
    } else if (newBounds === 'All') {
      setDateHeader('All Time');
      setDateRange(null);
      calculateTotal(dateData);
      return;
    }

    // Calculate the current bounds
    // To improve performance, only take the bound lower if there is an expense that exists beyond that value.
    // Otherwise, set the lower bound as the first expense.
    lowerBound = new Date(Math.max(lowerBound, earliestExpense));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const todayString = today.toLocaleDateString('en-US', options);
    const lowerBoundString = lowerBound.toLocaleDateString('en-US', options);

    if (lowerBoundString !== todayString) {
      setDateHeader(`${lowerBoundString}-${todayString}`);
    } else {
      setDateHeader(todayString);
    }
    setDateRange([lowerBound, today]);

    const filteredData = dateData.filter((row) => row.x >= lowerBound);

    calculateTotal(filteredData);
  };

  const displayPrice = (scaleX, x, scaleY, y) => {
    const date = scaleX.invert(x).toISOString().split('T')[0];
    const data = dateStringData.find((obj) => obj.x === date);
    if (data !== undefined) {
      priceToDisplay = `$${data.y.toString()}`;
    } else {
      priceToDisplay = 'N/A';
    }
    return priceToDisplay;
  };

  const customAreaChartFillGradient = (props) => {
    return (
      <LinearGradient x1="0%" y1="0%" x2="0%" y2="100%" {...props}>
        <Stop stopColor="white" offset="20%" stopOpacity="0.9" />
        <Stop stopColor="#24838F" offset="100%" stopOpacity="0.2" />
      </LinearGradient>
    );
  };

  useEffect(() => {
    calculateEarliest(dateData);
    calculateTotal(dateData);
  }, [dateData]);

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.priceHeader}> - ${priceHeader}</Text>
        <Text style={styles.dateHeader}>{dateHeader}</Text>
        <SlideAreaChart
          scrollable
          style={{ backgroundColor: '#24838F' }}
          shouldCancelWhenOutside={false}
          yo
          data={dateData}
          height={325}
          axisWidth={0}
          axisHeight={0}
          animated={false}
          paddingBottom={8}
          chartLineColor="#195D66"
          chartLineWidth={2}
          cursorProps={{
            cursorBorderColor: '#808080',
            cursorColor: '#808080',
            cursorLine: false,
            cursorMarkerHeight: 12,
            cursorMarkerWidth: 12,
          }}
          chartPaddingTop={80}
          xScale="time"
          xRange={dateRange}
          yAxisProps={{
            horizontalLineWidth: 0,
            verticalLineWidth: 0,
            axisLabel: 'Y Units',
            axisLabelAlignment: 'middle',
            rotateAxisLabel: true,
            numberOfTicks: 2,
            hideMarkers: true,
          }}
          xAxisProps={{
            axisLabel: 'X Units',
          }}
          renderFillGradient={(e) => customAreaChartFillGradient(e)}
          curveType={shape.curveBumpX}
          toolTipProps={{
            toolTipTextRenderers: [
              ({ scaleX, x, scaleY, y }) => ({
                text: displayPrice(scaleX, x, scaleY, y),
              }),
              ({ scaleX, x }) => ({
                text: scaleX.invert(x).toISOString().split('T')[0],
              }),
            ],
          }}
        />
        <DataTable style={{ backgroundColor: '#24838F', paddingBottom: 10 }}>
          <DataTable.Row>
            <DataTable.Cell numeric>
              <Button
                style={{
                  backgroundColor: selectedRange === '1W' ? '#00ABF0' : '#24838F',
                  borderRadius: 20,
                }}
                color="white"
                onPress={() => {
                  handleRangeChange('1W');
                }}>
                1W
              </Button>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Button
                style={{
                  backgroundColor: selectedRange === '1M' ? '#00ABF0' : '#24838F',
                  borderRadius: 20,
                }}
                color="white"
                onPress={() => {
                  handleRangeChange('1M');
                }}>
                1M
              </Button>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Button
                style={{
                  backgroundColor: selectedRange === '3M' ? '#00ABF0' : '#24838F',
                  borderRadius: 20,
                }}
                color="white"
                onPress={() => {
                  handleRangeChange('3M');
                }}>
                3M
              </Button>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Button
                style={{
                  backgroundColor: selectedRange === '1Y' ? '#00ABF0' : '#24838F',
                  borderRadius: 20,
                }}
                color="white"
                onPress={() => {
                  handleRangeChange('1Y');
                }}>
                1Y
              </Button>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Button
                style={{
                  backgroundColor: selectedRange === '2Y' ? '#00ABF0' : '#24838F',
                  borderRadius: 20,
                }}
                color="white"
                onPress={() => {
                  handleRangeChange('2Y');
                }}>
                2Y
              </Button>
            </DataTable.Cell>
            <DataTable.Cell numeric>
              <Button
                style={{
                  backgroundColor: selectedRange === 'All' ? '#00ABF0' : '#24838F',
                  borderRadius: 20,
                }}
                color="white"
                onPress={() => {
                  handleRangeChange('All');
                }}>
                All
              </Button>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </View>
  );
};

export default CustomAreaGraph;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
    flexGrow: 1,
  },
  priceHeader: {
    backgroundColor: '#24838F',
    fontSize: 36,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    paddingTop: 60,
  },
  dateHeader: {
    backgroundColor: '#24838F',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});
