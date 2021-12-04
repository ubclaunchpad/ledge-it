import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB , Button} from 'react-native-paper';
import Modal from './CustomModal';
import ExpenseForm from '../modals/ExpenseForm';
import IncomeForm from '../modals/IncomeForm';

const DefaultActionButton = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setExpenseModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal isModalVisible={isModalVisible} setModalVisible={setModalVisible}>
        {React.isValidElement(children) && React.cloneElement(children, { setModalVisible })}
        <Modal isModalVisible={isIncomeModalVisible} setModalVisible={setIncomeModalVisible}>
          <IncomeForm />
        </Modal>
        <Modal isModalVisible={isExpenseModalVisible} setModalVisible={setExpenseModalVisible}>
          <ExpenseForm />
        </Modal>
        <Button style={styles.button} icon="currency-usd" mode="contained" onPress={ () => setIncomeModalVisible(true)  }>
          Add Income
        </Button>
        <Button style={styles.button} icon="currency-usd-off" mode="contained" onPress={() => setExpenseModalVisible(true) }>
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
  fab:{
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
    backgroundColor: '#24838f',
  },
  button:{
    backgroundColor: '#24838f',
    margin: 5,
    paddingBottom: 2,
    paddingLeft:  11,
    paddingRight: 11,
    paddingTop:  2,
    borderRadius: 20,
  },
  incomeButton: {
    backgroundColor: 'green',
    margin:5,
  },
  expenseButton: {
    backgroundColor: 'red',
    margin: 5,
  },
});

export default DefaultActionButton;