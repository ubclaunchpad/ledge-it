import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import axios from '../providers/axios';
import CustomAreaGraph from '../components/AnalyticPage/CustomAreaGraph';
import GraphFooter from '../components/AnalyticPage/GraphFooter';
import theme from '../../theme';
import Header from '../components/AnalyticPage/Header';
import CalendarSubPage from '../components/AnalyticPage/CalendarSubPage';

const URL = process.env.SERVER_URL;

const AnalyticsPage = () => {
  const [compressedData, setCompressedData] = useState([]);
  const [processedData, setProcessedData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [allSelected, setAllSelected] = useState(true);
  const [viewing, setViewing] = useState('Expenses');
  const [databaseExpense, setDatabaseExpense] = useState([]);
  const [databaseIncome, setDatabaseIncome] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);

  const [panel, setPanel] = useState('Line');

  const handleFilteringData = (data, categories) => {
    return data.filter((row) => {
      return categories.includes(row.category);
    });
  };

  const handleProcessingData = (data) => {
    if (data === undefined || data === null || data.length < 1) {
      setCompressedData([]);
      setProcessedData([]);
      return;
    }

    let selectedData = [];

    if (data[0].price !== undefined) {
      // If its an expense
      selectedData = data.map((obj) => {
        return {
          x: obj.date,
          y: obj.price,
        };
      });
    } else {
      // If its an income
      selectedData = data.map((obj) => {
        return {
          x: obj.date,
          y: obj.amount,
        };
      });
    }

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

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/expenses`)
        .then(({ data }) => setDatabaseExpense(data.reverse()))
        .catch((err) => console.log(err));
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/incomes`)
        .then(({ data }) => setDatabaseIncome(data.reverse()))
        .catch((err) => console.log(err));
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/expense_categories`)
        .then(({ data }) => {
          const categories = data.map((cat) => {
            return cat.name;
          });
          setExpenseCategories(categories);
        })

        .catch((err) => console.log(err));
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/income_categories`)
        .then(({ data }) => {
          const categories = data.map((cat) => {
            return cat.name;
          });
          setIncomeCategories(categories);
        })

        .catch((err) => console.log(err));
    }, []),
  );

  useEffect(() => {
    const unfilteredData = viewing === 'Expenses' ? databaseExpense : databaseIncome;
    const filteredData = handleFilteringData(unfilteredData, selectedCategories);
    handleProcessingData(filteredData);
  }, [viewing, databaseExpense, databaseIncome, selectedCategories]);

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Header
        selected={panel}
        setSelected={setPanel}/>
      {panel === 'Calendar' &&
      <CalendarSubPage/>
      }
      {panel === 'Line' &&
      <>
      <CustomAreaGraph dateStringData={compressedData} dateData={processedData} viewing={viewing} />
      <GraphFooter
        categories={viewing === 'Expenses' ? expenseCategories : incomeCategories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        allSelected={allSelected}
        setAllSelected={setAllSelected}
        viewing={viewing}
        setViewing={setViewing}
      />
      </>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
    // flexGrow: 1,
  },
  priceHeader: {
    backgroundColor: theme.colors.primary,
    fontSize: 36,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    paddingTop: 60,
  },
  dateHeader: {
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
});

export default AnalyticsPage;
