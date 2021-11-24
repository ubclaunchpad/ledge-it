import React from 'react';
import { StyleSheet, Pressable, View, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

const CustomModal = ({ isModalVisible, setModalVisible, children, ...rest }) => {
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
      style={styles.modal}
      {...rest}>
      <View style={styles.container}>
        <Pressable style={styles.closeButton} onPress={() => setModalVisible(!isModalVisible)}>
          <Ionicons name="close-circle-outline" color="black" size={35} />
        </Pressable>
        <ScrollView>
          <View style={styles.content}>{children}</View>
        </ScrollView>
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
    width: Dimensions.get('window').width,
    alignItems: 'center',
    maxHeight: Dimensions.get('window').height * .99,
    justifyContent: 'flex-end',
    marginLeft: -20
  },
  closeButton: {
    display: 'flex',
    margin: '2%',
    alignSelf: 'flex-start',
  },
  content: {
    margin: 10,
    marginBottom: '10%',
    width: Dimensions.get('window').width * 0.944,
  },
});
