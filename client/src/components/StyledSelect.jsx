import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import { theme } from '../../theme';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

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
        ArrowUpIconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronUp}
            color={type === 'box' ? theme.colors.white : theme.colors.primary}
            size={type === 'box' ? 15 : 12}
          />
        )}
        ArrowDownIconComponent={() => (
          <FontAwesomeIcon
            icon={faChevronDown}
            color={type === 'box' ? theme.colors.white : theme.colors.primary}
            size={type === 'box' ? 15 : 12}
          />
        )}
        listMode="SCROLLVIEW"
      />
    </>
  );
};

const lineStyles = StyleSheet.create({
  label: {
    alignSelf: 'flex-start',
    margin: 10,
    marginBottom: 0,
    color: theme.colors.primary,
  },
  choiceSelect: {
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

const boxStyles = StyleSheet.create({
  choiceSelect: {
    backgroundColor: theme.colors.primary,
    borderWidth: 0,
    borderRadius: 20,
    color: theme.colors.white,
    width: 120,
  },
  placeholder: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: '500',
  },
  containerStyle: {
    backgroundColor: theme.colors.primary,
  },
  dropDown: {
    borderColor: theme.colors.primaryDark,
    borderWidth: 3,
    borderTopWidth: 0,
    width: 120,
  },
  text: {
    fontWeight: '500',
    color: theme.colors.primary,
  },
});

export default StyledSelect;
