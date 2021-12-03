import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';
import BudgetTable from '../components/BudgetPage/BudgetTable';
import { theme } from '../../theme';
import BudgetDetails from '../components/BudgetPage/BudgetDetails';
import axios from 'axios';

const budgetDatabase = [
  {
    month: 11,
    year: 2021,
    value: 200.27,
    spent: 100.99,
  },
  {
    month: 9,
    year: 2021,
    value: 82.74,
    spent: 13.78,
  },
  {
    month: 8,
    year: 2021,
    value: 98.23,
    spent: 387.92,
  },
  {
    month: 7,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 6,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 5,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 4,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 3,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 2,
    year: 2021,
    value: 198.63,
    spent: 96.54,
  },
  {
    month: 0,
    year: 2021,
    value: 1098.63,
    spent: 906.54,
  },
];

const expenseDatabase = [
  {
    name: 'Spotify',
    price: '5.99',
    date: new Date('2021-12-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Gym',
    price: '65.00',
    date: new Date('2022-10-21T10:34:23'),
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    name: 'Gym',
    price: '65.00',
    date: new Date('2021-10-21T10:34:23'),
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    name: 'Coffee',
    price: '4.29',
    date: new Date('2021-10-17T10:34:23'),
    currency: 'CAD',
    category: 'Category #12',
  },
  {
    name: 'Monitor',
    price: '205.00',
    date: new Date('2021-09-27T10:34:23'),
    currency: 'CAD',
    category: 'Category #13',
  },
  {
    name: 'Mouse',
    price: '54.99',
    date: new Date('2021-09-05T10:34:23'),
    currency: 'CAD',
    category: 'Category #22',
  },
  {
    name: 'Skateboard',
    price: '80.99',
    date: new Date('2021-08-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Spotify',
    price: '5.99',
    date: new Date('2021-07-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Spotify',
    price: '5.99',
    date: new Date('2021-06-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Spotify',
    price: '5.99',
    date: new Date('2021-05-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Spotify',
    price: '5.99',
    date: new Date('2021-04-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Spotify',
    price: '5.99',
    date: new Date('2021-10-17T10:34:23'),
    currency: 'USD',
    category: 'Category #41',
  },
];

const BudgetPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [chosenMonth, setChosenMonth] = useState('');
  const [chosenYear, setChosenYear] = useState('');
  const [databaseBudget, setDatabaseBudget] = useState([]);
  const [databaseExpense, setDatabaseExpense] = useState([]);

  useEffect = ( () => {
    var tempList  = []
    var tempList2 = []
    axios.get('https://money-manager-dev.herokuapp.com/allBudget/')
      .then( (response) => {
        response.forEach((item) => {
          tempList.push(item);
        });
        setDatabaseBudget(tempList);
      })
      .catch((err) => console.log(err));
    // Uncomment if get all expense has been implemented.
    // axios.all([
    //   axios.get('https://money-manager-dev.herokuapp.com/allBudget/'),
    //   axios.get('https://money-manager-dev.herokuapp.com/allExpense/')
    // ])
    //   .then( (responseArr) => {
    //     responseArr[0].forEach((item) => {
    //       tempList.push(item);
    //     });
    //     setDatabaseBudget(tempList);
    //     responseArr[1].forEach((item) => {
    //       tempList2.push(item);
    //     });
    //     setDatabaseExpense(tempList2);
    //   })
  }, [showDetails]);


  return showDetails ? (
    <BudgetDetails
      expenseDatabase={expenseDatabase}
      currentMonth={chosenMonth}
      currentYear={chosenYear}
      isVisible={showDetails}
      setVisible={setShowDetails}
    />
  ) : (
    <BudgetTable
      renderList={budgetDatabase}
      isVisible={showDetails}
      setVisible={setShowDetails}
      setMonth={setChosenMonth}
      setYear={setChosenYear}
    />
  );
};

export default BudgetPage;

const styles = StyleSheet.create({
  header: {
    fontSize: 42,
    backgroundColor: theme.colors.primary,
    marginTop: 8,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  subheader: {
    color: theme.colors.textLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  value: {
    color: theme.colors.green,
    alignSelf: 'center',
  },
  spent: {
    color: theme.colors.red,
    alignSelf: 'center',
  },
});
