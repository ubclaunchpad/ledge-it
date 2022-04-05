import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, Animated } from 'react-native';
import StaticAreaGraph from './StaticAreaGraph';
import Paginator from './Paginator';
import theme from '../../../theme';
import StyledButton from '../StyledButton';

const data = [
  {
    id: '1',
    title: 'Visualization',
    description: 'This is a graph',
  },
  {
    id: '2',
    title: 'Calendar',
    description: 'Here lies the calendar',
  },
];

const ToggleCard = () => {
  const [, setCurrentIndex] = useState(0);
  const [displayDurationButton, setDisplayDurationButton] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItemCard = (item) => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {item.title === 'Visualization' ? (
            <>
              {displayDurationButton ? (
                <StyledButton key="all" label="Last 7 Days" customStyles={buttonSelectedStyle} />
              ) : null}
              <StaticAreaGraph scrollX={scrollX} setButton={setDisplayDurationButton} />
            </>
          ) : null}
          {item.title === 'Calendar' ? <Text style={styles.text}>{item.description}</Text> : null}
        </View>
      </View>
    );
  };

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

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 360,
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
    height: 270,
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

const buttonSelectedStyle = StyleSheet.create({
  background: {
    backgroundColor: theme.colors.primary,
    padding: 6,
    display: 'flex',
    // margin: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    // width: 100,
    alignItems: 'center',
    borderRadius: 20,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
    borderColor: theme.colors.primary,
    borderWidth: 3,
  },
  text: {
    color: theme.colors.textLight,
    fontWeight: 'bold',
  },
  highlightStyle: {},
});

export default ToggleCard;
