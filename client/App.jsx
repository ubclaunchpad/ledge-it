import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './src/pages/HomePage';
import TablePage from './src/pages/TablePage';
import BudgetPage from './src/pages/BudgetPage';
import AnalyticsPage from './src/pages/AnalyticsPage';
import SettingsPage from './src/pages/SettingsPage';
import NotificationPage from './src/components/SettingsPage/NotificationPage';
import AuthPage from './src/auth/AuthPage';
import BlankPage from './src/auth/BlankPage';
import { theme } from './theme';
import { getToken } from './src/utils/auth';

const App = () => {
  StatusBar.setBarStyle('dark-content');
  const [loggedIn, setLoggedIn] = useState(undefined);

  useEffect(() => {
    const checkForToken = async () => {
      const token = await getToken();
      setLoggedIn(!!token);
    };
    checkForToken();
  }, []);

  if (loggedIn === true) {
    return (
      <NavigationContainer>
        <TabNavBar />
        <StackNavigator />
      </NavigationContainer>
    );
  } else if (loggedIn === false) {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <AuthPage setLoggedIn={setLoggedIn} />
      </ScrollView>
    );
  } else {
    return <BlankPage />;
  }
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SettingsHome">
      <Stack.Screen name="SettingsHome" component={SettingsPage} />
      <Stack.Screen name="Details" component={NotificationPage} />
    </Stack.Navigator>
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
