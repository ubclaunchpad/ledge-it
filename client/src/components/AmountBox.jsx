import React, { useState } from 'react';
import {
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

export default ({ boxWidth, textMargin, fields }) => {
  const [value, setValue] = useState((0.0).toFixed(2));
  const updateValue = (v) => setValue(String(v.toFixed(2)));
  const [currentFont, setCurrentFont] = useState(30);
  let id = 0;

  return (
    <View style={[styles.box]}>
			<View style={styles.textbox}>
				<Text
				style={styles.text}
				adjustsFontSizeToFit
				style={[styles.text, { fontSize: currentFont }]}>
				{`$${fields[0]}`}
				</Text>
				{fields.slice(1, fields.length).map((val) => {
				id++;
				return (
						<Text style={([styles.text], { fontSize: 15, color: '#24838F' })} key={id}>
						{val}
						</Text>
					);
				})}
			</View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderColor: '#24838F',
    borderRadius: 10,
    borderWidth: 1.5,
    width: '100%',
    flex: -1,
    shadowColor: 'black',
  },
  text: {
    fontSize: 5,
    color: '#24838F',
    shadowOpacity: .3,
		shadowRadius: 1,
  },
  textbox: {
    margin: 10,
    flexDirection: 'column',
    flexWrap: 'nowrap',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0,
  },
});
