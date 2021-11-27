import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';

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
    color: '#24838F',
  },
  categorySelect: {
    width: Dimensions.get('window').width - 80,
    height: 40,
    borderColor: '#24838F',
    color: '#24838F',
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    alignSelf: 'center',
    marginBottom: 10,
  },
  text: {
    color: '#466868',
    marginLeft: -6,
    marginBottom: -15,
  },
  dropDown: {
    borderColor: '#24838F',
  },
  container: {
    marginTop: -5,
    paddingTop: 0,
  },
  placeholder: { color: 'lightgrey' },
});

export default StyledSelect;
