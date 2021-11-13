import * as React from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

var months = [ "January", "February", "March", "April", "May", "June", 
          "July", "August", "September", "October", "November", "December" ];     

const TableComponent = props => (
    <TableComponentHelper title = {props.title} subTitle = {props.subTitle} mult = {props.mult} type = {props.type}/>
);

const RightSwipe = () => {
    return(<View style = {styles.swipeBackground}>
        <Text style = {styles.swipeText}>Delete</Text>
    </View>)
}

TableComponentHelper = (props) => {
    const mult = props.mult;
    const inputType = props.type;
    var negative = ''
    {inputType == "Expenses"
          ? negative = "-"
          : negative = ""}
    const tableItems = mult.map((obj, index) => 
    <Swipeable key = {index}
    renderRightActions = {RightSwipe}>
        <List.Item
            title = {<Text style = {styles.subheader}>{obj.name}</Text>} 
            description = {<View>
                    <Text style = {styles.text}>{obj.category}</Text>
                    <Text style = {styles.text}>{months[obj.date.getMonth()]} {obj.date.getDate()}, {obj.date.getFullYear()}</Text>
                    </View>}
            right = {() => <View>
                    <Text></Text>
                    <Text style = {styles.price}>{negative}${obj.price} {obj.currency}</Text>
                    </View>}
            style = {{backgroundColor: "#4993ec", marginHorizontal: 15, marginVertical: 5, borderRadius: 10}}/>
    </Swipeable>
    )

    return (
        <List.Section>
            <List.Subheader style = {styles.header}>{months[props.title-1]} {props.subTitle}</List.Subheader>
            {tableItems}
        </List.Section>
    );
}

export default TableComponent;

const styles = StyleSheet.create({
    header: {
        fontSize: 30,
        color: "#fff"
    },
    subheader: {
        fontSize: 20,
        color: "#fff"
    },
    text: {
      fontSize: 14,
      color: "#fff"
    }, 
    price: {
        fontSize: 25,
        color: "#fff",
        justifyContent: "space-evenly"
      },
    swipeBackground: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 10,
        marginVertical: 5,
        marginRight: 15
    },
    swipeText:{
        color: '#fff',
        fontWeight: '600',
        padding: 20
    }
  });