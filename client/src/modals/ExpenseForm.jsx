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
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
    console.log({
      name,
      description,
      date: date ? date.replaceAll('/', '-') : undefined,
      price,
      currency,
      exchange_rate: 0,
      location,
      category,
      sub_category: tag,
    });
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
