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
        placeholder="Select a category"
        placeholderStyle={styles.placeholder}
        textStyle={styles.text}
        dropDownContainerStyle={styles.dropDown}
        containerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: -8,
    color: theme.colors.primary,
  },
  categorySelect: {
    width: Dimensions.get('window').width - 75,
    height: 40,
    borderColor: theme.colors.primaryDark,
    color: theme.colors.primary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  text: {
    color: theme.colors.textDark,
    marginLeft: -6,
    marginBottom: -15,
  },
  dropDown: {
    borderColor: theme.colors.primaryDark,
    width: Dimensions.get('window').width - 75,
  },
  container: {
    marginTop: -5,
    paddingTop: 0,
  },
  placeholder: { color: theme.colors.lightgrey },
});

export default StyledSelect;
