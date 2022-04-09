import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../../../theme';

const x = Array.from(new Array(35).keys());

const StaticCalendar = ({ tWidth, tHeight }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 0,
          justifyContent: 'flex-start',
          marginLeft: 4,
        }}>
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((v) => {
          return (
            <View style={{ width: 43, alignContent: 'center' }}>
              <Text style={{ color: theme.colors.primary, textAlign: 'center' }}>{v}</Text>
            </View>
          );
        })}
      </View>
      <View
        style={{
          width: '100%',
          height: '90%',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignContent: 'flex-start',
          padding: 5,
        }}>
        {x.map((i) => {
          return (
            <View
              key={i}
              style={{
                width: 43,
                height: 45,
                borderColor: theme.colors.primary,
                borderWidth: 0.25,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              {i % 5 === 0 && (
                <>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: theme.colors.lightgrey,
                      borderRadius: 5,
                      marginLeft: 5,
                      marginTop: 5,
                    }}
                  />
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: 'green',
                      borderRadius: 5,
                      marginLeft: 5,
                      marginTop: 5,
                    }}
                  />
                </>
              )}
              {i % 3 === 0 && i % 5 !== 0 && (
                <>
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: theme.colors.primary,
                      borderRadius: 5,
                      marginLeft: 5,
                      marginTop: 5,
                    }}
                  />
                </>
              )}
              {i % 9 == 0 && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: 'orange',
                    borderRadius: 5,
                    marginLeft: 5,
                    marginTop: 5,
                  }}
                />
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default StaticCalendar;
