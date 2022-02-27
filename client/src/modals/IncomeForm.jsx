import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from '../providers/axios';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import StyledSelect from '../components/StyledSelect';
import { formatDateBE } from '../utils/formatters';
import AmountBox from '../components/AmountBox';
import ToggleButtons from '../components/ToggleButtons';

const URL = process.env.SERVER_URL;

const categories = [
  { label: 'Salary', value: 'Salary' },
  { label: 'Investments', value: 'Investments' },
  { label: 'Business', value: 'Business' },
  { label: 'Other', value: 'Other' },
];

const getCurrentDate = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const AddIncome = ({ setModalVisible, setIncomeModalVisible, type, setType }) => {
  const currency = 'CAD';
  const [amount, setAmount] = useState(undefined);
  const [name, setName] = useState(undefined);
  const [date, setDate] = useState(getCurrentDate());
  const [category, setCategory] = useState(undefined);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [description, setDesc] = useState(undefined);
  const [location, setLocation] = useState(undefined);

  const submitIncome = async () => {
    axios
      .post(
        `${URL}/income`,
        JSON.stringify({
          name,
          description,
          date: formatDateBE(date),
          amount,
          currency,
          exchange_rate: 0,
          location,
          category,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
    setIncomeModalVisible(false);
    setModalVisible(false);
  };

  return (
    <>
      <AmountBox date={date} name={name} category={category} amount={amount} />
      <ToggleButtons type={type} setType={setType} />
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
          <StyledButton label="Cancel" onTap={() => setIncomeModalVisible(false)} />
        </View>
        <View style={styles.button}>
          <StyledButton label="Add" onTap={submitIncome} />
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

export default AddIncome;
