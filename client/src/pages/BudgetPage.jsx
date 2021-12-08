import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import BudgetTable from '../components/BudgetPage/BudgetTable';
import BudgetDetails from '../components/BudgetPage/BudgetDetails';

const BudgetPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [databaseBudget, setDatabaseBudget] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get('https://money-manager-dev.herokuapp.com/budget/all')
        .then(({ data }) => setDatabaseBudget(data))
        .catch((err) => console.log(err));
    }, []),
  );

  return (
    <>
      {showDetails ? (
        <BudgetDetails
          currentMonth={month}
          currentYear={year}
          isVisible={showDetails}
          setVisible={setShowDetails}
        />
      ) : (
        <BudgetTable
          renderList={databaseBudget}
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
