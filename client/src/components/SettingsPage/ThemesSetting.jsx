import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../theme';
import StyledButton from '../StyledButton';

const ThemesSetting = ({ setState }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <StyledButton
            customStyles={styles}
            onTap={() => {
              setState({ isThemesModalOpen: false });
            }}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Themes</Text>
        </View>
        <Text>This is themes setting</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  pressable: {
    position: 'absolute',
    left: 0,
    top: -10,
  },
  titleText: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 4,
    color: theme.colors.primary,
  },
});

export default ThemesSetting;
