import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import TableComponent from './TableComponent';
import { theme } from '../../../theme';

const ScrollTable = ({ type, renderList }) => {
  const [splitList, setSplitList] = useState([]);

  useEffect(() => {
    const tempList = [];
    renderList.forEach((item) => {
      const month = item.date.getMonth() + 1;
      const year = item.date.getFullYear();
      if (tempList.length === 0) {
        tempList.push({ month, year, list: [] });
      }
      const lastObj = tempList[tempList.length - 1];
      if (lastObj.month === month && lastObj.year === year) {
        tempList[tempList.length - 1].list.push(item);
      } else {
        tempList.push({ month, year, list: [item] });
      }
    });
    setSplitList(tempList);
  }, [renderList]);

  return (
    <View style={styles.scrollView}>
      {splitList.length ? (
        splitList.map((monthExp, index) => (
          <TableComponent
            key={index}
            title={monthExp.month}
            subTitle={monthExp.year}
            mult={monthExp.list}
            type={type}
          />
        ))
      ) : (
        <View style={styles.errorTextView}>
          <Text style={styles.errorText}>No {type.toLowerCase()}</Text>
        </View>
      )}
    </View>
  );
};

export default ScrollTable;

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
    minHeight: Dimensions.get('window').height - 300,
  },
  errorTextView: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 80,
  },
  errorText: {
    color: theme.colors.textDark,
    fontSize: 28,
    fontWeight: 'bold',
  },
});
