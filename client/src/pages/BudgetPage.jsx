import React, { useState } from 'react';
import BudgetTable from '../components/BudgetPage/BudgetTable';
import BudgetDetails from '../components/BudgetPage/BudgetDetails';

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
  {
    month: 11,
    year: 2020,
    value: 1098.63,
    spent: 906.54,
  },
  {
    month: 10,
    year: 2020,
    value: 1098.63,
    spent: 906.54,
  },
  {
    month: 0,
    year: 2019,
    value: 1098.63,
    spent: 906.54,
  },
];

const expenseDatabase = [
  {
    name: 'Spotify',
    price: '5.99',
    date: '2021-12-17',
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Gym',
    price: '65.00',
    date: '2021-12-16',
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    name: 'Gym',
    price: '65.00',
    date: '2021-12-12',
    currency: 'CAD',
    category: 'Category #41',
  },
  {
    name: 'Coffee',
    price: '4.29',
    date: '2021-12-10',
    currency: 'CAD',
    category: 'Category #12',
  },
  {
    name: 'Monitor',
    price: '205.00',
    date: '2021-12-9',
    currency: 'CAD',
    category: 'Category #13',
  },
  {
    name: 'Mouse',
    price: '54.99',
    date: '2021-08-17',
    currency: 'CAD',
    category: 'Category #22',
  },
  {
    name: 'Skateboard',
    price: '80.99',
    date: '2021-08-01',
    currency: 'USD',
    category: 'Category #25',
  },
  {
    name: 'Spotify',
    price: '5.99',
    date: '2020-12-17',
    currency: 'USD',
    category: 'Category #25',
  },
];

const BudgetPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <>
      {showDetails ? (
        <BudgetDetails
          expenseDatabase={expenseDatabase}
          currentMonth={month}
          currentYear={year}
          isVisible={showDetails}
          setVisible={setShowDetails}
        />
      ) : (
        <BudgetTable
          renderList={budgetDatabase}
          isVisible={showDetails}
          setVisible={setShowDetails}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
        />
      )}
    </>
  );
};

export default BudgetPage;
