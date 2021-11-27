import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, Portal, Provider, Colors } from 'react-native-paper';
import Modal from './CustomModal';
import ExpenseForm from '../modals/ExpenseForm';
import IncomeForm from '../modals/IncomeForm';

const DefaultActionButton = (children) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal isModalVisible={isIncomeModalVisible} setModalVisible={setIncomeModalVisible}>
        <IncomeForm />
      </Modal>
      <Modal isModalVisible={isExpenseModalVisible} setModalVisible={setExpenseModalVisible}>
        <ExpenseForm />
      </Modal>
      <Provider>
        <Portal>
          <FAB.Group
            style={open ? styles.FABgroupOpen : styles.FABgroupClosed}
            fabStyle={styles.fab}
            open={open}
            icon={open ? 'close' : 'plus'}
            actions={[
              {
                icon: 'plus',
                label: 'Add Income',
                onPress: () => setIncomeModalVisible(true),
              },
              {
                icon: 'minus',
                label: 'Add Expense',
                onPress: () => setExpenseModalVisible(true),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent',
  },
  fab: {
    backgroundColor: '#2196F3',
  },
  FABgroupOpen: {
    backgroundColor: 'white',
  },
  FABgroupClosed: {
    backgroundColor: 'transparent',
  },
});

export default DefaultActionButton;
