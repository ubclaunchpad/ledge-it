import React, {useState, useEffect} from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import BudgetDetailsTable from './BudgetDetailsTable'
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../../theme.js';
import { MONTHS } from '../../utils/constants';

const BudgetDetails = ({expenseDatabase, currentMonth, currentYear, isVisible, setVisible}) => {
    
    const [splitList, setSplitList] = useState([]);

    useEffect( () => {
        const tempList = [];
        expenseDatabase.forEach((expense) => {
            const month = MONTHS[expense.date.getMonth()];
            const year = expense.date.getFullYear();
            if (month === currentMonth && year === currentYear){
                tempList.push(expense);
            }
        })
        setSplitList(tempList) 
    }, [expenseDatabase]) ;

    return (
    <>
        <Pressable style={styles.closeButton} onPress={() => setVisible(!isVisible)}>
          <Ionicons name="arrow-back-outline" color={theme.colors.primaryDark} size={35} /> 
        </Pressable>
        <View style = {{alignItems: 'center', marginBottom: 10}}>
            <Text style = {styles.title}> {currentMonth} Breakdown </Text>
        </View>
        {splitList.length > 0 
        ? <BudgetDetailsTable renderList = {splitList} currentMonth = {currentMonth} currentYear = {currentYear}></BudgetDetailsTable>
        : <View><Text style = {styles.title} >No expenses in this month</Text></View>
        }
    </>
  );
};

export default BudgetDetails;

const styles = StyleSheet.create({
    modal: {
      flex: 1,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
    title: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 20,
        color: theme.colors.primary,
      },
    container: {
      backgroundColor: theme.colors.white,
      width: '100%',
      alignItems: 'center',
      height: '80%',
      justifyContent: 'flex-end',
    },
    closeButton: {
      display: 'flex',
      margin: '2%',
      alignSelf: 'flex-start',
    },
    content: {
      margin: 10,
      marginBottom: '10%',
    },
  });
