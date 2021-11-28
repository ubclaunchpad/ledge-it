import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const AddExpense = () => {
  const currency = 'CAD';
  const [amount, setAmount] = useState(undefined);
  const [merchant, setMerchant] = useState(undefined);
  const [date, setDate] = useState(getCurrentDate());
  const [category, setCategory] = useState(undefined);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [tag, setTag] = useState(undefined);
  const [description, setDesc] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  const submitExpense = async () => {
    console.log({
      name: merchant,
      description,
      date: date ? date.replace('.', '-').replace('.', '-') : undefined,
      price: amount,
      currency,
      exchange_rate: 0,
      location,
      category,
      sub_category: tag,
    });
  };

  return (
    <View style={styles.centeredView}>
      <AmountBox
        fields={[amount || 0.0, merchant, date, category || '', tag, description, location]}
      />
      <View style={styles.form}>
        <StyledTextInput
          onChange={setAmount}
          keyboardType="numeric"
          label="Amount"
          placeholder="$$$"
          required
        />
        <StyledTextInput
          onChange={setMerchant}
          keyboardType="default"
          label="Merchant"
          placeholder="Amazon"
          required
        />
        <StyledTextInput
          onChange={setDate}
          keyboardType="default"
          label="Date"
          placeholder="DD/MM/YYYY"
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
          placeholder="optional..."
        />
        <StyledTextInput
          onChange={setDesc}
          keyboardType="default"
          label="Description"
          placeholder="optional..."
          multiline
        />
        <StyledTextInput
          onChange={setLocation}
          keyboardType="default"
          label="Location"
          placeholder="optional..."
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
