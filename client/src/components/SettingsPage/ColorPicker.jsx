import React from 'react';
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
import theme from '../../../theme';
import StyledButton from '../StyledButton';
import axios from '../../providers/axios';

const ColorPicker = ({
  colorPickerToggle,
  setColorPickerToggle,
  expenseToggle,
  currentCategoryName,
}) => {
  const URL = process.env.SERVER_URL;

  const colors = [
    ['Default', '#A5A7EA'],
    ['Red', '#EF857D'],
    ['Orange', '#EEC26C'],
    ['Blue', '#92CEEF'],
    ['Yellow', '#E1F17F'],
    ['Green', '#A2D181'],
    ['Purple', '#CBA1E6'],
    ['Pink', '#EDB2C7'],
    ['Grey', '#919191'],
  ];

  const changeExpenseCategoryColor = (newCategoryColorHexCode) => {
    return axios.put(
      `${URL}/expense_categories/change_color`,
      {},
      {
        params: {
          category_name: currentCategoryName,
          category_color: newCategoryColorHexCode,
        },
      },
    );
  };

  const changeIncomeCategoryColor = (newCategoryColorHexCode) => {
    return axios.put(
      `${URL}/income_categories/change_color`,
      {},
      {
        params: {
          category_name: currentCategoryName,
          category_color: newCategoryColorHexCode,
        },
      },
    );
  };

  const changeCategoryColor = async (colorHexCode) => {
    if (expenseToggle) {
      await changeExpenseCategoryColor(colorHexCode);
    } else {
      await changeIncomeCategoryColor(colorHexCode);
    }
    setColorPickerToggle(false);
  };

  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={colorPickerToggle}
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
            onTap={() => setColorPickerToggle(false)}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Categories</Text>
        </View>
        <ScrollView style={styles.content}>
          {colors.map((color) => {
            return (
              <Pressable key={color} onPress={() => changeCategoryColor(color[1])}>
                <View style={styles.setSettingOptions}>
                  <Text style={styles.optionText}>{color[0]}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        backgroundColor: color[1],
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
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default ColorPicker;
