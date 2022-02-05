import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import StyledButton from '../StyledButton';
import Modal from '../CustomModal';
import { theme } from '../../../theme';
import { METHODS } from '../../utils/sorts';

const SortMenu = ({ sortFunction }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const onTapHandler = (method) => {
    closeMenu();
    sortFunction(method);
  };

  return (
    <>
      <View>
        <StyledButton
          customStyles={dropDownStyles}
          label="Sort"
          onTap={() => openMenu()}
          icon={visible ? 'chevron-up' : 'chevron-down'}
        />
      </View>
      <Modal isModalVisible={visible} setModalVisible={setVisible}>
        <View>
          <StyledButton
            onTap={() => {
              onTapHandler(METHODS.OLD_TO_NEW);
            }}
            customStyles={btnCustomStyles}
            label="Sort by date (old to new)"
          />
          <StyledButton
            onTap={() => {
              onTapHandler(METHODS.NEW_TO_OLD);
            }}
            customStyles={btnCustomStyles}
            label="Sort by date (new to old)"
          />
          <StyledButton
            onTap={() => {
              onTapHandler(METHODS.HIGH_TO_LOW);
            }}
            customStyles={btnCustomStyles}
            label="Sort by amount (high to low)"
          />
          <StyledButton
            onTap={() => {
              onTapHandler(METHODS.LOW_TO_HIGH);
            }}
            customStyles={btnCustomStyles}
            label="Sort by amount (low to high)"
          />
        </View>
      </Modal>
    </>
  );
};

// const styles = StyleSheet.create({
//   sortMenu: {
//     backgroundColor: theme.colors.primary,
//     borderRadius: 20,
//     marginTop: 3,
//     marginRight: 10,
//     marginLeft: 10,
//     width: 80,
//   },
// });

const dropDownStyles = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    height: 40,
    width: 90,
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const btnCustomStyles = StyleSheet.create({
  background: {
    color: theme.colors.white,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'transparent',
    height: 40,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: theme.colors.primary,
  },
});

export default SortMenu;
