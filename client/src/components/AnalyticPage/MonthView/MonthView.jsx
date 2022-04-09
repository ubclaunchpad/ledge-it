import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import CalenderPageHeader from '../../DataPage/Calendar/CalendarPageHeader';
import Calendar, { calendarWidthTotal } from './Calendar';

const thisMonth = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

const MonthView = ({
  viewingExpenses,
  setViewingExpenses,
  calArr,
  setCalArr,
  monthEvents,
  setMonthEvents,
  categories,
  setSelectedDate,
  setupCalendar,
}) => {
  const [month, setMonth] = useState(thisMonth());
  const [index, setIndex] = useState(0);

  const scrollView = useRef();

  useLayoutEffect(() => {
    if ('scrollTo' in calArr) {
      setTimeout(() => {
        scrollView.current.scrollTo({ x: calArr.scrollTo, y: 0, animated: true });
        setCalArr(calArr.arr);
      }, 10);
    }
  }, [calArr]);

  const loadInNextMonth = () => {
    const arr = calArr;
    if (index >= arr.length - 3) {
      arr.push(setupCalendar(new Date(arr[arr.length - 1].year, arr[arr.length - 1].month - 1, 1)));
      setCalArr(calArr);
    }
  };

  const loadInMultipleMonths = (earlierMonth, scrollTo) => {
    const arr = calArr,
      laterMonth = new Date(arr[arr.length - 1].year, arr[arr.length - 1].month, 1),
      monthsApart =
        (laterMonth.getFullYear() - earlierMonth.getFullYear()) * 12 -
        earlierMonth.getMonth() +
        laterMonth.getMonth();
    for (let i = 1; i <= monthsApart; i++) {
      arr.push(setupCalendar(new Date(laterMonth.getFullYear(), laterMonth.getMonth() - i, 1)));
    }
    setCalArr({ arr, scrollTo });
  };

  const handleScroll = (se) => {
    const newOffset = se.nativeEvent.contentOffset.x;
    const oldOffset = index * calendarWidthTotal;
    const diff = (newOffset - oldOffset) / calendarWidthTotal;
    if (Math.abs(newOffset - oldOffset) >= calendarWidthTotal) {
      loadInNextMonth();
      setMonth(new Date(month.getFullYear(), month.getMonth() - 1 * diff, 1));
      setIndex(index + diff);
    }
  };

  const goToMonth = (monthDate) => {
    const currentOffset = index * calendarWidthTotal;
    const monthsApart =
      (monthDate.getFullYear() - month.getFullYear()) * 12 -
      month.getMonth() +
      monthDate.getMonth();
    if (monthDate < new Date(calArr[calArr.length - 1].year, calArr[calArr.length - 1].month, 1)) {
      loadInMultipleMonths(monthDate, currentOffset - monthsApart * calendarWidthTotal);
    } else {
      scrollView.current.scrollTo({
        x: currentOffset - monthsApart * calendarWidthTotal,
        y: 0,
        animated: true,
      });
    }
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1 * monthsApart, 1));
    setIndex(index - monthsApart);
  };

  const getTotal = () => {
    if (
      !(month.getFullYear() in monthEvents) ||
      !(month.getMonth() in monthEvents[month.getFullYear()])
    ) {
      return 0;
    } else {
      let t = 0;
      Object.values(monthEvents[month.getFullYear()][month.getMonth()]).forEach((day) => {
        Object.values(day).forEach((event) => {
          t += event.price;
        });
      });
      return t.toFixed(2);
    }
  };

  return (
    <>
      <CalenderPageHeader
        viewingExpenses={viewingExpenses}
        month={month.getMonth()}
        goToMonth={goToMonth}
        monthOverview={getTotal()}
        setViewingExpenses={setViewingExpenses}
      />
      <Calendar
        categories={categories}
        scrollViewRef={scrollView}
        calArr={Array.isArray(calArr) ? calArr : Array.isArray(calArr.arr) ? calArr.arr : []}
        monthEvents={monthEvents}
        handleScroll={handleScroll}
        selectedMonth={month}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
};

export default MonthView;
