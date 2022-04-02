import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';
import { View, Dimensions, StyleSheet, Text } from 'react-native';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import theme from '../../theme';

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
  icon,
}) => {
  const styles = type === 'box' ? boxStyles : lineStyles;
  const textStyle =
    type === 'box' ? (dropdownVisible ? styles.text : styles.placeholder) : styles.text;
  return (
    <View style={styles.commonContainer}>
      <>
        <View style={styles.title}>
          <View style={styles.icon}>{icon}</View>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
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
    </View>
  );
};

const lineStyles = StyleSheet.create({
  commonContainer: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primaryLightBackground,
    opacity: 15,
    borderRadius: 10,
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 18,
    paddingHorizontal: 25,
  },
  icon: {
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    width: 45,
    height: 45,
    padding: 5,
    borderRadius: 10,
  },
  label: {
    alignSelf: 'flex-start',
    margin: 10,
    marginBottom: 0,
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  choiceSelect: {
    height: 40,
    borderColor: theme.colors.primaryDark,
    color: theme.colors.primary,
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    alignSelf: 'center',
    marginTop: 30,
    marginRight: 40,
  },
  text: {
    color: theme.colors.textDark,
    textAlign: 'right',
  },
  dropDown: {
    borderColor: theme.colors.primaryDark,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 10,
    left: -20,
  },
  container: {
    marginTop: -10,
    margin: 10,
    width: Dimensions.get('window').width * 0.35,
    alignItems: 'flex-end',
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
