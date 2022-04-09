import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../providers/axios';
import BudgetTable from '../components/BudgetPage/BudgetTable';
import BudgetDetails from '../components/BudgetPage/BudgetDetails';
import EditBudget from '../components/BudgetPage/EditBudget';

const URL = process.env.SERVER_URL;

const BudgetPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [databaseBudget, setDatabaseBudget] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showTable, setShowTable] = useState(true);

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
      {showTable && (
        <BudgetTable
          renderList={databaseBudget}
          setMonth={setMonth}
          month={month}
          year={year}
          setYear={setYear}
          setShowTable={setShowTable}
          setShowDetails={setShowDetails}
          setShowEdit={setShowEdit}
        />
      )}
      {showDetails && (
        <BudgetDetails
          currentMonth={month}
          currentYear={year}
          setShowDetails={setShowDetails}
          setShowTable={setShowTable}
        />
      )}
      {showEdit && (
        <EditBudget
          month={month}
          year={year}
          setShowTable={setShowTable}
          setShowEdit={setShowEdit}
        />
      )}
    </>
  );
};

export default BudgetPage;
