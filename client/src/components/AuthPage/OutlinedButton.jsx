import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import StyledButton from '../StyledButton';
import { theme } from '../../../theme';

export default ({ label, onPress, ...rest }) => {
  return (
    <StyledButton
      label={label}
      onTap={onPress}
      customStyles={styles}
      underlayColor={theme.colors.primary}
      activeOpacity={0.6}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.greyBackground,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get('window').width * 0.8,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    shadowOffset: { width: 0, height: 0 },
    marginBottom: 20,
  },

  text: {
    color: theme.colors.white,
    fontSize: 18,
  },
});
