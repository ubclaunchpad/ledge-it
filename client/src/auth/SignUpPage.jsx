import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import axios from '../providers/axios';
import StyledTextInput from '../components/StyledTextInput';
import BackArrow from '../components/AuthPage/BackArrow';
import SignUpButton from '../components/AuthPage/SignUpButton';
import { login, saveToken } from '../utils/auth';

const URL = process.env.SERVER_URL;

const SignUpPage = ({ setPage, setLoggedIn }) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [pwdWarn, setPwdWarn] = useState(undefined);

  const submitSignUp = async () => {
    await axios
      .post(
        `${URL}/signup`,
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
    const { data } = await login(email, secondPassword);
    await saveToken(data.access_token, data.expiry);
    setLoggedIn(true);
  };

  const signUpHandler = () => {
    if (firstPassword !== secondPassword) {
      setPwdWarn("Passwords don't match");
      setTimeout(() => {
        setPwdWarn(undefined);
      }, 10000);
    } else {
      submitSignUp();
    }
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
          secureTextEntry
        />
        <StyledTextInput
          label="Confirm Password"
          value={secondPassword}
          onChange={setSecondPassword}
          errorMsg={pwdWarn}
          secureTextEntry
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
    height: Dimensions.get('window').height * 0.8,
    paddingHorizontal: 10,
    paddingTop: Dimensions.get('window').height * 0.25,
    justifyContent: 'space-between',
  },

  btnContainer: {
    paddingTop: 40,
    display: 'flex',
    alignSelf: 'center',
  },
});

export default SignUpPage;
