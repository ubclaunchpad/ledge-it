import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Switch, SafeAreaView } from 'react-native';
import Modal from 'react-native-modal';
import { theme } from '../../../theme';
import StyledButton from '../StyledButton';

const NotificationSetting = ({ state, setState }) => {
  const [isPushSwitchOn, setIsPushSwitchOn] = useState(false);
  const [isEmailSwitchOn, setIsEmailSwitchOn] = useState(false);
  const [isCalendarSwitchOn, setIsCalendarSwitchOn] = useState(false);

  return (
    <Modal
      style={{ width: Dimensions.get('window').width, marginLeft: 0 }}
      isVisible={state.isNotificationModalOpen}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      presentationStyle="overFullScreen"
      backdropTransitionInTiming={0}
      backdropColor={theme.colors.white}
      backdropOpacity={1}
      onRequestClose={() => {
        setState({ isNotificationModalOpen: false });
      }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <StyledButton
            customStyles={{
              pressable: {
                position: 'absolute',
                left: -5,
                top: -25,
              },
              background: {
                padding: 20,
              },
            }}
            onTap={() => {
              setState({ isNotificationModalOpen: false });
            }}
            iconName="chevron-with-circle-left"
            iconSize={36}
            iconColor={theme.colors.primary}
          />
          <Text style={styles.titleText}>Notifications</Text>
        </View>
        <View style={styles.settingOptions}>
          <View style={styles.settingDetail}>
            <Text style={styles.optionTitleText}>Push Notification</Text>
            <Text style={styles.optionDescriptionText}>
              You want to receive budget reminders when you&apos;re close to your budget cap
            </Text>
          </View>
          <Switch
            trackColor={{ true: theme.colors.primary }}
            value={isPushSwitchOn}
            onValueChange={() => setIsPushSwitchOn(!isPushSwitchOn)}
          />
        </View>
        <View style={styles.settingOptions}>
          <View style={styles.settingDetail}>
            <Text style={styles.optionTitleText}>Emails</Text>
            <Text style={styles.optionDescriptionText}>
              You want to receive budget reminder emails when you&apos;re close to your budget cap
            </Text>
          </View>
          <Switch
            trackColor={{ true: theme.colors.primary }}
            value={isEmailSwitchOn}
            onValueChange={() => setIsEmailSwitchOn(!isEmailSwitchOn)}
          />
        </View>
        <View style={styles.settingOptions}>
          <View style={styles.settingDetail}>
            <Text style={styles.optionTitleText}>Calendar</Text>
            <Text style={styles.optionDescriptionText}>
              You want to sync your transactions to your device calendar
            </Text>
          </View>
          <Switch
            trackColor={{ true: theme.colors.primary }}
            value={isCalendarSwitchOn}
            onValueChange={() => setIsCalendarSwitchOn(!isCalendarSwitchOn)}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    margin: 0,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
    color: theme.colors.primary,
  },
  settingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  settingDetail: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  optionTitleText: {
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  optionDescriptionText: {
    fontSize: 10,
    color: theme.colors.grey,
  },
});

export default NotificationSetting;
