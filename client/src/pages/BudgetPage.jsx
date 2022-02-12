import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../providers/axios';
import BudgetTable from '../components/BudgetPage/BudgetTable';
import BudgetDetails from '../components/BudgetPage/BudgetDetails';

const URL = process.env.SERVER_URL;

const BudgetPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [databaseBudget, setDatabaseBudget] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${URL}/budget/all`)
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
