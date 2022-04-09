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
import { Button } from 'react-native-paper';
import { Swipeable } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import theme from '../../../theme';
import StyledButton from '../StyledButton';
import axios from '../../providers/axios';

const DeleteCategories = ({ isDeleteCategoryOpen, setIsDeleteCategoryOpen }) => {
  const [categories, setCategories] = useState([]);
  const [expenseToggle, setExpenseToggle] = useState(true);
  const [refreshToggle, setRefreshToggle] = useState(false);

  const URL = process.env.SERVER_URL;

  const deleteExpenseCategory = (categoryName) => {
    return axios.delete(`${URL}/expense_categories`, {
      params: {
        category_name: categoryName,
      },
    });
  };

  const deleteIncomeCategory = (categoryName) => {
    return axios.delete(`${URL}/income_categories`, {
      params: {
        category_name: categoryName,
      },
    });
  };

  const handleDelete = async (categoryName) => {
    if (expenseToggle) {
      await deleteExpenseCategory(categoryName);
    } else {
      await deleteIncomeCategory(categoryName);
    }
    setRefreshToggle(!refreshToggle);
  };

  const RightSwipeComponent = (categoryName) => {
    return (
      <Pressable style={styles.swipeBackground} onPress={() => handleDelete(categoryName)}>
        <Text style={styles.swipeText}>Delete</Text>
      </Pressable>
    );
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
      isVisible={isDeleteCategoryOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={1}
    >
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
            onTap={() => setIsDeleteCategoryOpen(false)}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Categories</Text>
        </View>
        <View style={styles.deleteCategoryTextStyles}>
          <Text>
            Deleting a category will make the category unavailabe for any future transactions. Every
            instance of the category will still remain in all transactions before it is deleted.
          </Text>
        </View>
        <View style={styles.btnToggle}>
          <Button
            onPress={() => setExpenseToggle(true)}
            style={expenseToggle ? styles.onButton : styles.offButton}
            color={expenseToggle ? 'white' : theme.colors.primary}
          >
            Expenses
          </Button>
          <Button
            onPress={() => setExpenseToggle(false)}
            style={expenseToggle ? styles.offButton : styles.onButton}
            color={!expenseToggle ? 'white' : theme.colors.primary}
          >
            Income
          </Button>
        </View>
        <ScrollView style={styles.content}>
          {categories.map((category) => {
            return (
              <Swipeable
                key={category.name}
                renderRightActions={() => RightSwipeComponent(category.name)}
              >
                <View style={styles.setSettingOptions}>
                  <Text style={styles.optionText}>{category.name}</Text>
                </View>
              </Swipeable>
            );
          })}
        </ScrollView>
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
  deleteCategoryTextStyles: {
    margin: 20,
    marginBottom: 30,
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
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  swipeBackground: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 15,
  },
  swipeText: {
    color: theme.colors.textLight,
    fontWeight: '600',
    padding: 20,
  },
  titleText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: theme.colors.primary,
  },
});

export default DeleteCategories;
