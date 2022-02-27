import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import TheLink from "./TheLink";
import axios from "axios";

export default function Plaid() {
  const [linkToken, setLinkToken] = useState(false);
  const [accessToken, setAccessToken] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [linkToggle, setLinkToggle] = useState(false);

  const baseURL = process.env.SERVER_URL;

  useEffect(() => {
    const getLinkToken = async () => {
      const response = await axios.post(baseURL + "/api/create_link_token");
      setLinkToken(response.data.link_token);
    };

    getLinkToken();
  }, []);

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
      {!linkToggle && (
        <View style={styles.button}>
          <Button onPress={() => setLinkToggle(true)} title="Link With Plaid" />
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
      {linkToken && !accessToken && linkToggle && (
        <TheLink
          linkToken={linkToken}
          setAccessToken={setAccessToken}
          baseURL={baseURL}
        />
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