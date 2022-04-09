import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import axios from '../../providers/axios';
import theme from '../../../theme';
import { formatNumber } from '../../utils/formatters';

const URL = process.env.SERVER_URL;

const { height, width } = Dimensions.get('window');

// use shared value?
const NetWorthCard = ({ scrollValue, navigate }) => {
  const [netWorth, setNetWorth] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpenses] = useState(0);
  const [selected, setSelected] = useState('net');
  const [currNum, setCurrNum] = useState(0);

  const rHeight = useAnimatedStyle(() => {
    const nHeight = interpolate(scrollValue.value, [0, height / 3], [150, 110], Extrapolate.CLAMP);

    return {
      height: nHeight,
    };
  });

  const rScale = useAnimatedStyle(() => {
    const scale = interpolate(scrollValue.value, [0, height / 3], [1, 0.8], Extrapolate.CLAMP);

    const shift = interpolate(scrollValue.value, [0, height / 3], [0, -55], Extrapolate.CLAMP);

    return {
      transform: [
        { scale },
        {
          translateX: shift,
        },
      ],
    };
  });

  const rOpacity = useAnimatedStyle(() => {
    const nOpacity = interpolate(scrollValue.value, [0, height / 3], [0, 1], Extrapolate.CLAMP);

    return {
      opacity: nOpacity,
    };
  });

  const getNetWorthData = () => {
    axios
      .get(`${URL}/net_worth`)
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
    <Animated.View style={[styles.container, rHeight]}>
      <Animated.View style={[styles.container2, rScale]}>
        <View style={[styles.text]}>
          <Text style={[styles.mainText, styles.amount]}>
            ${currNum < 0 && '-'}
            {formatNumber(currNum)}
          </Text>
        </View>
        <View style={[styles.buttons]}>
          <TouchableOpacity
            onPress={() => {
              setSelected('net');
              setCurrNum(netWorth);
            }}
            style={[styles.btn, selected === 'net' ? styles.selBtn : styles.notSelbtn]}>
            <Text style={selected === 'net' ? styles.selBtnText : styles.notSelBtnText}>
              All Time Net
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelected('income');
              setCurrNum(income);
            }}
            style={[styles.btn, selected === 'income' ? styles.selBtn : styles.notSelBtn]}>
            <Text style={selected === 'income' ? styles.selBtnText : styles.notSelBtnText}>
              Total Income
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setSelected('expense');
              setCurrNum(expense);
            }}
            style={[styles.btn, selected === 'expense' ? styles.selBtn : styles.notSelBtn]}>
            <Text style={selected === 'expense' ? styles.selBtnText : styles.notSelBtnText}>
              Total Expense
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View style={[styles.setting, rOpacity]}>
        <FontAwesomeIcon
          icon={faCog}
          size={25}
          color="white"
          style={styles.settingBtn}
          onPress={() => navigate('Settings')}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },

  container2: {
    display: 'flex',
    width,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 42,
  },

  buttons: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
  },

  btn: {
    marginHorizontal: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: theme.colors.textLight,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
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
  },

  setting: {
    position: 'absolute',
    right: 0,
  },

  settingBtn: {
    marginRight: 25,
  },
});

export default NetWorthCard;
