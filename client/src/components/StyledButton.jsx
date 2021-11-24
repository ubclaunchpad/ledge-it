import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({ label, onTap }) => {
  return (
    <View style={styles.bkgrd}>
      <Text style={styles.text} onPress={onTap}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bkgrd: {
    backgroundColor: '#24838F',
    padding: 10,
    width: 70,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    shadowRadius: 10,
    shadowOpacity: 0.4,
  },
  text: {
    color: 'white',
  },
});
