import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Provider } from 'react-native-paper';

const RNPMenu = () => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <Provider>
      <View style={styles.sortMenuStyles}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button onPress={openMenu} color="black">
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
  sortMenuStyles: {
    paddingTop: 10,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default RNPMenu;
