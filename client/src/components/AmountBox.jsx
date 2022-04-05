import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import StyledButton from './StyledButton';
import openCamera from '../utils/pickImage';

export default ({
  date,
  amount,
  category,
  name,
  type,
  currb64img,
  setb64,
  setImgModal,
  rounded = false,
}) => {
  const getImage = async () => {
    if (currb64img == '') {
      const b64img = await openCamera();
      if (b64img == '') return;
      setb64(b64img);
    }

    setImgModal(true);
  };

  return (
    <View
      style={[styles.box, rounded && { borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }]}>
      <View style={styles.header}>
        <Text style={date ? styles.available : styles.placeholder}>{date || 'Date'}</Text>
        <StyledButton
          iconName="camera"
          iconColor={theme.colors.white}
          iconSize={32}
          customStyles={styles}
          onTap={getImage}
          underlayColor={theme.colors.primary}
        />
      </View>
      <View>
        <Text adjustsFontSizeToFit style={[styles.text, { fontSize: 54 }]}>
          {`$${Number.parseFloat(amount ?? '0').toFixed(2)}`}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={[category ? styles.available : styles.placeholder, { width: '50%' }]}>
          {category || 'Category'}
        </Text>
        <Text
          style={[
            name ? styles.available : styles.placeholder,
            { width: '50%', textAlign: 'right' },
          ]}>
          {name || (type === 'Expense' ? 'Name' : 'Source')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: theme.colors.primary,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    flex: -1,
  },
  text: {
    fontSize: 5,
    color: theme.colors.textLight,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 15,
    marginBottom: 10,
  },

  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    marginBottom: 10,
  },
  available: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.textLight,
  },
  placeholder: {
    fontSize: 20,
    fontWeight: '500',
    color: theme.colors.lightgrey,
  },
  pressable: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -20,
  },
});
