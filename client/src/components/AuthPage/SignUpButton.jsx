import React from 'react';
import { StyleSheet } from 'react-native';
import StyledButton from '../StyledButton';
import { theme } from '../../../theme';

export default ({ onPress }) => {
  return <StyledButton label="Sign-up" onTap={onPress} customStyles={styles} />;
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    padding: 10,
    width: 100,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
  },

  text: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});
