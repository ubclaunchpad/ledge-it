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
import { FontAwesome } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import theme from '../../../theme';
import StyledButton from '../StyledButton';
import ColorPicker from './ColorPicker';
import axios from '../../providers/axios';

const ChangeCategoryColors = ({ isChangeColorsOpen, setIsChangeColorsOpen }) => {
  const [categories, setCategories] = useState([]);
  const [expenseToggle, setExpenseToggle] = useState(true);
  const [colorPickerToggle, setColorPickerToggle] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] = useState(false);

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
  }, [expenseToggle, colorPickerToggle]);

  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={isChangeColorsOpen}
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
            onTap={() => setIsChangeColorsOpen(false)}
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
              <Pressable
                key={category.name}
                onPress={() => {
                  setColorPickerToggle(true);
                  setCurrentCategoryName(category.name);
                }}
              >
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
                    <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />
                  </View>
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
        {colorPickerToggle && (
          <ColorPicker
            colorPickerToggle={colorPickerToggle}
            setColorPickerToggle={setColorPickerToggle}
            expenseToggle={expenseToggle}
            currentCategoryName={currentCategoryName}
          />
        )}
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

export default ChangeCategoryColors;
