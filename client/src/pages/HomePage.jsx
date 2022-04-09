import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import CategoryPieChart from '../components/HomePage/CategoryPieChart';
import ToggleCard from '../components/HomePage/ToggleCard';
import NetWorthCard from '../components/HomePage/NetWorthCard';
import RecentTransactions from '../components/HomePage/RecentTransactions';

const HomePage = ({ navigate }) => {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const { y } = event.contentOffset;
      scrollY.value = y;
    },
  });

  return (
    <>
      <SafeAreaView style={styles.container}>
        <NetWorthCard scrollValue={scrollY} navigate={navigate} />
        <Animated.ScrollView
          onScroll={scrollHandler}
          style={styles.content}
          scrollEventThrottle={32}
        >
          <ToggleCard />
          <CategoryPieChart />
          <RecentTransactions />
          <View style={{ height: 85 }} />
        </Animated.ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
    flexGrow: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#ebebeb',
  },
  content: {
    display: 'flex',
  },
});

export default HomePage;
