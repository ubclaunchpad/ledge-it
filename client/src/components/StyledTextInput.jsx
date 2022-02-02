import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export default ({
  keyboardType,
  label,
  placeholder,
  onChange,
  required,
  noClear,
  errorMsg,
  ...rest
}) => {
  const [value, setValue] = useState(null);
  const updateValue = (newVal) => {
    setValue(newVal);
    onChange(newVal);
  };

  return (
    <View style={styles.container}>
      <>
        <Text style={styles.label}>
          {label}
          {required && '*'}
        </Text>
        <TextInput
          style={styles.text}
          onChangeText={updateValue}
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.lightgrey}
          clearButtonMode={noClear ? 'never' : 'while-editing'}
          {...rest}
        />
      </>
      {errorMsg && (
        <View>
          <Text style={styles.errorText}>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    display: 'flex',
  },
  label: {
    color: theme.colors.primary,
    fontSize: 14,
    marginBottom: -15,
    zIndex: 10,
  },
  text: {
    borderWidth: 0,
    shadowRadius: 0,
    borderBottomWidth: 1,
    borderColor: theme.colors.primaryDark,
    paddingBottom: 5,
    color: theme.colors.textDark,
    paddingTop: 20,
  },
  errorText: {
    display: 'flex',
    alignSelf: 'flex-end',
    top: 5,
    color: 'orangered',
    position: 'absolute',
  },
});
