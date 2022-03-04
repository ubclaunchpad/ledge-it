import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import Modal from './CustomModal';
import theme from '../../theme';
import AddData from '../modals/AddData';

const DefaultActionButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddDataModalVisible, setAddDataModalVisible] = useState('');
  return (
    <View style={styles.centeredView}>
      <Modal isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
        <Modal isModalVisible={!!isAddDataModalVisible} setModalVisible={setAddDataModalVisible}>
          <AddData
            setModalVisible={setModalVisible}
            setAddDataModalVisible={setAddDataModalVisible}
            initialType={isAddDataModalVisible}
          />
        </Modal>
        <Button
          style={styles.button}
          icon="currency-usd"
          mode="contained"
          onPress={() => setAddDataModalVisible('Income')}>
          Add Income
        </Button>
        <Button
          style={styles.button}
          icon="currency-usd-off"
          mode="contained"
          onPress={() => setAddDataModalVisible('Expense')}>
          Add Expense
        </Button>
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
    backgroundColor: 'transparent',
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 20,
    backgroundColor: theme.colors.primaryDark,
  },
  button: {
    backgroundColor: theme.colors.primaryDark,
    margin: 5,
    paddingBottom: 2,
    paddingLeft: 11,
    paddingRight: 11,
    paddingTop: 2,
    borderRadius: 20,
  },
  incomeButton: {
    backgroundColor: theme.colors.green,
    margin: 5,
  },
  expenseButton: {
    backgroundColor: theme.colors.red,
    margin: 5,
  },
});

export default DefaultActionButton;
