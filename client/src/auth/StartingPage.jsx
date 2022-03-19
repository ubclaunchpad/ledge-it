import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SvgXml } from 'react-native-svg';
import theme from '../../theme';
import Logo from '../../assets/logo';
import Graph from '../../assets/graph';
import FilledButton from '../components/AuthPage/FilledButton';
import OutlinedButton from '../components/AuthPage/OutlinedButton';

const StartingPage = ({ setPage }) => {
  return (
    <>
      <View
        style={{
          backgroundColor: theme.colors.primary,
          minHeight: Dimensions.get('window').height,
        }}>
        <View style={{ backgroundColor: theme.colors.white }}>
          <View style={styles.header}>
            <SvgXml xml={Logo} alt="logo" transform={[{ scaleX: 0.625 }]} />
            <Text style={styles.headerText}>Welcome</Text>
          </View>
          <View style={styles.body}>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>
                Let’s begin saving by keeping track of your spending and income, and create budgets
                you can stick to!
              </Text>
            </View>
            <SvgXml
              xml={Graph}
              alt="graph"
              style={{ scaleX: Dimensions.get('window').width / 380 }}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <FilledButton label="Login" onPress={() => setPage('loginPage')} />
          <OutlinedButton label="Create an account" onPress={() => setPage('signUpPage')} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingVertical: 75,
    borderBottomLeftRadius: Dimensions.get('window').width,
    borderBottomRightRadius: Dimensions.get('window').width,
    backgroundColor: theme.colors.greyBackground,
    transform: [{ scaleX: 1.6 }],
  },

  headerText: {
    marginTop: 30,
    color: theme.colors.textDark,
    fontSize: 50,
    transform: [{ scaleX: 0.625 }],
  },

  description: {
    width: Dimensions.get('window').width * 0.8,
  },

  descriptionText: {
    fontSize: 18,
    fontWeight: '300',
    textAlign: 'center',
    lineHeight: 24,
  },

  body: {
    display: 'flex',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  buttons: {
    width: Dimensions.get('window').width,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartingPage;
