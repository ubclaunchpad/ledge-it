import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import StyledButton from '../components/StyledButton';
import StyledTextInput from '../components/StyledTextInput';
import StyledSelect from '../components/StyledSelect';
import CustomModal from '../components/CustomModal';
import AmountBox from '../components/AmountBox';
import { theme } from '../../theme';

const ExpenseSummaryModal = ({ modalVisible, setModalVisible, expenseData, userCategories }) => {
  const [price, setPrice] = useState(expenseData.price);
  const [name, setName] = useState(expenseData.name);
  const [date, setDate] = useState(expenseData.date);
  const [category, setCategory] = useState(expenseData.category);
  const [tag, setTag] = useState(expenseData.sub_category);
  const [description, setDescription] = useState(expenseData.description);
  const [location, setLocation] = useState(expenseData.location);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  const makeReadableDate = (preProcessedDate) => {
    return `${
      preProcessedDate.getMonth() + 1
    }/${preProcessedDate.getDate()}/${preProcessedDate.getFullYear()}`;
  };

  const onSave = () => {
    const updateObject = {
      price,
      name,
      description,
      date,
      category,
      sub_category: tag,
      location,
    };
    console.log(updateObject);

    setModalVisible(false);
  };

  return (
    <CustomModal isModalVisible={modalVisible} setModalVisible={setModalVisible}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>Expense Summary</Text>
          <AmountBox
            fields={[
              price || 0.0,
              name,
              description,
              makeReadableDate(date),
              category || '',
              tag,
              location,
            ]}
          />
          <StyledTextInput
            label="Price"
            onChange={(newVal) => setPrice(newVal)}
            keyboardType="numeric"
            value={price.toString()}
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
            value={makeReadableDate(date)}
            required
          />
          <StyledSelect
            label="Category"
            categories={userCategories.map((cat, index) => {
              return {
                label: cat,
                value: cat,
                key: index,
              };
            })}
            category={category}
            setCategory={setCategory}
            categoryDropdownVisible={categoryDropdownVisible}
            setCategoryDropdownVisible={setCategoryDropdownVisible}
            placeholder={expenseData.category}
            required
          />
          <StyledTextInput
            onChange={setTag}
            keyboardType="default"
            label="Tag"
            placeholder="Optional..."
          />
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
              marginTop: 20,
            }}>
            <View style={styles.button}>
              <StyledButton label="Cancel" onTap={() => setModalVisible(false)} />
            </View>
            <View style={styles.button}>
              <StyledButton label="Save" onTap={() => onSave()} />
            </View>
          </View>
        </View>
      </ScrollView>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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

export default ExpenseSummaryModal;
