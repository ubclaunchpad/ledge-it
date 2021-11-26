import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MONTHS } from '../../utils/constants';

const RightSwipe = () => {
  return (
    <View style={styles.swipeBackground}>
      <Text style={styles.swipeText}>Delete</Text>
    </View>
  );
};

const TableComponent = ({ title, subTitle, mult, type }) => {
  const negative = type === 'Expenses' ? '-' : '';

  const tableItems = mult.map((obj, index) => (
    <Swipeable key={index} renderRightActions={RightSwipe}>
      <List.Item
        title={<Text style={styles.subheader}>{obj.name}</Text>}
        description={
          <View>
            <Text style={styles.text}>{obj.category}</Text>
            <Text style={styles.text}>
              {MONTHS[obj.date.getMonth()]} {obj.date.getDate()}, {obj.date.getFullYear()}
            </Text>
          </View>
        }
        right={() => (
          <View>
            <Text />
            <Text style={styles.price}>
              {negative}${obj.price} {obj.currency}
            </Text>
          </View>
        )}
        style={styles.listItem}
      />
    </Swipeable>
  ));

  return (
    <List.Section style={styles.container}>
      <List.Subheader style={styles.header}>
        {MONTHS[title - 1]} {subTitle}
      </List.Subheader>
      {tableItems}
    </List.Section>
  );
};

export default TableComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#6072a6',
  },
  header: {
    fontSize: 20,
    color: '#fff',
    marginTop: -5,
    marginBottom: -10,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  text: {
    fontSize: 12,
    color: '#fff',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
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
    backgroundColor: '#4993ec',
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
});
