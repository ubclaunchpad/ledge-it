import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Modal from 'react-native-modal';
import theme from '../../../theme';
import axios from '../../providers/axios';

export default function EditModal({ editModal, setEditModal, month, year, category }) {
  const [text, setText] = useState('');

  const updateCategoryBudget = () => {
    if (category === 'total') {
      return axios.put(
        `${process.env.SERVER_URL}/budget`,
        { value: parseFloat(text) },
        { params: { month, year } },
      );
    } else {
      return axios.put(
        `${process.env.SERVER_URL}/budget/${category}`,
        { value: parseFloat(text) },
        { params: { month, year } },
      );
    }
  };

  return (
    <Modal
      style={{ margin: 0, justifyContent: 'flex-end' }}
      isVisible={editModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={0.75}
      onBackdropPress={() => setEditModal(false)}
    >
      <View style={styles.container}>
        <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextInput
            mode="flat"
            label="New Budget Amount ($)"
            keyboardType="numeric"
            value={text}
            style={{ width: '80%' }}
            onChangeText={(newText) => setText(newText)}
          />
          <Button
            onPress={() => {
              updateCategoryBudget().then(() => setEditModal(false));
            }}
            color="white"
            style={{
              backgroundColor: theme.colors.primary,
              justifyContent: 'center',
              width: '20%',
            }}
          >
            Add
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingBottom: 330,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
