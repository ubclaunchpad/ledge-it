import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import axios from '../../providers/axios';
import { MONTHS } from '../../utils/constants';
import theme from '../../../theme';
import ItemSummary from '../../modals/ItemSummary';
import { getDay, getMonth, getYear } from '../../utils/formatters';

const URL = process.env.SERVER_URL;

const ListInputComponent = ({ item, type, categories }) => {
  const [itemSummaryModal, setItemSummaryModal] = useState(false);

  const negative = type === 'Expenses' ? '-' : '';

  return (
    <>
      <List.Item
        title={<Text style={styles.subheader}>{item.name}</Text>}
        onPress={() => {
          setItemSummaryModal(true);
        }}
        description={
          <View>
            <Text style={styles.text}>
              {MONTHS[getMonth(item.date) - 1]} {getDay(item.date)}, {getYear(item.date)}
            </Text>
          </View>
        }
        left={() => (
          <View
            style={[
              styles.circle,
              {
                backgroundColor: categories?.get(item.category),
              },
            ]}
          />
        )}
        right={() => (
          <View style={{ alignSelf: 'center' }}>
            <Text />
            <Text style={styles.price}>
              {negative}${item.price || item.amount} {item.currency.toUpperCase()}
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
          userCategories={Array.from(categories.keys())}
          type={type}
        />
      )}
    </>
  );
};

const TableComponent = ({ title, subTitle, list, type, categories }) => {
  const handleDelete = (id) => {
    axios
      .delete(`${URL}/${type === 'Expenses' ? 'expense' : 'income'}/${id}`)
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
  };

  const RightSwipeComponent = (id) => {
    return (
      <Pressable style={styles.swipeBackground} onPress={() => handleDelete(id)}>
        <Text style={styles.swipeText}>Delete</Text>
      </Pressable>
    );
  };

  return (
    <List.Section style={styles.container}>
      <List.Subheader style={styles.header}>
        {MONTHS[title - 1]} {subTitle}
      </List.Subheader>
      {list.map((item, index) => (
        <Swipeable key={index} renderRightActions={() => RightSwipeComponent(item._id)}>
          <ListInputComponent item={item} type={type} categories={categories} />
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
    width: '100%',
  },
  header: {
    fontSize: 20,
    color: theme.colors.textLight,
    marginTop: -15,
    backgroundColor: theme.colors.primary,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.black,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    color: theme.colors.black,
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    color: theme.colors.black,
    justifyContent: 'space-evenly',
    marginTop: -10,
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
    marginHorizontal: 15,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderBottomWidth: 1,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
});
