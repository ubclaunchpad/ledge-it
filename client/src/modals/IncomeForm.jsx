import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AmountBox from '../components/AmountBox';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import StyledSelect from '../components/StyledSelect';

const categories = [
  { label: 'Salary', value: 'Salary' },
  { label: 'Other income', value: 'Other income' },
];

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const AddIncome = () => {
  const currency = 'CAD';
  const [amount, setAmount] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [date, setDate] = useState(getCurrentDate());
  const [category, setCategory] = useState(undefined);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [description, setDesc] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  const submitIncome = async () => {
    console.log({
      name,
      description,
      date: date ? date.replace('.', '-').replace('.', '-') : undefined,
      amount,
      currency,
      exchange_rate: 0,
      location,
      category,
    });
  };

  return (
    <View style={styles.centeredView}>
      <AmountBox fields={[amount || 0.0, date, category || '', description, location]} />
      <View style={styles.form}>
        <StyledTextInput
          onChange={setAmount}
          keyboardType="numeric"
          label="Amount"
          placeholder="$$$"
          required
        />
        <StyledTextInput
          onChange={setName}
          keyboardType="default"
          label="Income Source"
          placeholder="Salary"
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
          required
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
      <StyledButton label="Add" onTap={submitIncome} />
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

export default AddIncome;
