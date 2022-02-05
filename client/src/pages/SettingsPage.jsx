import React from 'react';
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import ActionButton from '../components/ActionButton';

const settingOptions = [
  {
    name: 'Notification',
    activateBy: <FontAwesome name="chevron-right" size={24} color="black" />,
    activate: () => {
      this.props.nativation.navigate('Notification');
    },
  },
  {
    name: 'Currency',
    activateBy: null,
    activate: null,
  },
  {
    name: 'Categories',
    activateBy: <FontAwesome name="chevron-right" size={24} color="black" />,
    activate: null,
  },
  {
    name: 'Themes',
    activateBy: <FontAwesome name="chevron-right" size={24} color="black" />,
    activate: null,
  },
  {
    name: 'Privacy & Security',
    activateBy: <FontAwesome name="chevron-right" size={24} color="black" />,
    activate: null,
  },
  {
    name: 'Help',
    activateBy: <FontAwesome name="chevron-right" size={24} color="black" />,
    activate: null,
  },
  {
    name: 'Sign Out',
    activateBy: null,
    activate: null,
  },
];

const SettingsPage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <View>
            <Text style={styles.title}>Settings</Text>
          </View>
          {settingOptions.map((item) => {
            return (
              <TouchableOpacity onPress={item.activate} key={item.name}>
                <View style={styles.settingOptions}>
                  <Text style={styles.optionText}>{item.name}</Text>
                  {item.activateBy}
                </View>
              </TouchableOpacity>
            );
          })}
          <Text style={{ textAlign: 'center' }}>Frugal Version 1.0</Text>
        </ScrollView>
      </SafeAreaView>
      <ActionButton></ActionButton>
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
  title: {
    fontSize: 36,
    textAlign: 'center',
    marginVertical: 20,
  },
  settingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 20,
    paddingVertical: 24,
    paddingHorizontal: 15,
    borderTopWidth: 1,
  },
  optionText: {
    fontSize: 20,
  },
});

export default SettingsPage;
