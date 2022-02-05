import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import PlaidLink from "@burstware/expo-plaid-link";
import axios from "axios";

export default function App() {
  const [linkToken, setLinkToken] = useState("");
  const [accessToken, setAccessToken] = useState(false);
  const [transactions, setTransactions] = useState(false);

  const baseURL = "https://wise-dodo-75.loca.lt";
  
  useEffect(() => {
    axios
      .post(baseURL + "/api/create_link_token")
      .then((res) => {
        setLinkToken(res.data.link_token);
        setLinkTokenReady(true);
      })
      .catch((err) => console.log(err));
  }, []);

  // Exchanges public token to api access token
  const exchangePublicToken = async (publicToken) => {
    const response = await axios.post(baseURL + "/api/set_access_token", {
      public_token: publicToken,
    });
    setAccessToken(response.data.access_token);
    console.log(accessToken);
  };

  // Sets transactions with current access token
  const fetchTransactions = async () => {
    const response = await axios.post(baseURL + "/api/transactions", {
      access_token: accessToken
    });
    setTransactions(response.data.transactions);
  }

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
            )
          })}
        </View>
      )}
      {!accessToken && (
        <PlaidLink
          linkToken={linkToken}
          onEvent={(event) => console.log(event)}
          onExit={(exit) => console.log(exit)}
          onSuccess={(success) => {
            console.log(`Public Token: ${success.publicToken}`);
            setLinkTokenReady(false);
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
    marginTop: 40
  },
  transactionView: {
    justifyContent: "center",
    marginHorizontal: 20,
  },
  singleTransaction: {
    padding: 10,
  }
});
