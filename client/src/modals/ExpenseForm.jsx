import React, { useState } from 'react';
import { Dimensions, StyleSheet, View, ScrollView, Text } from 'react-native';
import axios from 'axios';
import AmountBox from '../components/AmountBox';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import StyledSelect from '../components/StyledSelect';
import { formatDateBE } from '../utils/formatters';
import { theme } from '../../theme';

const categories = [
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Housing', value: 'Housing' },
  { label: 'Restaurants', value: 'Restaurants' },
];

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const AddExpense = ({ setModalVisible }) => {
  const currency = 'CAD';
  const [price, setPrice] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [date, setDate] = useState(getCurrentDate());
  const [category, setCategory] = useState(undefined);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [tag, setTag] = useState(undefined);
  const [description, setDesc] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  const submitExpense = async () => {
    axios
      .post(
        'https://money-manager-dev.herokuapp.com/expense/',
        JSON.stringify({
          name,
          description,
          date: formatDateBE(date),
          price,
          currency,
          exchange_rate: 0,
          location,
          category,
          sub_category: tag,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
    setModalVisible(false);
  };

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Add Expense</Text>
      <AmountBox fields={[price || 0.0, name, description, date, category || '', tag, location]} />
      <StyledTextInput
        onChange={setPrice}
        keyboardType="numeric"
        label="Amount"
        placeholder="$$$"
        required
      />
      <StyledTextInput
        onChange={setName}
        keyboardType="default"
        label="Name"
        placeholder="Amazon"
        required
      />
      <StyledTextInput
        onChange={setDesc}
        keyboardType="default"
        label="Description"
        placeholder="Optional..."
        multiline
      />
      <StyledTextInput
        onChange={setDate}
        keyboardType="default"
        label="Date"
        placeholder="MM/DD/YYYY"
        defaultValue={getCurrentDate()}
        required
      />
      <StyledSelect
        label="Category"
        categories={categories}
        category={category}
        setCategory={setCategory}
        categoryDropdownVisible={categoryDropdownVisible}
        setCategoryDropdownVisible={setCategoryDropdownVisible}
        placeholder="Select a category"
        required
      />
      <StyledTextInput
        onChange={setTag}
        keyboardType="default"
        label="Tag"
        placeholder="Optional..."
      />
      <StyledTextInput
        onChange={setLocation}
        keyboardType="default"
        label="Location"
        placeholder="Optional..."
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <View style={styles.button}>
          <StyledButton label="Cancel" onTap={() => setModalVisible(false)} />
        </View>
        <View style={styles.button}>
          <StyledButton label="Add" onTap={submitExpense} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  button: {
    marginHorizontal: 20,
  },
});

export default AddExpense;
