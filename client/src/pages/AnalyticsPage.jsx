import React, { useState } from 'react';
import { Text, View } from 'react-native';
import CalenderPageHeader from '../components/DataPage/Calendar/CalendarPageHeader';

const AnalyticsPage = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <View>
      <CalenderPageHeader month={month} year={year} setMonth={setMonth} />
      <Text>Analytics Page</Text>
      <Text>This is the data visualization page</Text>
    </View>
  );
};

export default AnalyticsPage;
