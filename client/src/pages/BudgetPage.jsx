import React, { useState, useEffect } from 'react';
import BudgetTable from '../components/BudgetPage/BudgetTable';
import BudgetDetails from '../components/BudgetPage/BudgetDetails';
import axios from 'axios';

const BudgetPage = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [databaseBudget, setDatabaseBudget] = useState([]);
  const [databaseExpense, setDatabaseExpense] = useState([]);

  useEffect (() => {
    var tempList = [];
    var tempList2 = [];
    console.log('https://money-manager-dev.herokuapp.com/expense/' + year + '/'+ month)
    axios
      .get('https://money-manager-dev.herokuapp.com/budget/all')
      .then((response) => {
        response.data.forEach((item) => {
          tempList.push(item);
        });
        setDatabaseBudget(tempList);
      })
      .catch((err) => {
        setDatabaseBudget(tempList);
        console.log(err)
      });

    axios
      .get('https://money-manager-dev.herokuapp.com/expense/' + year + '/'+ month)
      .then((response) => {
        response.data.forEach((item) => {
          tempList2.push(item);
        });
        setDatabaseExpense(tempList2);
      })
      .catch((err) => {
        setDatabaseExpense(tempList2);
        console.log(err)
      });
  }, [showDetails]);

  return (
    <>
      {showDetails ? (
        <BudgetDetails
          expenseDatabase={databaseExpense}
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
