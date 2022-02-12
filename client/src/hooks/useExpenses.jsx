import { useState, useEffect } from 'react';
import axios from '../providers/axios';
import { formatDateBE } from '../utils/formatters';

const useExpenses = () => {
  const [refetch, setRefetch] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses();
  }, [refetch]);

  const getExpenses = () => {
    setLoading(true);
    axios
      .get(`${URL}/expenses`)
      .then(({ data }) => setExpenses(data))
      .catch((err) => {
        console.log(`${err}`);
        setError(err);
      })
      .finally(() => setLoading(false));
  };

  const addExpense = ({ name, description, date, price, currency, location, category, tag }) => {
    setLoading(true);
    axios
      .post(
        `${URL}/expense/`,
        JSON.stringify({
          name,
          description,
          date: formatDateBE(date),
          price,
          currency,
          exchange_rate: 0,
          location,
          category,
          sub_category: tag,
        }),
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
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    error,
    expenses,
    getExpenses,
    addExpense,
  };
};

export default useExpenses;
