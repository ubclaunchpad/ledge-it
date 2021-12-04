import React from 'react';
import { StyleSheet, Pressable, View, Dimensions, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../theme';

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
          <Ionicons name="close-circle-outline" color={theme.colors.primaryDark} size={35} />
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
    backgroundColor: theme.colors.white,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    alignItems: 'center',
    maxHeight: Dimensions.get('window').height * 0.85,
    justifyContent: 'flex-end',
  },
  closeButton: {
    display: 'flex',
    margin: '2%',
    alignSelf: 'flex-start',
  },
  content: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 10,
    marginBottom: '10%',
  },
});
