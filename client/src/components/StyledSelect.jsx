import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';

const StyledSelect = ({
  label,
  required,
  dropdownVisible,
  setDropdownVisible,
  selected,
  setSelected,
  options,
  placeholder,
  type, // 'line, box'
  primaryColor,
  secondaryColor,
}) => {
  const styles = type === 'box' ? boxStyles : lineStyles;
  const textStyle =
    type === 'box' ? (dropdownVisible ? styles.text : styles.placeholder) : styles.text;
  return (
    <>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && '*'}
        </Text>
      )}
      <DropDownPicker
        style={[styles.choiceSelect, { border: 'none' }]}
        open={dropdownVisible}
        value={selected}
        items={options}
        setOpen={setDropdownVisible}
        setValue={setSelected}
        placeholder={placeholder}
        placeholderStyle={styles.placeholder}
        textStyle={textStyle}
        dropDownContainerStyle={styles.dropDown}
        containerStyle={styles.container}
      />
    </>
  );
};

const lineStyles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: -8,
    color: '#24838F',
  },
  choiceSelect: {
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

const boxStyles = StyleSheet.create({
  choiceSelect: {
    backgroundColor: 'rgba(36, 131, 143, 1)',
    borderWidth: 0,
    borderRadius: 20,
    color: 'white',
    width: 110,
  },
  placeholder: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
  },
  containerStyle: {
    backgroundColor: 'rgba(36, 131, 143, 1)',
  },
  dropDown: {
    borderColor: '#24838F',
    width: 110,
    zIndex: 1010010100,
    color: '#466868',
  },
  text: {
    fontWeight: '500',
    color: '#24838F',
  },
});

export default StyledSelect;
