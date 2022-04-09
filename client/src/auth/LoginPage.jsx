import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SpinnerButton from 'react-native-spinner-button';
import StyledTextInput from '../components/AuthPage/StyledAuthInput';
import BackArrow from '../components/AuthPage/BackArrow';
import { login, saveToken } from '../utils/auth';
import Logo from '../../assets/logo';
import theme from '../../theme';
import Gradient from '../../assets/loginPageGradient';

const LoginPage = ({ setPage, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = () => {
    login(email, password)
      .then(async ({ data }) => {
        await saveToken(data.access_token, data.expires);
        setLoggedIn(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
          style={{
            marginTop: -50,
            alignSelf: 'center',
            scaleX: Dimensions.get('window').width / 380,
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
            <SpinnerButton
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: Dimensions.get('window').width,
                width: Dimensions.get('window').width / 1.2,
              }}
              isLoading={isLoading}
              onPress={() => setIsLoading(true, submitLogin())}
              indicatorCount={10}
              spinnerColor={theme.colors.primary}>
              <Text style={{ fontSize: 18, color: theme.colors.primary }}>Login</Text>
            </SpinnerButton>
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
  },
});

export default LoginPage;
