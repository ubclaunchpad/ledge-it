import React from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';

const AddData = ({ setModalVisible }) => {
  return (
    <View style={styles.centeredView}>
      <Text style={styles.modalText}>Add Expense/Income Modal</Text>
      <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(false)}>
        <Text style={styles.textStyle}>This is the add expense/income modal</Text>
      </Pressable>
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddData;
