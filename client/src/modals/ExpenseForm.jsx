import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useExpense from '../hooks/useExpense';
import AmountBox from '../components/AmountBox';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import StyledSelect from '../components/StyledSelect';
import ToggleButtons from '../components/ToggleButtons';

const categories = [
  { value: 'Housing', label: 'Housing' },
  { value: 'Food', label: 'Food' },
  { value: 'Transport', label: 'Transport' },
  { value: 'Clothes', label: 'Clothes' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Other', label: 'Other' },
];

/**
 * Return today's date in the format of DD/MM/YYYY.
 *
 * NOTE: JavaScript month's are from [0 = January, 11 = December], so we add 1 to get "expected" values [1 = January, 12 = December].
 */
const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const AddExpense = ({ setModalVisible, setExpenseModalVisible, type, setType }) => {
  const { addExpense } = useExpense();

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
    addExpense({ name, description, date, price, currency, location, category, tag });
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
        placeholder="DD/MM/YYYY"
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
