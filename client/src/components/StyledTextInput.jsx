import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native';

export default ({ keyboardType, label, placeholder, onChange, required, noClear, ...rest }) => {
  const [value, setValue] = useState(null);
  const updateValue = (newVal) => {
    setValue(newVal);
    onChange(newVal);
  };

  return (
    <View style={styles.container}>
      {/* <ClickToClose/> */}
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
        placeholderTextColor="lightgrey"
        clearButtonMode={noClear ? 'never' : 'while-editing'}
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    color: '#24838F',
    fontSize: 14,
    marginBottom: 5,
  },
  text: {
    borderWidth: 0,
    shadowRadius: 0,
    borderBottomWidth: 1,
    borderColor: 'grey',
    width: Dimensions.get('window').width * 0.8,
    paddingBottom: 2,
    color: '#466868',
  },
});
