import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = async (email, password) => {
  return await axios
  .post(
    'https://ledge-it.herokuapp.com/login/',
    `username=${email}&password=${password}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    }
  );
}

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('auth_token', token);
  } catch (e) {
    console.log(e);
  }
}

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('auth_token');
  } catch (e) {
    console.log(e);
  }
};