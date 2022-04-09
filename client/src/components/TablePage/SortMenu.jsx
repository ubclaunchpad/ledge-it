import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import theme from '../../../theme';

const RNPMenu = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.sortMenu}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <>
              <Button onPress={openMenu} color="white" style={styles.button}>
                <Text>Sort </Text>
                <FontAwesome name="chevron-down" size={15} color="white" />
              </Button>
            </>
          }>
          <Menu.Item onPress={() => {}} title="Sort by: Price" />
          <Menu.Item onPress={() => {}} title="Sort by: Category" />
          <Menu.Item onPress={() => {}} title="Sort by: Time" />
          <Menu.Item onPress={() => {}} title="Sort by: Location" />
        </Menu>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sortMenu: {
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
    marginHorizontal: 10,
    marginBottom: 10,
    width: 110,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
});

export default RNPMenu;
