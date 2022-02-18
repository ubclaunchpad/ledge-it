import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../../theme';
import DefaultActionButton from '../components/ActionButton';
import NotificationSetting from '../components/SettingsPage/NotificationSetting';
import CategoriesSetting from '../components/SettingsPage/CategoriesSetting';
import ThemesSetting from '../components/SettingsPage/ThemesSetting';
import PrivacySetting from '../components/SettingsPage/PrivacySetting';
import HelpPage from '../components/SettingsPage/HelpPage';
import CurrencyPicker from '../components/SettingsPage/CurrencyPicker';

const settingOptions = (state, setState, selectedCurrency, setSelectedCurrency) => {
  return [
    {
      name: 'Notification',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isNotificationModalOpen: true }),
      overlayContent: <NotificationSetting state={state} setState={setState} />,
    },
    {
      name: 'Currency',
      activateBy: (
        <View style={styles.selectedCurrency}>
          <Text style={styles.optionText}>{selectedCurrency}</Text>
        </View>
      ),
      activate: () => setState({ isCurrencyPickerOpen: true }),
      overlayContent: (
        <CurrencyPicker
          state={state}
          setState={setState}
          selectedCurrency={selectedCurrency}
          setSelectedCurrency={setSelectedCurrency}
        />
      ),
    },
    {
      name: 'Categories',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isCategoriesModalOpen: true }),
      overlayContent: <CategoriesSetting state={state} setState={setState} />,
    },
    {
      name: 'Themes',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isThemesModalOpen: true }),
      overlayContent: <ThemesSetting state={state} setState={setState} />,
    },
    {
      name: 'Privacy & Security',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isPrivacyModalOpen: true }),
      overlayContent: <PrivacySetting state={state} setState={setState} />,
    },
    {
      name: 'Help',
      activateBy: <FontAwesome name="chevron-right" size={24} color={theme.colors.primary} />,
      activate: () => setState({ isHelpModalOpen: true }),
      overlayContent: <HelpPage state={state} setState={setState} />,
    },
    {
      name: 'Sign Out',
      activateBy: null,
      activate: null,
      overlayContent: null,
    },
  ];
};

const SettingsPage = () => {
  const [state, setState] = useState({
    isModalOpen: false,
    isCategoriesModalOpen: false,
    isCurrencyPickerOpen: false,
    isThemesModalOpen: false,
    isPrivacyModalOpen: false,
    isHelpModalOpen: false,
  });
  const [selectedCurrency, setSelectedCurrency] = useState('CAD');

  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <View>
            <Text style={styles.titleText}>Settings</Text>
          </View>
          {settingOptions(state, setState, selectedCurrency, setSelectedCurrency).map((item) => {
            return (
              <>
                <View key={item.index}>
                  <Pressable onPress={item.activate}>
                    <View style={styles.settingOptions}>
                      <Text style={styles.optionText}>{item.name}</Text>
                      {item.activateBy}
                    </View>
                  </Pressable>
                </View>
                {item.overlayContent}
              </>
            );
          })}
          <Text style={{ textAlign: 'center', color: theme.colors.primary }}>
            Frugal Version 1.0
          </Text>
        </ScrollView>
      </SafeAreaView>
      <DefaultActionButton />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    top: 26,
  },
  content: {
    display: 'flex',
  },
  titleText: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 20,
    color: theme.colors.primary,
  },
  settingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  selectedCurrency: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 17,
    borderRadius: 20,
    marginVertical: -8,
  },
});

export default SettingsPage;
