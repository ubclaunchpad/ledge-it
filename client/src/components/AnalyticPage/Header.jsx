// YOU CAN ONLY ANIMATE NON-LAYOUT PROPERTIES


import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Anima, Animated, Dimensions} from 'react-native';
import theme from '../../../theme';

const bkrdMargins = 25;
const bkrdWidth = Dimensions.get('window').width - 2*bkrdMargins;
const hlWidth = 0.45 * bkrdWidth;


const Header = ({selected, setSelected}) => {

  const translateAnim = useRef(new Animated.Value(3)).current;

  useEffect(() => {
    Animated.timing(
      translateAnim,
      {
        toValue: selected === 'Line' ? 3 : bkrdWidth - hlWidth - 3,
        useNativeDriver: false,
        duration: 90,
      }
    ).start();
  }, [selected])

  return (
    <View
      style={styles.container}>
      <View
        style={styles.background}>
          <View style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Text
              onPress={() => {setSelected('Line')}}
              style={'Line' === selected ? [styles.text, {color: theme.colors.white}] : [styles.text, {color: theme.colors.primary}]}>
              Line
            </Text>
            <Text
              onPress={() => {setSelected('Calendar')}}
              style={'Calendar' === selected ? [styles.text, {color: theme.colors.white}] : [styles.text, {color: theme.colors.primary}]}>
              Calendar
            </Text>            
          </View>
        <Animated.View
          style={[styles.highlight, {left: translateAnim}]}>
          
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    height: 75,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  
  background: {
    backgroundColor: theme.colors.white,
    height: 35,
    borderRadius: 10,
    marginHorizontal: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }, 

  text: {
    fontWeight: '400',
    fontSize: 18,
    paddingHorizontal: 50,
  },

  highlight: {
    backgroundColor: theme.colors.primary,
    height: 30,
    width: hlWidth,
    position: 'absolute',
    zIndex: -1,
    borderRadius: 10,
    marginHorizontal: 0,
  },
});

export default Header; 