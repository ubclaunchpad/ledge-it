import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import StyledTextInput from '../components/StyledTextInput';
import BackArrow from '../components/AuthPage/BackArrow';
import SignUpButton from '../components/AuthPage/SignUpButton';
import { login, saveToken } from '../utils/auth';

const SignUpPage = ({ setPage, setLoggedIn }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [pwdWarn, setPwdWarn] = useState(undefined);

  const submitSignUp = async () => {
    await axios
      .post(
        'https://ledge-it.herokuapp.com/signup/',
        JSON.stringify({
          email,
          hashed_password: secondPassword,
          active: true,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .catch((err) => console.log(err));
    const loginResponse = await login(email, secondPassword);
    await saveToken(loginResponse.data.access_token);
    setLoggedIn(true);
  };

  const signUpHandler = () => {
    if (firstPassword !== secondPassword) {
      setPwdWarn("Passwords don't match");
      setTimeout(() => {
        setPwdWarn(undefined);
      }, 3000);
    }

    submitSignUp();
  };

  return (
    <>
      <View style={styles.body}>
        <StyledTextInput
          label="First Name"
          value={firstName}
          placeholder="ex. Gregor"
          onChange={setFirstName}
        />
        <StyledTextInput
          label="Email"
          value={email}
          placeholder="ex. gregork@ubc.ca"
          onChange={setEmail}
        />
        <StyledTextInput
          label="Create Password"
          value={firstPassword}
          onChange={setFirstPassword}
        />
        <StyledTextInput
          label="Confirm Password"
          value={secondPassword}
          onChange={setSecondPassword}
          errorMsg={pwdWarn}
        />
        <View style={styles.btnContainer}>
          <SignUpButton onPress={signUpHandler} />
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
    height: Dimensions.get('window').height * 0.85,
    paddingHorizontal: 10,
    paddingTop: 175,
    justifyContent: 'space-between',
  },

  btnContainer: {
    paddingTop: 40,
    display: 'flex',
    alignSelf: 'center',
  },
});

export default SignUpPage;
