import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import theme from '../../theme';
import StyledButton from './StyledButton';

export default ({ date, amount, category, name }) => {
  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={date ? styles.available : styles.placeholder}>{date || 'Date'}</Text>
        <StyledButton
          iconName="camera"
          iconColor={theme.colors.white}
          iconSize={32}
          customStyles={styles}
          onTap={() => console.log('camera')}
          underlayColor={theme.colors.primary}
        />
      </View>
      <View>
        <Text adjustsFontSizeToFit style={[styles.text, { fontSize: 54 }]}>
          {`$${Number.parseFloat(amount ?? '0').toFixed(2)}`}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={category ? styles.available : styles.placeholder}>
          {category || 'Category'}
        </Text>
        <Text style={name ? styles.available : styles.placeholder}>{name || 'Name'}</Text>
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
