// NOTES- remove before commit:
//
// NOTES
// 1. Did not implement a gradient color scheme within the week view: considering that you can't scroll within weeks (just been weeks) it doesn't make much sense to have Saturdays always be a less opaque grey than Wednesdays - and to recap: scrolling within a week doesn't make sense if there is also an intra-week day select tool.
//
// TODO:
// 1. Make it so when user swipes on the expense INFO, the selectedDay moves to the right or left by 1. (+/- 1)

// IMPORTANT: CHANGE TO MARGIN HORIZONTAL SO WE CAN GET RID OF THE THING OUTSIDE THE .map

import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from '../../../../theme';

const n = Array.from(new Array(34).keys());

const scrollViewMargin = 5;
const cellMarginLeft = 2;
const cellWidth = (Dimensions.get('window').width - 8 * cellMarginLeft - 2 * scrollViewMargin) / 7;
console.log('\n\n\n\n\n', cellWidth, '\n\n\n\n\n');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const stringFromDate = (date) => {
  return `${days[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;
};

const buildWeekArray = (date, weeksBack = 2, weeksForward = 3) => {
  const weekArray = [];
  // minus 2 weeks
  // current week
  // plus 3 weeks
  const firstDayOfSelectedWeek = new Date();
  const firstDayOfArray = new Date();

  firstDayOfSelectedWeek.setDate(date.getDate() - date.getDay());
  firstDayOfArray.setDate(firstDayOfSelectedWeek.getDate() - 7 * weeksBack);

  for (let i = 0; i < 7 * (1 + weeksBack + weeksForward); i++) {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(firstDayOfArray.getDate() + i);
    weekArray.push(d);
  }

  return weekArray;
};

const Today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const WeekView = () => {
  const [selectedDate, setSelectedDate] = useState(Today());

  return (
    <View>
      <SelectDayScroll selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
    </View>
  );
};

const DayLabels = () => {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: scrollViewMargin,
        backgroundColor: theme.colors.primary,
      }}>
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((i, j) => {
        return (
          <View
            key={j}
            style={{
              width: cellWidth,
              alignItems: 'center',
              marginLeft: cellMarginLeft,
              paddingBottom: 5,
              paddingTop: 5,
            }}>
            <Text style={styles.text}>{i}</Text>
          </View>
        );
      })}
    </View>
  );
};

const DateLabel = ({ date }) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: '100%',
      }}>
      <Text style={styles.text}>{stringFromDate(date)}</Text>
    </View>
  );
};

const SelectDayScroll = ({ selectedDate, setSelectedDate }) => {
  // const updateFollowingWeeks = () => {}

  const [weekArray, setWeekArray] = useState(buildWeekArray(selectedDate));

  return (
    <>
      <DayLabels />
      <ScrollView
        decelerationRate="slow"
        snapToInterval={7 * (cellWidth + cellMarginLeft)}
        snapToAlignment="start"
        horizontal={true}
        // onScrollBeginDrag={updateFollowingWeeks}
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: 2 * (cellWidth + cellMarginLeft), y: 0 }}
        style={{
          backgroundColor: theme.colors.primary,
          paddingLeft: scrollViewMargin,
          paddingRight: scrollViewMargin,
        }}>
        {weekArray.slice(0, weekArray.length - 1).map((i, j) => {
          return (
            <TouchableOpacity
              key={j}
              style={
                i === selectedDate
                  ? [styles.block, { backgroundColor: theme.colors.white }]
                  : styles.block
              }
              onPress={() => setSelectedDate(i)}>
              <Text
                style={
                  i === selectedDate
                    ? [styles.text, { color: theme.colors.primary }]
                    : [styles.text, { opacity: 0.75 }]
                }>
                {i.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          key={weekArray.length - 1}
          style={
            weekArray[weekArray.length - 1] === selectedDate
              ? [styles.block, { backgroundColor: theme.colors.white, marginRight: 10 }]
              : [styles.block, { marginRight: 10 }]
          }
          onPress={() => setSelectedDate(weekArray[weekArray.length - 1])}>
          <Text
            style={
              weekArray[weekArray.length - 1] === selectedDate
                ? [styles.text, { color: theme.colors.primary }]
                : [styles.text, { opacity: 0.75 }]
            }>
            {weekArray[weekArray.length - 1].getDate()}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <DateLabel date={selectedDate} />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    width: cellWidth,
    height: 50,
    marginLeft: cellMarginLeft,
    backgroundColor: theme.colors.primary,
    borderRadius: cellWidth,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: theme.colors.white,
    fontWeight: '600',
  },
});

export default WeekView;
