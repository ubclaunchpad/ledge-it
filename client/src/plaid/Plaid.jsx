import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import axios from 'axios';
import SpinnerButton from 'react-native-spinner-button';
import TheLink from './TheLink';
import StyledButton from '../components/StyledButton';
import theme from '../../theme';

export default function Plaid() {
  const [linkToken, setLinkToken] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [linkToggle, setLinkToggle] = useState(false);
  const [loading, setLoading] = useState(undefined);

  const baseURL = process.env.SERVER_URL;

  useEffect(() => {
    const getLinkToken = async () => {
      const response = await axios.post(`${baseURL}/api/create_link_token`);
      setLinkToken(response.data.link_token);
    };
    getLinkToken();
  }, [baseURL]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const response = await axios.get(`${baseURL}/api/access_token`);
      console.log(response.data);
      if (response.data.access_token) {
        setAccessToken(response.data.access_token);
      }
    };
    fetchAccessToken();
  }, [baseURL]);

  // Sets transactions with current access token
  const fetchTransactions = async () => {
    setLoading(true);
    await axios.get(`${baseURL}/api/transactions`, {
      access_token: accessToken,
      params: {
        access_token: accessToken,
      },
    });
    setLoading(false);
  };

  return (
    <>
      {accessToken && (
        <>
          <View style={styles.textView}>
            <Text style={styles.text}>
              Your bank account has successfully been linked. Fetch your latest transactions by
              clicking the button below.
            </Text>
          </View>
          <View style={styles.button}>
            <SpinnerButton
              buttonStyle={{
                backgroundColor: theme.colors.primary,
                borderRadius: Dimensions.get('window').width,
                width: Dimensions.get('window').width / 1.2,
              }}
              isLoading={loading}
              onPress={() => setLoading(true, fetchTransactions())}
              indicatorCount={10}
              spinnerColor="white"
            >
              <Text style={{ fontSize: 18, color: 'white' }}>Fetch Transactions</Text>
            </SpinnerButton>
          </View>
          <View style={styles.textViewSmall}>
            {loading ? (
              <Text style={styles.textSmall}>Loading...</Text>
            ) : loading === false ? (
              <Text style={styles.textSmall}>Your transactions have successfully been fetched</Text>
            ) : (
              <></>
            )}
          </View>
        </>
      )}
      {!linkToggle && !accessToken && (
        <View style={styles.button}>
          <StyledButton
            onPress={() => setLinkToggle(true)}
            label="Link With Plaid"
            customStyles={{
              background: {
                backgroundColor: theme.colors.primary,
                padding: 10,
                borderRadius: 20,
              },
              text: {
                fontSize: 18,
                color: theme.colors.white,
              },
            }}
          />
        </View>
      )}
      {linkToken && !accessToken && linkToggle && (
        <TheLink linkToken={linkToken} setAccessToken={setAccessToken} baseURL={baseURL} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 100,
    padding: 30,
    marginTop: 40,
  },
  transactionView: {
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  singleTransaction: {
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: theme.colors.white,
  },
  textView: {
    display: 'flex',
    width: '80%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    marginBottom: -20,
    marginTop: 20,
  },
  textSmall: {
    fontSize: 16,
    textAlign: 'center',
  },
  textViewSmall: {
    marginTop: -50,
    display: 'flex',
    width: '80%',
  },
});
