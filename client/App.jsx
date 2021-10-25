import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './src/pages/HomePage';
import TablePage from './src/pages/TablePage';
import BudgetPage from './src/pages/BudgetPage';
import AnalyticsPage from './src/pages/AnalyticsPage';
import SettingsPage from './src/pages/SettingsPage';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text>Open up App.jsx to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
      <TabNavBar />
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();

function TabNavBar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" compotent={HomePage} />
      <Tab.Screen name="Table" compotent={TablePage} />
      <Tab.Screen name="Budget" compotent={BudgetPage} />
      <Tab.Screen name="Analytics" compotent={AnalyticsPage} />
      <Tab.Screen name="Settings" compotent={SettingsPage} />
    </Tab.Navigator>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
