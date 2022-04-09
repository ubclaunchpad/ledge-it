// NOTES- remove before commit: 
// 
// NOTES
// 1. Did not implement a gradient color scheme within the week view: considering that you can't scroll within weeks (just been weeks) it doesn't make much sense to have Saturdays always be a less opaque grey than Wednesdays - and to recap: scrolling within a week doesn't make sense if there is also an intra-week day select tool. 
// 
// TODO:
// 1. Make it so when user swipes on the expense INFO, the selectedDay moves to the right or left by 1. (+/- 1)

// IMPORTANT: CHANGE TO MARGIN HORIZONTAL SO WE CAN GET RID OF THE THING OUTSIDE THE .map

import React, {useState, useEffect, useCallback} from "react";
import { View, ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native";
import theme from "../../../../theme";
import BudgetDetailsTable from "../../BudgetPage/BudgetDetailsTable";
import axios from "axios";
import { MONTHS as months } from "../../../utils/constants";
import { Entypo } from "@expo/vector-icons";

const n = Array.from(new Array(34).keys());

const scrollViewMargin = 5;
const cellMarginLeft = 2;
const cellWidth = (Dimensions.get('window').width - 8 * cellMarginLeft - 2 * scrollViewMargin) / (7);


const URL = process.env.SERVER_URL;



const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];


const stringFromDate = (date) => {
  return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

const buildWeekArray = (date, weeksBack = 2, weeksForward = 3) => {
  const weekArray = [];
  const firstDayOfSelectedWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
  const firstDayOfArray = new Date(date.getFullYear(), date.getMonth(), firstDayOfSelectedWeek.getDate() - 7 * weeksBack);
  for (let i = 0; i < 7*(1 + weeksBack + weeksForward); i++) {
    const d = new Date(firstDayOfArray.getFullYear(), firstDayOfArray.getMonth(), firstDayOfArray.getDate() + i);
    weekArray.push(d);
  }
  return weekArray;
}; 

const WeekView = ({events, selectedDate, setSelectedDate}) => {

  const [categoryBudgets, setCategoryBudgets] = useState(null);

  useEffect(() => {
    axios
    .get(`${URL}/budget/category/all`, {
      params: {
        month: selectedDate.getMonth() + 1,
        year: selectedDate.getFullYear(),
      },
    })
    .then((res) => {
      setCategoryBudgets(res.data);
    })
    .catch((e) => console.log(e));
  }, []); 

  return (
    <View
      style={{marginBottom: 20}}>
      <TouchableOpacity 
       style={{backgroundColor: theme.colors.primary}}
      onPress={() => {setSelectedDate(undefined)}}>
        <Entypo name="calendar" size={45} color="white" style={{alignSelf: 'center', paddingTop: 20, backgroundColor: theme.colors.primary}}/>
      </TouchableOpacity>
      <SelectDayScroll
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}/>
      <BudgetDetailsTable
          renderList={events}
          categoryBudget={categoryBudgets === null ? [] : categoryBudgets}
          sortMethod={'vhigh->vlow'}/>
    </View>
  );
}

const DayLabels = () => {
  return (
    <View style={{display: 'flex', flexDirection: 'row', paddingLeft: scrollViewMargin, paddingTop: 15, backgroundColor: theme.colors.primary}}>
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((i, j) => {
        return (
            <View key={j} style={{width: cellWidth, alignItems: 'center', marginLeft: cellMarginLeft, paddingBottom: 5, paddingTop: 5}}>
              <Text style={styles.text}>{i}</Text>
            </View>
          );
      })}
    </View>
  );
}

const DateLabel = ({date}) => {
  return (
    <View style={{backgroundColor: theme.colors.primary, display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center', height: 30, width: '100%'}}>
      <Text style={styles.text}>
        {stringFromDate(date)}
      </Text>
    </View>
  );
}


const SelectDayScroll = ({ selectedDate, setSelectedDate }) => {


  const [weekArray, setWeekArray] = useState(buildWeekArray(selectedDate));

  return (
    <>
    <DayLabels/>
    <ScrollView 
      decelerationRate="slow"
      snapToInterval={7 * (cellWidth + cellMarginLeft)} 
      snapToAlignment='start' 
      horizontal={true}
      // onScrollBeginDrag={updateFollowingWeeks}
      showsHorizontalScrollIndicator={false}
      contentOffset={{x: 2 * 7 * (cellWidth + cellMarginLeft), y: 0}}
      style={{backgroundColor: theme.colors.primary, paddingLeft: scrollViewMargin, paddingRight: scrollViewMargin}}
      >
      {weekArray.slice(0, weekArray.length).map((i, j) => {
        i.setHours(0,0,0,0);
        selectedDate.setHours(0,0,0,0);
        return (
          <TouchableOpacity 
            key={j} 
            style={i.toDateString() === selectedDate.toDateString() ? [styles.block, {backgroundColor: theme.colors.white}] : styles.block}
            onPress={() => setSelectedDate(i)}>
              <Text style={i.toDateString() === selectedDate.toDateString() ? [styles.text, {color: theme.colors.primary}] : 
                                                    [styles.text, {opacity: .75}]}>{i.getDate()}</Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
    <DateLabel date={selectedDate}/>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    width: cellWidth,
    height: 50,
    marginHorizontal: cellMarginLeft/2,
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


