import React from 'react';
import { StyleSheet, Text, ScrollView, SafeAreaView } from 'react-native';
import ActionButton from '../components/ActionButton';
import CategoryPieChart from '../components/CategoryPieChart';

const HomePage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <Text>Home Page</Text>
          <Text>This is the home page</Text>
          <CategoryPieChart style={styles.categoryChart} />
        </ScrollView>
      </SafeAreaView>
      <ActionButton />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    overflow: 'scroll',
  },
  content: {
    display: 'flex',
  },
  categoryChart: {
    flex: 1,
  },
});

export default HomePage;
