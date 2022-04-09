import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SpinnerButton from 'react-native-spinner-button';
import axios from '../providers/axios';
import StyledTextInput from '../components/AuthPage/StyledAuthInput';
import BackArrow from '../components/AuthPage/BackArrow';
import { login, saveToken } from '../utils/auth';
import theme from '../../theme';
import Logo from '../../assets/logo';
import Gradient from '../../assets/loginPageGradient';
import OutlinedButton from '../components/AuthPage/OutlinedButton';

const URL = process.env.SERVER_URL;

const SignUpPage = ({ setPage, setLoggedIn }) => {
  const [form, setForm] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [pwdWarn, setPwdWarn] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const isFormOneFilled = () => !!name && !!email;

  const submitSignUp = async () => {
    await axios
      .post(
        `${URL}/signup`,
        {
          email,
          hashed_password: secondPassword,
          active: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err) => console.log(err));
    const { data } = await login(email, secondPassword);
    await saveToken(data.access_token, data.expiry);
    setLoggedIn(true);
    setIsLoading(false);
  };

  const signUpHandler = async () => {
    if (firstPassword !== secondPassword) {
      setPwdWarn("Passwords don't match");
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      setTimeout(() => {
        setPwdWarn(undefined);
      }, 10000);
    } else {
      await submitSignUp();
    }
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
          {form === 0 ? (
            <>
              <StyledTextInput label="Name" value={name} onChange={setName} isLight />
              <StyledTextInput label="Email" value={email} onChange={setEmail} isLight />
            </>
          ) : (
            <>
              <StyledTextInput
                label="Create Password"
                value={firstPassword}
                onChange={setFirstPassword}
                secureTextEntry
                isLight
              />
              <StyledTextInput
                label="Confirm Password"
                value={secondPassword}
                onChange={setSecondPassword}
                errorMsg={pwdWarn}
                secureTextEntry
                isLight
              />
            </>
          )}
          {form === 0 ? (
            <>
              <View style={styles.btnContainer}>
                <OutlinedButton
                  label="Next"
                  onPress={() => setForm(1)}
                  disabled={!isFormOneFilled()}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.btnContainer}>
                <OutlinedButton label="Back" onPress={() => setForm(0)} />
                {/* <FilledButton label="Create an account" onPress={signUpHandler} /> */}
              </View>
              <View
                style={{
                  display: 'flex',
                  width: Dimensions.get('window').width,
                  alignSelf: 'center',
                }}>
                <SpinnerButton
                  buttonStyle={{
                    backgroundColor: 'white',
                    borderRadius: Dimensions.get('window').width,
                    width: Dimensions.get('window').width / 1.2,
                  }}
                  isLoading={isLoading}
                  onPress={() => setIsLoading(true, signUpHandler())}
                  indicatorCount={10}
                  spinnerColor={theme.colors.primary}>
                  <Text style={{ fontSize: 18, color: theme.colors.primary }}>Signup</Text>
                </SpinnerButton>
              </View>
            </>
          )}
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

export default SignUpPage;
