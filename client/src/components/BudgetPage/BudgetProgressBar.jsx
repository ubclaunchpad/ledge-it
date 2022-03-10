import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import theme from '../../../theme';
import { formatNumber } from '../../utils/formatters';

const BudgetProgressBar = ({calculateBudget, ratio}) => {
    
    const pbarWidth = `${Math.min(ratio, 0.8 * Dimensions.get('window').width)}%`;

    return (
        <View style={styles.pbar} key="pbar">
            <View
                style={[
                StyleSheet.absoluteFill,
                { backgroundColor: theme.colors.green, borderRadius: 20, width: pbarWidth },
            ]}>
                <Text style={styles.pbarTextExpense}>{ratio}</Text>
            </View>
            <Text style={[styles.pbarTextBudget]}>${formatNumber(calculateBudget || 0, 0)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({ 
    pbar: {
        height: 30,
        width: '80%',
        marginTop: 20,
        marginHorizontal: 10,
        borderRadius: 20,
        borderColor: theme.colors.green,
        backgroundColor: theme.colors.white,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignSelf: 'center',
    },
    
    pbarTextExpense: {
        fontSize: 18,
        fontWeight: '600',
        position: 'absolute',
        top: 4,
        left: 10,
        width: 200,
    },
    
    pbarTextBudget: {
    fontSize: 18,
    fontWeight: '600',
    position: 'absolute',
    right: 10,
    top: 4,
    },
})

export default BudgetProgressBar;