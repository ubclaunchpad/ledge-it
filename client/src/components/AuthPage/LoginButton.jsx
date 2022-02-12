import React from 'react';
import { StyleSheet } from 'react-native';
import StyledButton from '../StyledButton';
import { theme } from '../../../theme';

export default ({ onPress }) => {
  return <StyledButton label="Login" onTap={onPress} customStyles={styles} />;
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    width: 100,
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
