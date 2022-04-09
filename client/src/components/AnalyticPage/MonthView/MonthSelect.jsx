import React, { useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import theme from '../../../../theme';
import Modal from '../../CustomModal';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const getMonths = (() => {
  const d = new Date();
  return [0, 1, 2, 3, 4, 5, 6].map((i) => {
    return new Date(d.getFullYear(), d.getMonth() - i, 1);
  });
})();

const MonthSelect = ({ month, goToMonth }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ backgroundColor: theme.colors.primary }}>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
        style={styles.container}>
        <View>
          <Text style={styles.text}>{months[month]}</Text>
        </View>
        <View style={styles.iconContainer}>
          <AntDesign name="down" size={20} color={theme.colors.white} />
        </View>
      </TouchableOpacity>
      <Modal isModalVisible={modalVisible} setModalVisible={setModalVisible}>
        {getMonths.map((v, i) => {
          return (
            <View key={i}>
              {(i === 0 || (i > 0 && getMonths[i - 1].getFullYear() !== v.getFullYear())) && (
                <Text style={{ fontSize: 20, fontWeight: '200', margin: 10, textAlign: 'center' }}>
                  {v.getFullYear()}
                </Text>
              )}
              <Button
                color={theme.colors.primary}
                onPress={() => {
                  goToMonth(v);
                  setModalVisible(false);
                }}
                title={months[v.getMonth()]}
              />
            </View>
          );
        })}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 10,
  },

  text: {
    color: theme.colors.white,
    fontSize: 40,
    fontWeight: '600',
  },

  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
  },
});

export default MonthSelect;
