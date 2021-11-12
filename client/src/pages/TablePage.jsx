import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import TablePageHeader from '../components/TablePage/TablePageHeader';

const TablePage = () => {
  const [categories, setCategories] = useState([]);
  const [isExpense, setIsExpense] = useState(true);

  // Fetch user categories from db here
  useEffect(() => {
    if (isExpense) {
      setCategories(['food', 'housing', 'fun', 'other']);
    } else {
      setCategories(['main job', 'part-time', 'passive', 'other']);
    }
  }, [isExpense]);

  return (
    <View>
      <TablePageHeader categories={categories} isExpense={isExpense} setIsExpense={setIsExpense} />
      <Text>Table Page</Text>
      <Text>This is the table page</Text>
    </View>
  );
};

export default TablePage;
