import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button, TextInput } from 'react-native-paper';
import theme from '../../../theme';
import StyledButton from '../StyledButton';
import axios from '../../providers/axios';

const AddCategories = ({ isAddCategoryOpen, setIsAddCategoryOpen }) => {
  const [categories, setCategories] = useState([]);
  const [expenseToggle, setExpenseToggle] = useState(true);
  const [newCategoryText, setNewCategoryText] = useState('');
  const [refreshToggle, setRefreshToggle] = useState(false);

  const URL = process.env.SERVER_URL;

  const addExpenseCategory = (categoryName, categoryColor) => {
    if (categories.length < 10) {
      return axios.put(
        `${URL}/expense_categories`,
        {},
        {
          params: {
            category_name: categoryName,
            category_color: categoryColor,
          },
        },
      );
    } else {
      console.log("There is a maximum of 10 expense categories.");
    }
  };

  const addIncomeCategory = (categoryName, categoryColor) => {
    if (categories.length < 10) {
      return axios.put(
        `${URL}/income_categories`,
        {},
        {
          params: {
            category_name: categoryName,
            category_color: categoryColor,
          },
        },
      );
    } else {
      console.log("There is a maximum of 10 income categories.")
    }
  };

  const handleAdd = async () => {
    try {
      if (expenseToggle) {
        await addExpenseCategory(newCategoryText, '#A5A7EA');
      } else {
        await addIncomeCategory(newCategoryText, '#A5A7EA');
      }
    } catch (error) {
      console.log('Error occured: There is a maximum of 10 categories.');
    } finally {
      setNewCategoryText('');
      setRefreshToggle(!refreshToggle);
    }
  };

  useEffect(() => {
    const getExpenseCategories = async () => {
      const response = await axios.get(`${process.env.SERVER_URL}/expense_categories`);
      const updatedCategories = response.data.map((obj) => ({ name: obj.name, color: obj.color }));
      setCategories(updatedCategories);
    };

    const getIncomeCategories = async () => {
      const response = await axios.get(`${process.env.SERVER_URL}/income_categories`);
      const updatedCategories = response.data.map((obj) => ({ name: obj.name, color: obj.color }));
      setCategories(updatedCategories);
    };

    if (expenseToggle) {
      getExpenseCategories();
    } else {
      getIncomeCategories();
    }
  }, [expenseToggle, refreshToggle]);

  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={isAddCategoryOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={1}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <StyledButton
            customStyles={{
              pressable: {
                position: 'absolute',
                left: 5,
                top: -10,
              },
              background: {
                padding: 20,
              },
            }}
            onTap={() => setIsAddCategoryOpen(false)}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Categories</Text>
        </View>
        <View style={styles.btnToggle}>
          <Button
            onPress={() => setExpenseToggle(true)}
            style={expenseToggle ? styles.onButton : styles.offButton}
            color={expenseToggle ? 'white' : theme.colors.primary}>
            Expenses
          </Button>
          <Button
            onPress={() => setExpenseToggle(false)}
            style={expenseToggle ? styles.offButton : styles.onButton}
            color={!expenseToggle ? 'white' : theme.colors.primary}>
            Income
          </Button>
        </View>
        <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            mode="flat"
            label={expenseToggle ? 'Add new expense category' : 'Add new income category'}
            value={newCategoryText}
            style={{ width: '80%' }}
            onChangeText={(text) => setNewCategoryText(text)}
          />
          <Button
            onPress={() => handleAdd()}
            color="white"
            style={{ backgroundColor: 'green', justifyContent: 'center', width: '20%' }}>
            Add
          </Button>
        </View>
        <ScrollView style={styles.content}>
          {categories.map((category) => {
            return (
              <Pressable key={category.name} onPress={() => {}}>
                <View style={styles.setSettingOptions}>
                  <Text style={styles.optionText}>{category.name}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: category.color,
                        borderRadius: 20,
                        width: 40,
                        height: 40,
                        marginRight: 20,
                      }}
                    />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        {}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  btnToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  content: {
    display: 'flex',
    marginTop: 10,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  offButton: {
    color: theme.colors.primary,
    backgroundColor: 'white',
    borderRadius: 20,
    width: 120,
    marginHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  onButton: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    width: 120,
    marginHorizontal: 15,
  },
  optionText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  setSettingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: theme.colors.primary,
  },
});

export default AddCategories;
