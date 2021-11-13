import React, { useState } from 'react';
import { Picker } from 'react-native';
import ScrollTable from '../components/TablePage/ScrollTable';

// Note: These are just sample data of expense/income from the database.

const expenseDatabase = [
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
];

const incomeDatabase = [
  {
    name: 'Part Time: Piano Lessons',
    price: '650.00',
    date: new Date('2021-10-21T10:34:23'),
    currency: 'CAD',
    category: 'Category #1',
  },
  {
    name: 'Tax Refunds',
    price: '205.00',
    date: new Date('2021-09-27T10:34:23'),
    currency: 'CAD',
    category: 'Category #13',
  },
  {
    name: 'Part Time: CPSC 312 TA',
    price: '1344.99',
    date: new Date('2021-09-05T10:34:23'),
    currency: 'CAD',
    category: 'Category #1',
  },
  {
    name: 'Monthly Allowance',
    price: '80.99',
    date: new Date('2021-08-17T10:34:23'),
    currency: 'USD',
    category: 'Category #25',
  },
];

const TablePage = () => {
  const [splitExpenses, setSplitExpenses] = useState([]);
  const [splitIncome, setSplitIncome] = useState([]);
  const [pickerValue, setPickerValue] = useState('Expenses');

  expenseDatabase.forEach((expense) => {
    const month = expense.date.getMonth() + 1;
    const year = expense.date.getFullYear();
    if (splitExpenses.length === 0) {
      splitExpenses.push({
        month,
        year,
        list: [],
      });
    }
    if (splitExpenses[splitExpenses.length - 1].month === month) {
      splitExpenses[splitExpenses.length - 1].list.push(expense);
    } else {
      splitExpenses.push({
        month,
        year,
        list: [expense],
      });
    }
  });

  incomeDatabase.forEach((income) => {
    const month = income.date.getMonth() + 1;
    const year = income.date.getFullYear();
    if (splitIncome.length === 0) {
      splitIncome.push({
        month,
        year,
        list: [],
      });
    }
    if (splitIncome[splitIncome.length - 1].month === month) {
      splitIncome[splitIncome.length - 1].list.push(income);
    } else {
      splitIncome.push({
        month,
        year,
        list: [income],
      });
    }
  });

  return (
    <>
      <Picker
        selectedValue={pickerValue}
        onValueChange={(chosenValue) => {
          setPickerValue(chosenValue);
          setSplitExpenses([]);
          setSplitIncome([]);
        }}>
        <Picker.Item label="Expenses" value="Expenses" />
        <Picker.Item label="Income" value="Income" />
      </Picker>
      {pickerValue === 'Expenses' ? (
        <ScrollTable renderList={splitExpenses} type={pickerValue} />
      ) : (
        <ScrollTable renderList={splitIncome} type={pickerValue} />
      )}
    </>
  );
};

export default TablePage;
