import React from "react";
import PlaidLinkWebview from "./PlaidLinkWebview.jsx";
import axios from "axios";
import { Text } from "react-native";

export default function TheLink({ linkToken, setAccessToken, baseURL }) {
  // Exchanges public token to api access token
  const exchangePublicToken = async (publicToken) => {
    const response = await axios.post(baseURL + "/api/set_access_token", {
      public_token: publicToken,
    });
    setAccessToken(response.data.access_token);
  };

  return (
    <PlaidLinkWebview
      linkToken={linkToken}
      onEvent={(event) => console.log(event)}
      onExit={(exit) => console.log(exit)}
      onSuccess={(success) => {
        console.log(`Public Token: ${success.publicToken}`);
        exchangePublicToken(success.publicToken);
      }}
    >
      <Text>Open up App.js to start working on your app!</Text>
    </PlaidLinkWebview>
  );
}