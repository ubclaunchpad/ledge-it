import React from 'react';
import { StyleSheet, Pressable, Text, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const CustomModal = ({ isModalVisible, setModalVisible }) => {
  return (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onRequestClose={() => {
        setModalVisible(!isModalVisible);
      }}
      style={styles.modal}>
      <View style={styles.container}>
        <Text style={styles.text}>Hello! This is custom modal</Text>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!isModalVisible)}>
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    alignItems: 'center',
    maxHeight: Dimensions.get('window').height * 0.8,
    justifyContent: 'flex-end',
  },
  text: {
    color: 'black',
    padding: 5,
  },
  button: {
    display: 'flex',
    borderRadius: 6,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    padding: 5,
    margin: 10,
  },
});
