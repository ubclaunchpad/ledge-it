import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import AddDataModal from '../modals/AddData';

const ActionButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <AddDataModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
