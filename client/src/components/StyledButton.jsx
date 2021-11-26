import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ({ label, onTap }) => {
  return (
    <View style={styles.background}>
      <Text style={styles.text} onPress={onTap}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#24838F',
    padding: 10,
    width: 70,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
