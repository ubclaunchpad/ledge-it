import React from 'react';
import { StyleSheet, Pressable, Text, View, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

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
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(!isModalVisible)}>
          <Ionicons name="close-circle-outline" color="black" size={35} />
        </Pressable>
        <Text style={styles.text}>Hello! This is custom modal</Text>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  container: {
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
  closeButton: {
    display: 'flex',
    margin: '2%',
    alignSelf: 'flex-start',
  },
});
