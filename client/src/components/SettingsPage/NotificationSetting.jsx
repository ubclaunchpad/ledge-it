import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { Switch } from 'react-native-paper';
import { theme } from '../../../theme';
import StyledButton from '../StyledButton';

const NotificationSetting = ({ state, setState }) => {
  const [isPushSwitchOn, setIsPushSwitchOn] = useState(false);
  const [isEmailSwitchOn, setIsEmailSwitchOn] = useState(false);

  return (
    <>
      <Modal
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
        <View style={styles.container}>
          <View style={styles.header}>
            <StyledButton
              customStyles={styles}
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
              style={{ flex: 1 }}
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
              style={{ flex: 1 }}
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
              style={{ flex: 2 }}
              value={isEmailSwitchOn}
              onValueChange={() => setIsEmailSwitchOn(!isEmailSwitchOn)}
            />
          </View>
        </View>
      </Modal>
    </>
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
  pressable: {
    position: 'absolute',
    left: 0,
    top: -10,
  },
  titleText: {
    fontSize: 36,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 24,
    color: theme.colors.primary,
  },
  settingOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: theme.colors.primary,
  },
  settingDetail: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
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
