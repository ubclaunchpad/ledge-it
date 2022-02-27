import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../../theme';
import StyledButton from '../StyledButton';

const PrivacySetting = ({ state, setState }) => {
  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={state.isPrivacyModalOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={1}
      onRequestClose={() => {
        setState({ isPrivacyModalOpen: false });
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <StyledButton
            customStyles={{
              pressable: {
                position: 'absolute',
                left: -5,
                top: -25,
              },
              background: {
                padding: 20,
              },
            }}
            onTap={() => {
              setState({ isPrivacyModalOpen: false });
            }}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Privacy</Text>
        </View>
        <Text>This is privacy setting</Text>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 4,
    color: theme.colors.primary,
  },
});

export default PrivacySetting;
