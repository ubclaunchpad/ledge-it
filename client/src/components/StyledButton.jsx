import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import theme from '../../theme';

export default ({
  label,
  onTap,
  customStyles,
  iconName,
  iconSize,
  iconColor,
  activeOpacity,
  underlayColor,
  backgroundStyle,
  textStyle,
  ...rest
}) => {
  const styles = customStyles || defaultStyles;
  return (
    <View style={styles.pressable}>
      <TouchableHighlight
        activeOpacity={activeOpacity || 0.65}
        T
        underlayColor={underlayColor || theme.colors.white}
        onPress={onTap}
        style={backgroundStyle || styles.background}
        {...rest}>
        <View>
          <Text style={textStyle || styles.text}>{label}</Text>
          {iconName && (
            <Entypo name={iconName} size={iconSize || 20} color={iconColor || theme.colors.white} />
          )}
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
  highlightStyle: {},
});
