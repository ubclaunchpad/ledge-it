import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import theme from '../../../theme';
import StyledButton from '../StyledButton';
import Plaid from '../../plaid/Plaid';

export default function PlaidSetting({ state, setState }) {
  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={state.isPlaidModalOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={1}
      onRequestClose={() => {
        setState({ isPlaidModalOpen: false });
      }}
    >
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
              setState({ isPlaidModalOpen: false });
            }}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Plaid Link</Text>
        </View>
        <View style={styles.themesSelections}>
          <Plaid />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

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
  themesSelections: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  circle: {
    width: Dimensions.get('screen').width / 4,
    height: Dimensions.get('screen').width / 4,
    borderRadius: Dimensions.get('screen').width / 8,
    borderWidth: 3,
    margin: 10,
  },
});
