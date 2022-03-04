import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';
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
            <Button onPress={openMenu} color="white">
              Sort
            </Button>
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
    marginTop: 3,
    marginRight: 10,
    marginLeft: 10,
    width: 80,
  },
});

export default RNPMenu;
