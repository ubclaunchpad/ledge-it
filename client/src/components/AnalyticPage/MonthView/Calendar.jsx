import React, {useEffect, useState, useRef} from 'react';

import { StyleSheet, View, Text, Dimensions, ScrollView } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import theme from "../../../../theme";

// LAYOUT CONSTANTS

const cellHeight = (.65 * Dimensions.get('window').height) / 6;
const cellWidth = (Dimensions.get('window').width - 10) / 7;
const eventSubcellHeight = 15;
const cellHeaderHeight = cellHeight * .25;

const calendarContainerHMargins = 5;
const calendarContainerWidth = Dimensions.get('window').width - 1*calendarContainerHMargins;
const calendarWidthTotal = calendarContainerWidth + calendarContainerHMargins;

const isToday = (date) => {
  const today = new Date();
  return date.setHours(0,0,0,0) === today.setHours(0,0,0,0);
}

// COMPONENTS

const Calendar = ({monthEvents, calArr, handleScroll, selectedMonth, scrollViewRef, setSelectedDate, categories}) => {

  const getEventsForDate = (date) => {
    const m = date.getMonth(),
    y = date.getFullYear(),
    d = date.getDate();
    if ((y in monthEvents) && (m in monthEvents[y]) && (d in monthEvents[y][m])) {
      return monthEvents[date.getFullYear()][date.getMonth()][date.getDate()];
    } else {
      return [];
    }
  }

  return (
    <>
      <DayLabels/>
      <View>
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').width} 
        snapToAlignment='start' 
        horizontal={true}
        onMomentumScrollEnd={handleScroll}
        contentOffset={{x: 0, y: 0}}
        showsHorizontalScrollIndicator={false}
        style={{display: 'flex', flexDirection: 'row', marginBottom: 5, direction: 'rtl'}}>
        <>
        {calArr.map((dates, i) => {
            return (
            <View key={i} style={styles.container}>
              {dates.calendarList.map((date, index) => {
                return <Cell
                        key={index}
                        num={date.getDate()}
                        date={date}
                        shouldMakeNumGrey={((date.getMonth() !== selectedMonth.getMonth()) || (date.getFullYear() !== selectedMonth.getFullYear()))}
                        dateEvents={getEventsForDate(date)}
                        categories={categories}
                        onPress={() => {
                          setSelectedDate(date);
                        }}/>;
              })}
            </View>
            );
          })}
          </>
      </ScrollView>
      </View>
    </>
  ); 
}


const Cell = ({ date, num, shouldMakeNumGrey, dateEvents, onPress, categories}) => {
  return (
    <TouchableOpacity 
      style={((date.getDay() === 6)) ? [styles.cellStyle, {borderRightWidth: 0}] : styles.cellStyle}
      onPress={onPress}>
      <View style={styles.cellHeader}>
        <View style={isToday(date) ? [styles.cellNumber, {backgroundColor: theme.colors.primary}] : styles.cellNumber}>
          <Text style={isToday(date) ? 
            {color: theme.colors.white} : 
            shouldMakeNumGrey ? 
              {color: theme.colors.primary, opacity: .65} : 
              {color: theme.colors.primary}}>{num}</Text>
        </View>
      </View>
      <View style={styles.subcellsContainer}>
        {dateEvents !== undefined && dateEvents.map((e, index) => {
          if (((index + 1) * eventSubcellHeight) > (cellHeight - cellHeaderHeight - 15)) return undefined;
          return <EventSubcell key={index} backgroundColor={categories !== undefined ? categories[e.category] : 'black'} text={e.name}/>
        })}
        {((dateEvents !== undefined) && ((dateEvents.length * eventSubcellHeight) > cellHeight - cellHeaderHeight - 15)) &&
        <View style={styles.hiddenSubcells}>
          <Text style={styles.hiddenSubcellText}>{'+' + `${dateEvents.length - Math.floor((cellHeight - cellHeaderHeight - 15) / eventSubcellHeight)}`}</Text>
        </View>}
      </View>
    </TouchableOpacity>
  );
}


const EventSubcell = ({ backgroundColor, text }) => {
  return (
    <View style={[styles.eventSubcellContainer, {backgroundColor: backgroundColor}]}>
      <Text style={styles.eventSubcellText}>{text}</Text>
    </View>
  );
}


const DayLabels = () => {
  return (
    <View style={styles.dayLabelContainer}>
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((l, i) => {
        return (<View key={i} style={styles.dayLabels}>
          <Text style={styles.dayLabelText}>{l}</Text>
        </View>);
      })}
    </View>
  );
}


const styles = StyleSheet.create({
  dayLabelText: {
    alignSelf: 'center',
    color: theme.colors.primary,
  },

  dayLabelContainer: {
    zIndex: -1,
    marginTop: 5,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center'
  },

  dayLabels: {
    height: 30,
    width: cellWidth,
  },

  hiddenSubcellText: {
    fontSize: 8,
    fontWeight: '700',
    alignSelf: 'center',
    color: theme.colors.primary,
  }, 

  hiddenSubcells: {
    borderColor: theme.colors.primary,
    width: '100%',
    height: 10,
  },

  eventSubcellText: {
    paddingLeft: 5,
    fontSize: 10,
    color: theme.colors.white,
    overflow: 'hidden',
  },

  eventSubcellContainer: {
    width: '100%',
    height: eventSubcellHeight,
    borderRadius: 10,
    marginTop: 2,
  },

  subcellsContainer: {
    width: '90%',
    marginTop: 5,
    marginRight: 2.5,
    marginLeft: 2.5,
  },

  cellNumber: {
    padding: 4,
    borderRadius: 15,
    width: '75%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 22,
  },  

  cellHeader: {
    height: cellHeaderHeight,
    // backgroundColor: 'black',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  cellStyle: {
    width: cellWidth,
    borderColor: theme.colors.primary,
    borderTopWidth: .5,
    borderRightWidth: .5,
    height: cellHeight,
    // backgroundColor: theme.colors.white,
  },

  container: {
    direction: 'ltr',
    zIndex: -1,
    marginLeft: calendarContainerHMargins,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: calendarContainerWidth,
  }
});

export default Calendar;
export {calendarWidthTotal as calendarWidthTotal}; 