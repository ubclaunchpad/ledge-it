import React, { useRef } from 'react';
import { Animated, StyleSheet, SafeAreaView, View } from 'react-native';
import CategoryPieChart from '../components/HomePage/CategoryPieChart';
import ToggleCard from '../components/HomePage/ToggleCard';
import NetWorthCard from '../components/HomePage/NetWorthCard';
import RecentTransactions from '../components/HomePage/RecentTransactions';

const HomePage = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Animated.ScrollView 
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          style={styles.content}
        >
          <NetWorthCard />
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
    backgroundColor: '#ebebeb'
  },
  content: {
    display: 'flex',
  },
});

export default HomePage;
