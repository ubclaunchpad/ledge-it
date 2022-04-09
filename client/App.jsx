import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import { Ionicons } from '@expo/vector-icons';
import HomePage from './src/pages/HomePage';
import TablePage from './src/pages/TablePage';
import BudgetPage from './src/pages/BudgetPage';
import AnalyticsPage from './src/pages/AnalyticsPage';
import SettingsPage from './src/pages/SettingsPage';
import AuthPage from './src/auth/AuthPage';
import BlankPage from './src/auth/BlankPage';
import theme from './theme';
import { getToken } from './src/utils/auth';
import DefaultActionButton from './src/components/ActionButton';

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
        <CurvedNavBar setLoggedIn={setLoggedIn} />
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

const screenOptions = (routeName, selectedTab) => {
  let iconName;

  switch (routeName) {
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

  return (
    <Ionicons
      name={iconName}
      color={routeName === selectedTab ? '#15b7cd' : theme.colors.textLight}
      size={26}
    />
  );
};

const CurvedNavBar = ({ setLoggedIn }) => {
  const renderTabBar = ({ routeName, selectedTab, navigate }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 10,
        }}
      >
        {screenOptions(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <CurvedBottomBar.Navigator
        style={styles.bottomBar}
        height={70}
        circleWidth={60}
        bgColor={theme.colors.primary}
        initialRouteName="Home"
        renderCircle={({ selectedTab, navigate }) => (
          <Animated.View style={styles.btnCircle}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <DefaultActionButton />
            </View>
          </Animated.View>
        )}
        tabBar={renderTabBar}
      >
        <CurvedBottomBar.Screen name="Home" component={HomePage} position="left" />
        <CurvedBottomBar.Screen name="Table" component={TablePage} position="left" />
        <CurvedBottomBar.Screen name="Budget" component={BudgetPage} position="right" />
        <CurvedBottomBar.Screen name="Analytics" component={AnalyticsPage} position="right" />
        {/* dont show settings on tab bar */}
        <CurvedBottomBar.Screen
          name="Settings"
          component={() => <SettingsPage setLoggedIn={setLoggedIn} />}
        />
      </CurvedBottomBar.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  btnCircle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    bottom: 25,
  },

  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },

  img: {
    width: 30,
    height: 30,
  },
});

export default App;
