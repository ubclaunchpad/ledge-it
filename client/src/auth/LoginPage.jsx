import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import StyledTextInput from '../components/StyledTextInput';
import axios from 'axios';
import BackArrow from '../components/AuthPage/BackArrow';
import LoginButton from '../components/AuthPage/LoginButton';
import { login } from '../utils/auth';


// ({ keyboardType, label, placeholder, onChange, required, noClear, ...rest }) => {

const LoginPage = ({ setPage, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = () => {
    login(email, password)
      .then(({ data }) => {
        
        // TODO: store the key locally
        setLoggedIn(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={styles.body}>
        <StyledTextInput
          label='Email'
          value={email}
          onChange={setEmail}
        />
        <StyledTextInput
          label='Password'
          value={password}
          onChange={setPassword}
        />
        <View style={styles.btnContainer}>
          <LoginButton
            onPress={submitLogin}
          />
        </View>      
      </View>
      <BackArrow
        onPress={()=>setPage('startingPage')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    alignSelf: 'center',
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').height * 0.85,
    paddingHorizontal: 10,
    paddingTop: 250,
    justifyContent: 'space-between',
  },

  btnContainer: {
    paddingTop: 80,
    display: 'flex',
    alignSelf: 'center',
  }, 
});

export default LoginPage;