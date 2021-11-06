import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Modal from 'react-native-modal';

function WrapperComponent() {
  return (
    <View>
      <Modal isVisible={true}>
        <View style={styles.container}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  );
}

export default WrapperComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
