import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../../theme';

export default ({
  keyboardType,
  label,
  placeholder,
  onChange,
  required,
  noClear,
  errorMsg,
  isLight,
  icon,
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
        <View style={styles.title}>
          <View style={styles.icon}>{icon}</View>
          <Text
            style={[
              styles.label,
              { color: isLight ? theme.colors.textLight : theme.colors.primary },
            ]}>
            {label}
          </Text>
        </View>
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
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: -15,
    zIndex: 10,
    fontWeight: 'bold',
    paddingTop: 8,
  },
  text: {
    width: '50%',
    borderWidth: 0,
    shadowRadius: 0,
    paddingRight: 30,
    textAlign: 'right',
  },
  errorText: {
    display: 'flex',
    alignSelf: 'flex-end',
    top: 5,
    color: 'orangered',
    position: 'absolute',
  },
});
