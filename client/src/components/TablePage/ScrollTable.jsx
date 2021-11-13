import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import TableComponent from './TableComponent';

const ScrollTable = props => (
    <ScrollTableHelper renderList = {props.renderList} type = {props.type}/>
);

export default ScrollTable;

ScrollTableHelper = (props) =>{
    const type = props.type
    const componentList = props.renderList.map((monthExp, index) => 
        <TableComponent key = {index} title = {monthExp.month} subTitle = {monthExp.year} mult = {monthExp.list} type = {type}></TableComponent>
    )
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {componentList}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: '#244fad',
      marginHorizontal: 20,
      borderRadius: 10
    },
    text: {
      fontSize: 42,
      margin: 8
    },
  });