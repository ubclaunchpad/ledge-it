import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PlaidLink from "@burstware/expo-plaid-link";
import axios from "axios";

export default function App() {
  const [linkToken, setLinkToken] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [transactions, setTransactions] = useState(false);

  const baseURL = "https://rude-impala-97.loca.lt";

  useEffect(() => {
    const getLinkToken = async () => {
      const response = await axios.post(baseURL + "/api/create_link_token");
      setLinkToken(response.data.link_token);
    };

    getLinkToken();
  }, []);

  // Exchanges public token to api access token
  const exchangePublicToken = async (publicToken) => {
    // I could not get this working with axios :(
    const response = await fetch(baseURL + "/api/set_access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: `public_token=${publicToken}`,
    });
    const data = await response.json();
    setAccessToken(data.access_token);
  };

  // Sets transactions with current access token
  const fetchTransactions = async () => {
    const response = await axios.get(baseURL + "/api/transactions", {
      access_token: accessToken,
    });
    setTransactions(response.data.transactions);
  };

  return (
    <>
      {accessToken && (
        <View style={styles.button}>
          <Button onPress={fetchTransactions} title="Fetch Transactions" />
        </View>
      )}
      {transactions && (
        <View style={styles.transactionView}>
          {transactions.map((transaction, index) => {
            return (
              <View key={index} style={styles.singleTransaction}>
                <Text>Name: {transaction.name}</Text>
                <Text>Amount: ${transaction.amount.toFixed(2)}</Text>
              </View>
            );
          })}
        </View>
      )}
      {linkToken && !accessToken && (
        <PlaidLink
          linkToken={linkToken}
          onEvent={(event) => console.log(event)}
          onExit={(exit) => console.log(exit)}
          onSuccess={(success) => {
            console.log(`Public Token: ${success.publicToken}`);
            exchangePublicToken(success.publicToken);
          }}
        >
          <Text>Open up App.js to start working on your app!</Text>
        </PlaidLink>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 100,
    padding: 30,
    marginTop: 40,
  },
  transactionView: {
    justifyContent: "center",
    marginHorizontal: 20,
  },
  singleTransaction: {
    padding: 10,
  },
});
