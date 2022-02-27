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
  isLight,
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
        <Text
          style={[
            styles.label,
            { color: isLight ? theme.colors.textLight : theme.colors.primary },
          ]}>
          {label}
          {required && '*'}
        </Text>
        <TextInput
          style={[
            styles.text,
            {
              borderColor: isLight ? theme.colors.greyBackground : theme.colors.primaryDark,
              color: isLight ? theme.colors.textLight : theme.colors.textDark,
            },
          ]}
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
    fontSize: 14,
    marginBottom: -15,
    zIndex: 10,
  },
  text: {
    borderWidth: 0,
    shadowRadius: 0,
    borderBottomWidth: 1,
    paddingBottom: 5,
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
