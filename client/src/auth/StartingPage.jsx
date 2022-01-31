import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import theme from "../../theme";

const StartingPage = ({ setPage }) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Welcome to Ledge-It
        </Text>
      </View>
      <View style={styles.body}>
        <LoginButton
          onPress={()=>setPage('loginPage')}
        />
        <SignUpButton
          onPress={()=>setPage('signUpPage')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Dimensions.get('window').height * 0.35,
    width: Dimensions.get('window').width,
    paddingTop: Dimensions.get('window').height * 0.15,
    paddingLeft: Dimensions.get('window').width * 0.05,
  },
  headerText: {
    color: theme.colors.primary,
    fontSize: 50,
    fontWeight: '500',
  },
  body: {
    display: 'flex',
    alignSelf: 'center',
    paddingTop: Dimensions.get('window').height * 0.15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: Dimensions.get('window').height * 0.3,
  },
});

export default StartingPage;