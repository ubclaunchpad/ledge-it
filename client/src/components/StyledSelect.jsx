import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';

const StyledSelect = ({
  label,
  required,
  categories,
  category,
  setCategory,
  categoryDropdownVisible,
  setCategoryDropdownVisible,
  placeholder,
}) => {
  return (
    <>
      <Text style={styles.label}>
        {label}
        {required && '*'}
      </Text>
      <DropDownPicker
        style={[styles.categorySelect, { border: 'none' }]}
        open={categoryDropdownVisible}
        value={category}
        items={categories}
        setOpen={setCategoryDropdownVisible}
        setValue={setCategory}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder}
        textStyle={styles.text}
        dropDownContainerStyle={styles.dropDown}
        containerStyle={styles.container}
        listMode="SCROLLVIEW"
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    margin: 10,
    marginBottom: 0,
    color: theme.colors.primary,
  },
  categorySelect: {
    height: 40,
    borderColor: theme.colors.primaryDark,
    color: theme.colors.primary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignSelf: 'center',
  },
  text: {
    color: theme.colors.textDark,
    marginLeft: -10,
    marginBottom: -15,
  },
  dropDown: {
    borderColor: theme.colors.primaryDark,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 100,
  },
  container: {
    marginTop: -10,
    margin: 10,
    width: Dimensions.get('window').width - 80,
  },
  placeholder: { color: theme.colors.lightgrey },
});

export default StyledSelect;
