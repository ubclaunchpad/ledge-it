import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomAreaGraph from '../components/AnalyticPage/CustomAreaGraph';

const unprocessedData = [
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-02-01',
    price: 140.0,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-02-03',
    price: 67.8,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-02-03',
    price: 167.8,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-02-06',
    price: 300.0,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-02-06',
    price: 310.1,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-02-10',
    price: 200.0,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-02-10',
    price: 200.0,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-03-02',
    price: 435.46,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
  {
    _id: '6222fb24ad4f0b119bedcaf2',
    created_at: '2022-03-05T05:48:13.190430',
    updated_at: '2022-03-05T05:48:13.190498',
    email: 'ledge@gmail.com',
    name: 'Test Expense 3',
    description: 'Testing 3',
    date: '2022-03-07',
    price: 143.46,
    currency: 'CAD',
    exchange_rate: 1.0,
    location: null,
    location_x: null,
    location_y: null,
    category: 'Food',
    sub_category: null,
  },
];

const AnalyticsPage = () => {
  const [compressedData, setCompressedData] = useState([]);
  const [processedData, setProcessedData] = useState([]);

  const handleProcessingData = (data) => {
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
    temp = temp.map((row) => {
      return {
        ...row,
        y: row.y.toFixed(2),
      };
    });
    setCompressedData(temp);

    // The graph needs data to be passed in as a date, so we convert from datestring into a date object here
    temp = temp.map((obj) => {
      return {
        x: new Date(obj.x),
        y: obj.y,
      };
    });

    setProcessedData(temp);
  };

  useEffect(() => {
    // Make a call to the API here! Then pass it on to the functions below:
    handleProcessingData(unprocessedData);
  }, []);

  return (
    <View style={styles.container}>
      <CustomAreaGraph dateStringData={compressedData} dateData={processedData} />
    </View>
  );
};

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

export default AnalyticsPage;
