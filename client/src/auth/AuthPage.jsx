import React, { useState } from 'react';
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';
import StartingPage from './StartingPage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthPage = ({ setLoggedIn }) => {
  const [page, setPage] = useState('startingPage');

  if (page === 'loginPage') {
    return (
      <LoginPage
        setPage={setPage}
        setLoggedIn={setLoggedIn}
      />
    );
  } else if (page === 'signUpPage') {
    return (
      <SignUpPage 
        setPage={setPage} 
        setLoggedIn={setLoggedIn}
      />
    );
  } else {
    return (  
      <StartingPage 
        setPage={setPage}
      />
    );
  }
};

export default AuthPage;