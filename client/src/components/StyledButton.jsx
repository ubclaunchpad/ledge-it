import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-paper';
import { theme } from '../../theme';
import { Entypo } from '@expo/vector-icons';

export default ({ label, onTap, customStyles, iconName, iconSize, iconColor, activeOpacity }) => {
  const styles = customStyles || defaultStyles;
  return (
    <View
      style={styles.pressable}>
      <TouchableHighlight
        activeOpacity={activeOpacity || 0.65}
        underlayColor={theme.colors.white}
        onPress={onTap}>
        <View style={styles.background}>
          <Text style={styles.text}>{label}</Text>
          {iconName && <Entypo name={iconName} size={iconSize || 20} color={iconColor || theme.colors.white} />}
        </View>
      </TouchableHighlight>
    </View>
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
