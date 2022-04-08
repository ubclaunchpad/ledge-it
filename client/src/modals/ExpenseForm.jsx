import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from '../providers/axios';
import AmountBox from '../components/AmountBox';
import StyledTextInput from '../components/StyledTextInput';
import StyledButton from '../components/StyledButton';
import StyledSelect from '../components/StyledSelect';
import { formatDateBE } from '../utils/formatters';
import ImagePreview from './ImagePreview';
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
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
  const [base64Image, setBase64Image] = useState('');

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
        ...(base64Image === '' ? {} : { base64_image: base64Image }),
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
        currb64img={base64Image}
        setb64={setBase64Image}
        setImgModal={setImagePreviewVisible}
      />
      <ToggleButtons type={type} setType={setType} />
      <StyledTextInput
        onChange={setPrice}
        keyboardType="numeric"
        label="Amount"
        placeholder="$$$"
        required
        icon={<FontAwesome5 name="coins" size={32} color="white" />}
      />
      <StyledTextInput
        onChange={setDate}
        keyboardType="default"
        label="Date"
        placeholder="MM/DD/YYYY"
        defaultValue={getCurrentDate()}
        required
        icon={<FontAwesome5 name="calendar-alt" size={32} color="white" />}
      />
      <StyledTextInput
        onChange={setName}
        keyboardType="default"
        label="Name"
        placeholder="Ex.Amazon"
        required
        icon={<FontAwesome5 name="shopping-basket" size={32} color="white" />}
      />
      <StyledSelect
        label="Category"
        options={categories}
        selected={category}
        setSelected={setCategory}
        dropdownVisible={categoryDropdownVisible}
        setDropdownVisible={setCategoryDropdownVisible}
        placeholder="Select"
        required
        icon={<FontAwesome5 name="tag" size={32} color="white" />}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <View style={styles.button}>
          <StyledButton label="Cancel" onTap={() => setExpenseModalVisible(false)} />
        </View>

        <View style={styles.button}>
          <StyledButton label="Add" onTap={submitExpense} />
        </View>
      </View>

      <ImagePreview
        isModalVisible={imagePreviewVisible}
        setModalVisible={setImagePreviewVisible}
        b64Img={base64Image}
        setb64img={setBase64Image}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 20,
  },
});

export default AddExpense;
