import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import BackArrow from '../components/AuthPage/BackArrow';
import LoginButton from '../components/AuthPage/LoginButton';
import { login, saveToken } from '../utils/auth';

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
      <View style={styles.body}>
        <StyledTextInput label="Email" value={email} onChange={setEmail} />
        <StyledTextInput label="Password" value={password} onChange={setPassword} secureTextEntry />
        <View style={styles.btnContainer}>
          <LoginButton onPress={submitLogin} />
        </View>
      </View>
      <BackArrow onPress={() => setPage('startingPage')} />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.7,
    paddingHorizontal: 10,
    paddingTop: Dimensions.get('window').height * 0.3,
    justifyContent: 'space-between',
  },

  btnContainer: {
    paddingTop: 50,
    display: 'flex',
    alignSelf: 'center',
  },
});

export default LoginPage;
