import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default ({ fields }) => {
  const currentFont = 30;
  let id = 0;

  return (
    <View style={[styles.box]}>
      <View style={styles.textbox}>
        <Text
          adjustsFontSizeToFit
          style={[styles.text, { fontSize: currentFont, marginBottom: 5 }]}>
          {`$${Number.parseFloat(fields[0]).toFixed(2)}`}
        </Text>
        {fields.slice(1, fields.length).map((val) => {
          id++;
          return val ? (
            <Text style={{ fontSize: 15, color: '#24838F' }} key={id}>
              {val}
            </Text>
          ) : null;
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderColor: '#24838F',
    borderRadius: 10,
    borderWidth: 1.5,
    width: '100%',
    flex: -1,
  },
  text: {
    fontSize: 5,
    color: '#24838F',
    fontWeight: 'bold',
  },
  textbox: {
    margin: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0,
  },
});
