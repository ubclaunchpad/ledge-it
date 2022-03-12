import { useState, useEffect } from 'react';
import axios from '../providers/axios';
import { formatDateBE } from '../utils/formatters';

const URL = process.env.SERVER_URL;

const useIncomes = () => {
  const [refetch, setRefetch] = useState(0);
  const [incomeLoading, setIncomeLoading] = useState(false);
  const [incomeErrors, setIncomeErrors] = useState(null);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    getIncomes();
  }, [refetch]);

  const getIncomes = () => {
    setIncomeLoading(true);
    axios
      .get(`${URL}/incomes`)
      .then(({ data }) => setIncomes(data))
      .catch((err) => {
        console.log(`${err}`);
        setIncomeErrors(err);
      })
      .finally(() => setIncomeLoading(false));
  };

  const addIncome = ({
    name,
    description,
    date,
    amount,
    currency,
    exchange_rate,
    location,
    category,
  }) => {
    setIncomeLoading(true);
    axios
      .post(
        `${URL}/income`,
        JSON.stringify({
          name,
          description,
          date: formatDateBE(date),
          amount,
          currency,
          exchange_rate: exchange_rate || 0,
          location,
          category,
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
        setIncomeErrors(err);
      })
      .finally(() => {
        setIncomeLoading(false);
      });
  };

  return {
    incomeLoading,
    incomeErrors,
    incomes,
    getIncomes,
    addIncome,
  };
};

export default useIncomes;
