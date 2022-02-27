import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import StyledButton from '../StyledButton';
import theme from '../../../theme';

export default ({ label, onPress, ...rest }) => {
  return (
    <StyledButton
      label={label}
      onTap={onPress}
      customStyles={styles}
      underlayColor={theme.colors.primary}
      activeOpacity={0.8}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.greyBackground,
    padding: 10,
    width: Dimensions.get('window').width * 0.8,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: theme.colors.primary,
  },
});
