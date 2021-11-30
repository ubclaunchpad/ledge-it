import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../../theme';
import { formatNumber } from '../../utils/formatters';

const netWorth = 150000.1212;
const income = 2000.5;
const expenses = 500.5;

const NetWorthCard = () => {
  const [isExpanded, setExpand] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.chevron}
          onPress={() => {
            setExpand(!isExpanded);
          }}>
          <View style={styles.text}>
            <Text style={[styles.mainText, styles.net]}>NET</Text>
            <Text style={[styles.mainText, styles.amount]}>
              {netWorth < 0 && '-'}${formatNumber(netWorth)}
            </Text>
          </View>
          {isExpanded ? (
            <FontAwesomeIcon icon={faChevronUp} color={theme.colors.primary} size={32} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} color={theme.colors.primary} size={32} />
          )}
        </TouchableOpacity>
      </View>

      {isExpanded && (
        <View style={styles.subContent}>
          <View style={[styles.content, styles.sub]}>
            <Text style={[styles.mainText, styles.subText, styles.label]}>All Time Income</Text>
            <Text style={[styles.mainText, styles.subText, styles.income]}>
              ${formatNumber(income)}
            </Text>
          </View>

          <View style={[styles.content, styles.contentContainer, styles.sub]}>
            <Text style={[styles.mainText, styles.subText, styles.label]}>All Time Expenses</Text>
            <Text style={[styles.mainText, styles.subText, styles.expense]}>
              ${formatNumber(expenses)}
            </Text>
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
    width: Dimensions.get('window').width - 30,
    marginTop: 20,
    marginBottom: 2,
    paddingHorizontal: 3,
    paddingVertical: 5,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: theme.colors.primaryDark,
  },

  subContent: {
    borderWidth: 3,
    borderRadius: 20,
    borderColor: theme.colors.primaryDark,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  text: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 5,
  },

  mainText: {
    color: theme.colors.primary,
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
    color: theme.colors.green,
  },

  expense: {
    color: theme.colors.red,
  },

  chevron: {
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default NetWorthCard;