import React, { useState } from 'react';
import { StyleSheet, Pressable, View, ScrollView, Text } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import StyledButton from '../components/StyledButton';
import StyledTextInput from '../components/StyledTextInput';
import StyledSelect from '../components/StyledSelect';

const ExpenseSummaryModal = ({ modalVisible, setModalVisible, expenseData, userCategories }) => {
  const [price, setPrice] = useState(expenseData.price);
  const [name, setName] = useState(expenseData.name);
  const [date, setDate] = useState(expenseData.date);
  const [newCategory, setNewCategory] = useState(expenseData.category);
  const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

  const makeReadableDate = (preProcessedDate) => {
    return `${preProcessedDate.getMonth()}/${preProcessedDate.getDate()}/${preProcessedDate.getFullYear()}`;
  };

  const checkForChangingData = () => {
    const updateObject = {};
    if (price !== expenseData.price) {
      updateObject.price = price;
    }
    if (name !== expenseData.name) {
      updateObject.name = name;
    }
    if (date !== expenseData.date) {
      updateObject.date = date;
    }
    if (newCategory !== expenseData.category) {
      updateObject.category = newCategory;
    }
    console.log(updateObject);
  };

  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onRequestClose={() => {
        setModalVisible(false);
      }}
      style={styles.modal}>
      <View style={styles.m10}>
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
          <Ionicons name="close-circle-outline" color="black" size={35} />
        </Pressable>
        <ScrollView>
          <View style={styles.content}>
            <Text
              style={{ textAlign: 'center', fontSize: 24, marginBottom: 25, fontWeight: 'bold' }}>
              Expense Summary
            </Text>
            <StyledTextInput
              label="Price"
              onChange={(newVal) => setPrice(newVal)}
              keyboardType="decimal-pad"
              value={price.toString()}
            />
            <StyledTextInput
              label="Name"
              onChange={(newVal) => setName(newVal)}
              keyboardType="default"
              value={name}
            />
            <StyledTextInput
              label="Date"
              onChange={(newVal) => setDate(newVal)}
              keyboardType="default"
              value={makeReadableDate(date)}
            />
            <StyledSelect
              label="Category"
              categories={userCategories
                .filter((cat) => cat !== expenseData.category)
                .map((cat, index) => {
                  return {
                    label: cat,
                    value: cat,
                    key: index,
                  };
                })}
              category={newCategory}
              setCategory={setNewCategory}
              categoryDropdownVisible={categoryDropdownVisible}
              setCategoryDropdownVisible={setCategoryDropdownVisible}
              placeholder={expenseData.category}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                margin: 50,
                marginTop: 80,
              }}>
              <StyledButton
                label="Save"
                onTap={() => {
                  setModalVisible(false);
                  checkForChangingData();
                }}
              />
              <StyledButton
                label="Cancel"
                onTap={() => {
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    marginTop: 120,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    display: 'flex',
    margin: '2%',
    alignSelf: 'flex-start',
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: '10%',
  },
  m10: {
    margin: 10,
  },
});

export default ExpenseSummaryModal;
