import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import theme from '../../../../theme';

const date = new Date(); // current Date
date.setMonth(date.getMonth() + 1); // get next month
const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() + 1;

const demoEvents = [
  [
    { text: 'Food', color: 'orange' },
    { text: 'Home', color: 'blue' },
    { text: 'Tuition', color: 'pink' },
    { text: 'Home', color: 'blue' },
    { text: 'Tuition', color: 'pink' },
  ],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [{ text: 'Other', color: 'green' }],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [],
  [
    { text: 'Food', color: 'orange' },
    { text: 'Home', color: 'blue' },
    { text: 'Tuition', color: 'pink' },
  ],
];

const cellHeight = (0.65 * Dimensions.get('window').height) / 5;
const cellWidth = (Dimensions.get('window').width - 10) / 7;
const eventSubcellHeight = 15;
const cellHeaderHeight = cellHeight * 0.25;

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const Calendar = () => {
  return (
    <>
      <DayLabels />
      <View style={styles.container}>
        {Array.from(Array(35).keys()).map((key, index) => {
          return (
            <Cell
              key={index}
              num={key}
              shouldMakeNumGrey={key + 1 > lastDayOfMonth ? true : undefined}
              events={demoEvents[key]}
            />
          );
        })}
      </View>
    </>
  );
};

const Cell = ({ num, shouldMakeNumGrey, events }) => {
  return (
    <View
      style={(num + 1) % 7 === 0 ? [styles.cellStyle, { borderRightWidth: 0 }] : styles.cellStyle}>
      <View style={styles.cellHeader}>
        <View
          style={
            new Date().getDate() === num + 1
              ? [styles.cellNumber, { backgroundColor: theme.colors.primary }]
              : styles.cellNumber
          }>
          <Text
            style={
              new Date().getDate() === num + 1
                ? { color: theme.colors.white }
                : shouldMakeNumGrey
                ? { color: theme.colors.primary, opacity: 0.65 }
                : { color: theme.colors.primary }
            }>
            {(num % lastDayOfMonth) + 1}
          </Text>
        </View>
      </View>
      <View style={styles.subcellsContainer}>
        {events !== undefined &&
          events.map((e, index) => {
            if ((index + 1) * eventSubcellHeight > cellHeight - cellHeaderHeight - 15) {
            {return undefined;}
            return <EventSubcell key={index} backgroundColor={e.color} text={e.text} />;
          })}
        {(events !== undefined && events.length * eventSubcellHeight) >
          cellHeight - cellHeaderHeight - 15 && (
          <View style={styles.hiddenSubcells}>
            <Text style={styles.hiddenSubcellText}>
              {'+' +
                `${
                  events.length -
                  Math.floor((cellHeight - cellHeaderHeight - 15) / eventSubcellHeight)
                }`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const EventSubcell = ({ backgroundColor, text }) => {
  return (
    <View style={[styles.eventSubcellContainer, { backgroundColor }]}>
      <Text style={styles.eventSubcellText}>{text}</Text>
    </View>
  );
};

const DayLabels = () => {
  return (
    <View style={styles.dayLabelContainer}>
      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((l, i) => {
        return (
          <View key={i} style={styles.dayLabels}>
            <Text style={styles.dayLabelText}>{l}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dayLabelText: {
    alignSelf: 'center',
    color: theme.colors.primary,
  },

  dayLabelContainer: {
    display: 'flex',
    flexDirection: 'row',
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
    fontSize: 12,
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
    borderTopWidth: 1,
    borderRightWidth: 2,
    height: cellHeight,
    // backgroundColor: theme.colors.white,
  },

  container: {
    marginLeft: 5,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
});

export default Calendar;
/*
Array()


* */
