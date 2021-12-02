import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import StyledButton from '../components/StyledButton';
import StyledTextInput from '../components/StyledTextInput';
import StyledSelect from '../components/StyledSelect';
import CustomModal from '../components/CustomModal';
import AmountBox from '../components/AmountBox';
import { theme } from '../../theme';

//same as incomeSummary and expenseSummary, takes in type to decide what labels to print
const ItemSummary = ({ modalVisible, setModalVisible, data, userCategories, type }) => {
  const [item, setItem] = useState(data.price);
  const [name, setName] = useState(data.name);
  const [date, setDate] = useState(data.date);
  const [category, setCategory] = useState(data.category);
  const [tag, setTag] = useState(data.sub_category);
  const [description, setDescription] = useState(data.description);
  const [location, setLocation] = useState(data.location);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  const labelName = type === "Expenses" ? "Price" : "Amount"
  const labelTitle = type === "Expenses" ? "Expense" : "Income"

  const makeReadableDate = (preProcessedDate) => {
    return `${
      preProcessedDate.getMonth() + 1
    }/${preProcessedDate.getDate()}/${preProcessedDate.getFullYear()}`;
  };

  const onSave = () => {
    const updateObject = {
      item,
      name,
      description,
      date,
      category,
      sub_category: tag,
      location,
    };
    console.log(updateObject);
    console.log(data);

    setModalVisible(false);
  };

  return (
    <CustomModal isModalVisible={modalVisible} setModalVisible={setModalVisible}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.title}>{labelTitle} Summary</Text>
          <AmountBox
            fields={[
              item || 0.0,
              name,
              description,
              makeReadableDate(date),
              category || '',
              tag,
              location,
            ]}
          />
          <StyledTextInput
            label={labelName}
            onChange={(newVal) => setItem(newVal)}
            keyboardType="numeric"
            value={item.toString()}
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
            placeholder={data.category}
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

export default ItemSummary;
