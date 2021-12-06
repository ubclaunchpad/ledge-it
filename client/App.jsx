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
import { theme } from './theme';

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
        tabBarActiveTintColor: theme.colors.accentDark,
        tabBarInactiveTintColor: theme.colors.primaryLight,
        tabBarStyle: {
          backgroundColor: theme.colors.primary,
        },
        tabBarShowLabel: false,
        headerShown: false,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
