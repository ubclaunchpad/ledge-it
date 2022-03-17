import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import axios from '../providers/axios';
import AmountBox from '../components/AmountBox';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import StyledSelect from '../components/StyledSelect';
import { formatDateBE } from '../utils/formatters';
import ToggleButtons from '../components/ToggleButtons';

const URL = process.env.SERVER_URL;

const categories = [
  { value: 'Housing', label: 'Housing' },
  { value: 'Food', label: 'Food' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Clothes', label: 'Clothes' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Other', label: 'Other' },
];

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const AddExpense = ({ setModalVisible, setExpenseModalVisible, type, setType }) => {
  const currency = 'CAD';
  const [price, setPrice] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [date, setDate] = useState(getCurrentDate());
  const [category, setCategory] = useState(undefined);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [tag, setTag] = useState(undefined);
  const [description, setDesc] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [b64img, setb64img] = useState('');

  const submitExpense = async () => {
    axios
      .post(`${URL}/expense`, {
        name,
        description,
        date: formatDateBE(date),
        price,
        currency,
        exchange_rate: 0,
        location,
        category,
        sub_category: tag,
      })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
    setExpenseModalVisible(false);
    setModalVisible(false);
  };

  return (
    <>
      <AmountBox
        date={date}
        name={name}
        category={category}
        amount={Number(price || 0) * -1}
        type="Expense"
        setb64={(b64) => setb64img(b64)}
      />
      <ToggleButtons type={type} setType={setType} />
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
        options={categories}
        selected={category}
        setSelected={setCategory}
        dropdownVisible={categoryDropdownVisible}
        setDropdownVisible={setCategoryDropdownVisible}
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
          <StyledButton label="Cancel" onTap={() => setExpenseModalVisible(false)} />
        </View>
        <View style={styles.button}>
          <StyledButton label="Add" onTap={submitExpense} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
  },
});

export default AddExpense;
