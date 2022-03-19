import React, { useState } from 'react';
import { View } from 'react-native';
import CalenderPageHeader from '../components/DataPage/Calendar/CalendarPageHeader';

const AnalyticsPage = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();

  return (
    <View>
      <CalenderPageHeader month={month} setMonth={setMonth} year={year} />
    </View>
  );
};

export default AnalyticsPage;
