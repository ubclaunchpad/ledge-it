import React from 'react';
import { View, Dimensions } from 'react-native';

const BlankPage = () => {
  return (
    <View
      style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width }}
    />
  );
};

export default BlankPage;
