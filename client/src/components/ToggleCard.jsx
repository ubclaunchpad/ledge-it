import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Animated } from 'react-native';
import Paginator from './Paginator';

const ToggleCard = () => {
  const [_, setCurrentIndex] = useState(0);
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
    marginTop: -10
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
    borderWidth: 5,
    borderRadius: 20,
    backgroundColor: '#24838F',
    borderColor: '#1b626b',
  },

  text: {
    fontWeight: 'bold',
    color: '#f3f3f3',
    fontSize: 20,
  },
});

const data = [
  {
    id: '1',
    title: 'Visualization',
    description: 'This is the graph',
  },
  {
    id: '2',
    title: 'Calendar',
    description: 'This is the calendar',
  },
];

export default ToggleCard;
