import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const NetWorthCard = () => {
  const [isExpanded, setExpand] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.text}>
          <Text style={[styles.mainText, styles.net]}>NET</Text>
          <Text style={[styles.mainText, styles.amount]}>$1234.00</Text>
        </View>

        <TouchableOpacity
          style={styles.chevron}
          onPress={() => {
            setExpand(!isExpanded);
          }}>
          {isExpanded ? (
            <FontAwesomeIcon icon={faChevronUp} color="#24838f" size={32} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color="#24838f" size={32} />
          )}
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.subContent}>
          <View style={[styles.content, styles.sub]}>
            <Text style={[styles.mainText, styles.subText, styles.label]}>All Time Income</Text>
            <Text style={[styles.mainText, styles.subText, styles.income]}>$382.04</Text>
          </View>

          <View style={[styles.content, styles.contentContainer, styles.sub]}>
            <Text style={[styles.mainText, styles.subText, styles.label]}>All Time Expenses</Text>
            <Text style={[styles.mainText, styles.subText, styles.expense]}>$573.99</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    zIndex: 2,
  },

  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: Dimensions.get('window').width - 30,
    marginTop: 20,
    marginBottom: 2,
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: '#1b626b',
  },

  subContent: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: '#1b626b',
    borderTopWidth: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    marginTop: -20,
    paddingVertical: 25,
    paddingBottom: 5,
    width: Dimensions.get('window').width - 30,
  },

  sub: {
    borderWidth: 0,
    paddingLeft: 10,
    paddingRight: 15,
    marginTop: 0,
  },

  text: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 5,
  },

  mainText: {
    color: '#24838f',
    fontWeight: 'bold',
  },

  subText: {
    fontSize: 27,
    fontWeight: '600',
  },

  label: {
    fontSize: 20,
  },

  net: {
    fontSize: 18,
  },
  amount: {
    fontSize: 38,
    marginTop: -7,
  },

  income: {
    color: '#17c308',
  },

  expense: {
    color: '#fd1e1e',
  },

  chevron: {
    paddingRight: 15,
  },
});

export default NetWorthCard;
