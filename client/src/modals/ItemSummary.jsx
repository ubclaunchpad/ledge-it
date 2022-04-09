import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import axios from '../providers/axios';
import StyledButton from '../components/StyledButton';
import StyledTextInput from '../components/StyledTextInput';
import StyledSelect from '../components/StyledSelect';
import CustomModal from '../components/CustomModal';
import AmountBox from '../components/AmountBox';
import theme from '../../theme';
import { formatDateBE, formatDateFE } from '../utils/formatters';

const URL = process.env.SERVER_URL;

const ItemSummary = ({ modalVisible, setModalVisible, item, userCategories, type }) => {
  const [price, setPrice] = useState(item.price || item.amount);
  const [name, setName] = useState(item.name);
  const [date, setDate] = useState(item.date);
  const [category, setCategory] = useState(item.category);
  const [, setTag] = useState(item.sub_category);
  const [description, setDescription] = useState(item.description);
  const [location, setLocation] = useState(item.location);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
  const [base64Image, setBase64Image] = useState('');

  const onUpdate = () => {
    axios
      .put(`${URL}/${type === 'Expenses' ? 'expense' : 'income'}/${item._id}`, {
        name,
        description,
        date: formatDateBE(date),
        [type === 'Expenses' ? 'price' : 'amount']: price,
        location,
        category,
        ...(base64Image === '' ? {} : { base64_image: base64Image }),
      })
      .then(({ data }) => console.log(data))
      .catch((err) => console.log(err));
    setModalVisible(false);
  };

  return (
    <CustomModal isModalVisible={modalVisible} setModalVisible={setModalVisible}>
      <View style={styles.content}>
        <Text style={styles.title}>{type === 'Expenses' ? 'Expense' : 'Income'} Summary</Text>
        <AmountBox
          date={date}
          name={name}
          category={category}
          amount={Number(price || 0) * -1}
          type={type === 'Expenses' ? 'Expense' : 'Income'}
          setb64={setBase64Image}
          rounded
        />
        <StyledTextInput
          label={type === 'Expenses' ? 'Price' : 'Amount'}
          onChange={(newVal) => setPrice(newVal)}
          keyboardType="numeric"
          value={String(price)}
          required
        />
        <StyledTextInput
          label="Name"
          onChange={(newVal) => setName(newVal)}
          keyboardType="default"
          value={name}
          required
        />
        <StyledTextInput
          onChange={(newVal) => setDescription(newVal)}
          keyboardType="default"
          label="Description"
          placeholder="Optional..."
          value={description}
          multiline
        />
        <StyledTextInput
          label="Date"
          onChange={(newVal) => setDate(newVal)}
          keyboardType="default"
          value={formatDateFE(date)}
          required
        />
        <StyledSelect
          label="Category"
          options={userCategories.map((cat, index) => {
            return {
              label: cat,
              value: cat,
              key: index,
            };
          })}
          selected={category}
          setSelected={setCategory}
          dropdownVisible={categoryDropdownVisible}
          setDropdownVisible={setCategoryDropdownVisible}
          placeholder={item.category}
          required
        />
        {type === 'Expenses' && (
          <StyledTextInput
            onChange={setTag}
            keyboardType="default"
            label="Tag"
            placeholder="Optional..."
          />
        )}
        <StyledTextInput
          onChange={(newVal) => setLocation(newVal)}
          keyboardType="default"
          label="Location"
          placeholder="Optional..."
          value={location}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          {base64Image !== '' && (
            <Image
              style={{ width: 85, height: 85, borderRadius: 15, marginHorizontal: 20 }}
              source={{ uri: base64Image }}
            />
          )}
          <View style={styles.button}>
            <StyledButton label="Cancel" onTap={() => setModalVisible(false)} />
          </View>
          <View style={styles.button}>
            <StyledButton label="Save" onTap={() => onUpdate()} />
          </View>
        </View>
      </View>
    </CustomModal>
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

export default ItemSummary;
