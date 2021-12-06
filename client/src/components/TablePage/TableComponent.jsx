import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MONTHS } from '../../utils/constants';
import { theme } from '../../../theme';
import ItemSummary from '../../modals/ItemSummary';
import { getDay, getMonth, getYear } from '../../utils/formatters';

const RightSwipe = () => {
  return (
    <View style={styles.swipeBackground}>
      <Text style={styles.swipeText}>Delete</Text>
    </View>
  );
};

const ListInputComponent = ({ item, type }) => {
  const [itemSummaryModal, setItemSummaryModal] = useState(false);

  const negative = type === 'Expenses' ? '-' : '';
  const userCategoriesExpenses = ['Food', 'Housing', 'Fun', 'Other', 'School'];
  const userCategoriesIncomes = ['Main job', 'Part-time', 'Passive', 'Other'];

  return (
    <>
      <List.Item
        title={<Text style={styles.subheader}>{item.name}</Text>}
        onPress={() => {
          setItemSummaryModal(true);
        }}
        description={
          <View>
            <Text style={styles.text}>{item.category}</Text>
            <Text style={styles.text}>
              {MONTHS[getMonth(item.date) - 1]} {getDay(item.date)}, {getYear(item.date)}
            </Text>
          </View>
        }
        right={() => (
          <View>
            <Text />
            <Text style={styles.price}>
              {negative}${item.price || item.amount} {item.currency}
            </Text>
          </View>
        )}
        style={styles.listItem}
      />
      {itemSummaryModal && (
        <ItemSummary
          modalVisible={itemSummaryModal}
          setModalVisible={setItemSummaryModal}
          item={item}
          userCategories={type === 'Expenses' ? userCategoriesExpenses : userCategoriesIncomes}
          type={type}
        />
      )}
    </>
  );
};

const TableComponent = ({ title, subTitle, list, type }) => {
  return (
    <List.Section style={styles.container}>
      <List.Subheader style={styles.header}>
        {MONTHS[title - 1]} {subTitle}
      </List.Subheader>
      {list.map((item, index) => (
        <Swipeable key={index} renderRightActions={RightSwipe}>
          <ListInputComponent item={item} type={type} />
        </Swipeable>
      ))}
    </List.Section>
  );
};

export default TableComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginTop: -5,
    marginBottom: -10,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  text: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textLight,
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
    color: theme.colors.textLight,
    fontWeight: '600',
    padding: 20,
  },
  listItem: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
});
