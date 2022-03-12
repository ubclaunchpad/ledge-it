import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ExpenseForm from './ExpenseForm';
import IncomeForm from './IncomeForm';

const AddData = ({ setModalVisible, setAddDataModalVisible, initialType }) => {
  const [type, setType] = useState(initialType || 'Expense');

  return (
    <View style={styles.content}>
      {type === 'Expense' ? (
        <ExpenseForm
          setModalVisible={setModalVisible}
          setExpenseModalVisible={setAddDataModalVisible}
          type={type}
          setType={setType}
        />
      ) : (
        <IncomeForm
          setModalVisible={setModalVisible}
          setIncomeModalVisible={setAddDataModalVisible}
          type={type}
          setType={setType}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 20,
  },
});

export default AddData;
