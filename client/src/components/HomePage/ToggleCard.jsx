import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Animated } from 'react-native';
import Paginator from './Paginator';
import theme from '../../../theme';

const data = [
  {
    id: '1',
    title: 'Visualization',
    description: 'This is a graph',
  },
  {
    id: '2',
    title: 'Calendar',
    description: 'This is a calendar',
  },
];

const ToggleCard = () => {
  const [, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => renderItemCard(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: false,
        })}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <Paginator data={data} scrollX={scrollX} />
    </View>
  );
};

const renderItemCard = (item) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>{item.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 320,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    marginTop: -10,
  },

  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },

  content: {
    display: 'flex',
    height: 230,
    width: Dimensions.get('window').width - 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 20,
    backgroundColor: theme.colors.textLight,
    borderColor: theme.colors.primaryDark,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.7,
    shadowRadius: 2,
    elevation: 5,
  },

  text: {
    fontWeight: 'bold',
    color: theme.colors.textDark,
    fontSize: 20,
  },
});

export default ToggleCard;
