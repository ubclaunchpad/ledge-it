import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import StyledTextInput from '../components/StyledTextInput';
import BackArrow from '../components/AuthPage/BackArrow';
import { login, saveToken } from '../utils/auth';
import Logo from '../../assets/logo';
import theme from '../../theme';
import Gradient from '../../assets/loginPageGradient';
import FilledButton from '../components/AuthPage/FilledButton';

const LoginPage = ({ setPage, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = () => {
    login(email, password)
      .then(async ({ data }) => {
        await saveToken(data.access_token, data.expires);
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          backgroundColor: theme.colors.primary,
          minHeight: Dimensions.get('window').height,
        }}>
        <View style={styles.header}>
          <SvgXml xml={Logo} alt="logo" transform={[{ scaleX: 0.625 }]} />
          <Text style={styles.headerText}>Welcome</Text>
        </View>
        <SvgXml
          xml={Gradient}
          alt="gradient"
          width={Dimensions.get('window').width}
          transform={[{ scaleX: 1.2 }]}
          style={{
            marginTop: -50,
            alignSelf: 'center',
          }}
        />
        <View style={styles.body}>
          <StyledTextInput label="Email" value={email} onChange={setEmail} isLight />
          <StyledTextInput
            label="Password"
            value={password}
            onChange={setPassword}
            secureTextEntry
            isLight
          />
          <View style={styles.btnContainer}>
            <FilledButton label="Login" onPress={submitLogin} />
          </View>
        </View>
      </KeyboardAvoidingView>
      <BackArrow onPress={() => setPage('startingPage')} />
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
    zIndex: 20,
  },
  headerText: {
    marginTop: 30,
    color: theme.colors.textDark,
    fontSize: 50,
    transform: [{ scaleX: 0.625 }],
  },

  body: {
    display: 'flex',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },

  btnContainer: {
    paddingTop: 50,
    display: 'flex',
    alignSelf: 'center',
  },
});

export default LoginPage;
