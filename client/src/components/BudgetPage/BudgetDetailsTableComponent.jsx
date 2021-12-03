import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { theme } from '../../../theme';

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

const RightSwipe = () => {
  return (
    <View style={styles.swipeBackground}>
      <Text style={styles.swipeText}>Delete</Text>
    </View>
  );
};

const BudgetDetailsTableComponent = (props) => (
  <BudgetDetailsTableComponentHelper mult={props.mult}/>
);

export default BudgetDetailsTableComponent;

const BudgetDetailsTableComponentHelper = (props) => {
  const { mult } = props;
  const tableItems = mult.map((obj, index) => (
    <Swipeable key={index} renderRightActions={RightSwipe}>
      <List.Item
        title={<Text style={styles.subheader}>{obj.name}</Text>}
        description={
          <View>
            <Text style={styles.text}>{obj.category}</Text>
            <Text style={styles.text}>
              {months[obj.date.getMonth()]} {obj.date.getDate()}, {obj.date.getFullYear()}
            </Text>
          </View>
        }
        right={() => (
          <View>
            <Text />
            <Text style={styles.price}>
              ${obj.price} {obj.currency}
            </Text>
          </View>
        )}
        style={styles.listItem}
      />
    </Swipeable>
  ));

  return (
    <View>
      {tableItems}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    color: '#fff',
  },
  subheader: {
    fontSize: 20,
    color: '#fff',
  },
  text: {
    fontSize: 14,
    color: '#fff',
  },
  price: {
    fontSize: 25,
    color: '#fff',
    justifyContent: 'space-evenly',
  },
  swipeBackground: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 15,
  },
  swipeText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
  listItem: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
  }
});
