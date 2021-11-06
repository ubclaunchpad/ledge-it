import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './src/pages/HomePage';
import TablePage from './src/pages/TablePage';
import BudgetPage from './src/pages/BudgetPage';
import AnalyticsPage from './src/pages/AnalyticsPage';
import SettingsPage from './src/pages/SettingsPage';

const App = () => {
  return (
    <NavigationContainer>
      <TabNavBar />
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();

const TabNavBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => screenOptions(route, color),
        tabBarActiveTintColor: '#fff',
        tabBarActiveBackgroundColor: '#7ad7f0',
        tabBarInactiveTintColor: '#fff',
        tabBarInactiveBackgroundColor: '#0D50B4',
        tabBarShowLabel: false,
      })}
      style={styles.container}>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Table" component={TablePage} />
      <Tab.Screen name="Budget" component={BudgetPage} />
      <Tab.Screen name="Analytics" component={AnalyticsPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
};

const screenOptions = (route, color) => {
  let iconName;

  switch (route.name) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Table':
      iconName = 'list';
      break;
    case 'Budget':
      iconName = 'wallet';
      break;
    case 'Analytics':
      iconName = 'analytics';
      break;
    case 'Settings':
      iconName = 'settings';
      break;
  }

  return <Ionicons name={iconName} color={color} size={26} />;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
