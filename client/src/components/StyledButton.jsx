import React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
=======
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
>>>>>>> 00f2ff029ce9602c0a7e75d78ac8bcbbf6a1d91a

export default ({ label, onTap, customStyles, icon }) => {
  const styles = customStyles || defaultStyles;
  return (
    <Pressable
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
        },
        styles.wrapperCustom,
      ]}
      onPress={onTap}>
      <View style={styles.background}>
        <Text style={styles.text}>{label}</Text>
        {icon && <Button color='#24838F' style={{marginRight: -30}} icon={icon}></Button>}
      </View>
    </Pressable>
  );
};

const defaultStyles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.primary,
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
    color: theme.colors.textLight,
    fontWeight: 'bold',
  },
});
