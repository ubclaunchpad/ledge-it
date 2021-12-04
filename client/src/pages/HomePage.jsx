import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import DefaultActionButton from '../components/ActionButton';
import CategoryPieChart from '../components/CategoryPieChart';

const HomePage = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
          <CategoryPieChart /> 
          <CategoryPieChart /> 
        </ScrollView>
      </SafeAreaView>
      <DefaultActionButton/>
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
});

export default HomePage;
