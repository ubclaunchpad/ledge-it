import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import CustomModal from '../CustomModal';
import { theme } from '../../../theme';

const CurrencyPicker = ({ state, setState, setSelectedCurrency }) => {
  const [currentCurrency, setCurrentCurrency] = useState('CAD');

  return (
    <>
      <CustomModal isModalVisible={state.isCurrencyPickerOpen} setModalVisible={setState}>
        <View style={styles.container}>
          <View style={styles.picker}>
            <ScrollPicker
              dataSource={['CAD', 'USD', 'EUR', 'AUD', 'GDP']}
              selectedIndex={0}
              renderItem={(data, index) => {
                return (
                  <View>
                    <Text>{data}</Text>
                  </View>
                );
              }}
              onValueChange={(data, selectedIndex) => {
                setCurrentCurrency(data);
              }}
              wrapperHeight={180}
              wrapperWidth={300}
              wrapperColor="#FFFFFF"
              itemHeight={40}
              highlightColor="#d8d8d8"
              highlightBorderWidth={2}
            />
          </View>
        </View>
        <Pressable
          style={styles.selectButton}
          onPress={() => {
            setSelectedCurrency(currentCurrency);
            setState({ isCurrencyPickerOpen: false });
          }}>
          <Text style={styles.buttonText}>Select</Text>
        </Pressable>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  picker: {
    marginTop: -20,
  },
  selectButton: {
    width: '110%',
    paddingVertical: 14,
    marginBottom: -14,
    backgroundColor: theme.colors.primary,
    flex: 1,
    left: '-5%',
    bottom: '-10%',
  },
  buttonText: {
    fontSize: 17,
    textAlign: 'center',
    marginVertical: 4,
    color: theme.colors.white,
  },
});

export default CurrencyPicker;
