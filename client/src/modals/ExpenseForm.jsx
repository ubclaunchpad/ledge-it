import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import AmountBox from '../components/AmountBox';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import StyledSelect from '../components/StyledSelect';

const categories = [
  { label: 'Groceries', value: 'Groceries' },
  { label: 'Housing', value: 'Housing' },
  { label: 'Restaurants', value: 'Restaurants' },
];

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// "12/1/2021" -> "2021-01-12"
const parseDateForSend = (curDate) => {
  const dateList = curDate.split('/');
  const month = dateList[0].length === 1 ? `0${dateList[0]}` : dateList[0];
  const day = dateList[1].length === 1 ? `0${dateList[1]}` : dateList[1];
  const year = dateList[2];
  return `${year}-${day}-${month}`;
};

const AddExpense = () => {
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
          date: parseDateForSend(date),
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.centeredView}>
      <AmountBox fields={[price || 0.0, name, description, date, category || '', tag, location]} />
      <View style={styles.form}>
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
      </View>
      <StyledButton label="Add" onTap={submitExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 0,
    padding: 10,
  },
  form: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});

export default AddExpense;
