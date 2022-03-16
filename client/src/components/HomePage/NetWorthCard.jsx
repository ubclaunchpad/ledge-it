import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../providers/axios';
import theme from '../../../theme';
import { formatNumber } from '../../utils/formatters';

// TODO: remove this once user support is added
const NET_WORTH_ID = '61ab71e8efaeac62430a1822';

const URL = process.env.SERVER_URL;

const NetWorthCard = ({ scrollPosition }) => {
  const [netWorth, setNetWorth] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpenses] = useState(0);
  const [selected, setSelected] = useState('net');
  const [currNum, setCurrNum] = useState(0);

  const getNetWorthData = () => {
    axios
      .get(`${URL}/net_worth/${NET_WORTH_ID}`)
      .then(({ data }) => {
        setIncome(data.all_time_income);
        setExpenses(data.all_time_expenses);
        setNetWorth(data.current);
      })
      .catch((err) => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      getNetWorthData();
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      setCurrNum(netWorth);
    }, [netWorth]),
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.text}>
        <Text style={[styles.mainText, styles.amount]}>
          ${currNum < 0 && '-'}{formatNumber(currNum)}
        </Text>
      </View>
      <View style={styles.buttons}>
        
        <TouchableOpacity 
          onPress={() => {
              setSelected('net')
              setCurrNum(netWorth)
            }
          }
          style={[styles.btn, selected == 'net' ? styles.selBtn : styles.notSelbtn]}
        >
          <Text style={selected == 'net' ? styles.selBtnText : styles.notSelBtnText}>All Time Net</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
              setSelected('income')
              setCurrNum(income)
            }
          }
          style={[styles.btn, selected == 'income' ? styles.selBtn : styles.notSelBtn]}
        >
          <Text style={selected == 'income' ? styles.selBtnText : styles.notSelBtnText}>Total Income</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => {
              setSelected('expense')
              setCurrNum(expense)
            }
          }
          style={[styles.btn, selected == 'expense' ? styles.selBtn : styles.notSelBtn]}
        >
          <Text style={selected == 'expense' ? styles.selBtnText : styles.notSelBtnText}>Total Expense</Text>
        </TouchableOpacity>
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 166,
  },

  text: {
    display: 'flex',
    justifyContent: 'center',
  },

  mainText: {
    color: theme.colors.textLight,
    fontWeight: 'bold',
  },

  amount: {
    fontSize: 48,
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },

  btn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: theme.colors.primaryDark,
    marginHorizontal: 3,
    backgroundColor: theme.colors.textLight,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,  
    elevation: 5
  },

  notSelBtn: {
    backgroundColor: theme.colors.textLight,
  },
  
  selBtn: {
    backgroundColor: theme.colors.primaryDark,
  },

  notSelBtnText: {
    color: theme.colors.primaryDark,
  },

  selBtnText: {
    color: theme.colors.textLight,
  }
});

export default NetWorthCard;
