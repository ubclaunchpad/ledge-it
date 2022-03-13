import { useState, useEffect } from 'react';
import axios from '../providers/axios';
import { formatDateBE } from '../utils/formatters';

const URL = process.env.SERVER_URL;

const useExpense = () => {
  const [refetch, setRefetch] = useState(0);
  const [expenseLoading, setExpenseLoading] = useState(false);
  const [expenseErrors, setExpenseErrors] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses();

    // TODO: deal with memory leak?
    return () => {};
  }, [refetch]);

  const getExpenses = () => {
    setExpenseLoading(true);
    axios
      .get(`${URL}/expenses`)
      .then(({ data }) => setExpenses(data))
      .catch((err) => {
        console.log(`${err}`);
        setExpenseErrors(err);
      })
      .finally(() => setExpenseLoading(false));
  };

  const addExpense = ({ name, description, date, price, currency, location, category, tag }) => {
    setExpenseLoading(true);
    axios
      .post(
        `${URL}/expense`,
        {
          name,
          description,
          date: formatDateBE(date),
          price,
          currency,
          exchange_rate: 0,
          location,
          category,
          sub_category: tag,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({ data }) => {
        console.log(data);
        setRefetch(refetch + 1);
      })
      .catch((err) => {
        console.log(err);
        setExpenseErrors(err);
      })
      .finally(() => {
        setExpenseLoading(false);
      });
  };

  return {
    expenseLoading,
    expenseErrors,
    expenses,
    getExpenses,
    addExpense,
  };
};

export default useExpense;
