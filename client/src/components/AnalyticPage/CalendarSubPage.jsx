import React, {useState, useEffect} from 'react';
import WeekView from './WeekView/WeekView';
import MonthView from './MonthView/MonthView';
import axios from 'axios';
import { getDay, getMonth, getYear } from '../../utils/formatters';

const URL = process.env.SERVER_URL;

const thisMonth = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}


const relativeMonth = (i) => {
  const d = thisMonth();
  return new Date(d.getFullYear(), d.getMonth() + i,  1);
}


const buildCalendar = (date) => {
  const dateList = [];  
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek1 = new Date(firstDayOfMonth);
  firstDayOfWeek1.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
  const endDate = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 1);
  const dayDiff = Math.max(35, Math.ceil(endDate - firstDayOfWeek1)/(1000*60*60*24) - 1);
  for (let i = 0; i < dayDiff; i++) {
    const d = new Date(firstDayOfWeek1);
    d.setDate(firstDayOfWeek1.getDate() + i);
    dateList.push(d);
  }
  return {
    calendarList: dateList,
    month: firstDayOfMonth.getMonth(),
    year: firstDayOfMonth.getFullYear(),
  }
}

const CalendarSubPage = () => {
  const [selectedDate, setSelectedDate] = useState(undefined);
  const [monthExpenses, setMonthExpenses] = useState({2022: {}});
  const [monthIncome, setMonthIncome] = useState({2022: {}});
  const [expenseCategories, setExpenseCategories] = useState({});
  const [incomeCategories, setIncomeCategories] = useState({});
  const [viewingExpenses, setViewingExpenses] = useState(true);
  const [calArr, setCalArr] = useState([]);
  const [dateEvents, setDateEvents] = useState([]);

  const setupCalendar = (date) => {
    const monthEvents = monthExpenses;
    const year = Number.parseInt(date.getFullYear());
    const month = Number.parseInt(date.getMonth());
    if (!(year in monthEvents) || !(month in monthEvents)) {

      if (!(year in monthEvents)) {
        monthEvents[year] = {};
      }
      if (!(month in monthEvents[date.getFullYear()])) {
        monthEvents[year][month] = {};
      }
      axios
      .get(`${URL}/expense/${year}/${month + 1}`, {})
      .then((res) => {
        const c = res.data;
        c.forEach((v, i) => {
          if (!(getDay(v.date) in monthEvents[year][month])) {
            monthEvents[year][month][Number.parseInt(getDay(v.date))] = [];
          }
          monthEvents[year][month][Number.parseInt(getDay(v.date))].push(v);
        });
        setMonthExpenses(Object.assign({}, monthEvents));
      })
      .catch(() => {}) // if no expenses are found for month, do nothing
    }
    return buildCalendar(date);
  }

  useEffect(() => {
    setTimeout(() => {
      setCalArr([thisMonth(), relativeMonth(-1), relativeMonth(-2)].map(setupCalendar));
    }, 101);
  }, []);

  useEffect(() => {
    const monthEvents = monthIncome;
    axios.get(`${URL}/incomes`, {})
    .then((res) => {
      const c = res.data;
      c.forEach((v, i) => {

        if (!(getYear(v.date) in monthEvents)) {
          monthEvents[getYear(v.date)] = []; 
        }
        if (!(getMonth(v.date) in monthEvents[getYear(v.date)])) {
          monthEvents[getYear(v.date)][getMonth(v.date)] = [];
        } 
        if (!(getDay(v.date) in monthEvents[getYear(v.date)][getMonth(v.date)])) {
          monthEvents[getYear(v.date)][(getMonth(v.date))][Number.parseInt(getDay(v.date))] = [];
        }
        v['price'] = v['amount'];
        monthEvents[getYear(v.date)][(getMonth(v.date))][Number.parseInt(getDay(v.date))].push(v);
      })
      setMonthIncome(Object.assign({}, monthEvents));
    })
  }, []);


  useEffect(() => {
    axios
    .get(`${URL}/expense_categories`, {})
    .then((res) => {
      const c = expenseCategories;
      res.data.forEach((v, i) => {
        c[v.name] = v.color;
      });
      setExpenseCategories(Object.assign({}, c));
    })
    .catch();

    axios
    .get(`${URL}/income_categories`, {})
    .then((res) => {
      const c = incomeCategories;
      res.data.forEach((v, i) => {
        c[v.name] = v.color;
      });
      setIncomeCategories(Object.assign({}, c));
    })
    .catch();
  }, []);


  const setMonthEvents = (n) => {
    if (viewingExpenses) {
      setMonthExpenses(n);
    } else {
      setMonthIncome(n);
    }
  }
  
  useEffect(() => {
    const events = viewingExpenses ? monthExpenses : monthIncome;
    if ((selectedDate !== undefined) &&
        (selectedDate.getFullYear() in events) &&
        (selectedDate.getMonth() in events[selectedDate.getFullYear()]) &&
        (selectedDate.getDate() in events[selectedDate.getFullYear()][selectedDate.getMonth()])) {
      setDateEvents(events[selectedDate.getFullYear()][selectedDate.getMonth()][selectedDate.getDate()]);
    } else {
      setDateEvents([]);
    }
  }, [selectedDate])

  return (
    <>
      {selectedDate === undefined && 
        <MonthView
          categories={viewingExpenses? expenseCategories : incomeCategories}
          monthEvents={viewingExpenses ? monthExpenses : monthIncome}
          setMonthEvents={setMonthEvents}
          viewingExpenses={viewingExpenses}
          setViewingExpenses={setViewingExpenses}
          setSelectedDate={setSelectedDate}
          setupCalendar={setupCalendar}
          calArr={calArr}
          setCalArr={setCalArr}/>
      }
      {selectedDate !== undefined &&
        <WeekView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          events={dateEvents}/>
      }
    </>
  );
}

export default CalendarSubPage;