import React from 'react';
import { Dimensions, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../../../theme';
import StyledButton from '../StyledButton';

const ThemesSetting = ({ state, setState }) => {
  const colorData = ['#24838F', '#996A25', '#17C308', '#0032E5', '#BF0000', '#742599'];

  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={state.isThemesModalOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={1}
      onRequestClose={() => {
        setState({ isThemesModalOpen: false });
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
              setState({ isThemesModalOpen: false });
            }}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Themes</Text>
        </View>
        <View style={styles.themesSelections}>
          {colorData.map((item) => {
            return (
              <Pressable key={item}>
                <LinearGradient
                  colors={[item, '#F3F3F3']}
                  style={[styles.circle, { borderColor: item }]}
                  key={item}
                />
              </Pressable>
            );
          })}
        </View>
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

export default ThemesSetting;
