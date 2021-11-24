import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { black } from 'react-native-paper';

export default ({ label, onTap }) => {
  return (
    <View style={styles.bkgrd}>
      <Text style={{ color: 'white' }} onPress={onTap}>
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
});
