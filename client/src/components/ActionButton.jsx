import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import Modal from './CustomModal';

const ActionButton = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
        {React.isValidElement(children) && React.cloneElement(children, { setModalVisible })}
      </Modal>
      <FAB style={styles.fab} medium icon="plus" onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#2196F3',
  },
});

export default ActionButton;
