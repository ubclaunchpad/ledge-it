import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAxiosHeaders } from '../providers/axios';

const URL = process.env.SERVER_URL;

export const login = async (email, password) => {
  return axios.post(`${URL}/login`, `username=${email}&password=${password}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('expiry');
    await AsyncStorage.removeItem('auth_token');
    return axios.post(`${URL}/logout/`);
  } catch (e) {
    console.log(e);
  }
};

export const saveToken = async (token, expiry) => {
  try {
    await AsyncStorage.setItem('expiry', expiry);
    await AsyncStorage.setItem('auth_token', token);
    setAxiosHeaders(token);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async () => {
  try {
    const expiry = await AsyncStorage.getItem('expiry');
    if (expiry && new Date().getTime() <= new Date(expiry).getTime()) {
      const accessToken = await AsyncStorage.getItem('auth_token');
      setAxiosHeaders(accessToken);
      return accessToken;
    }
  } catch (e) {
    console.log(e);
  }
};
