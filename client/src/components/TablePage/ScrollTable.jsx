import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import TableComponent from './TableComponent';
import theme from '../../../theme';
import { getMonth, getYear } from '../../utils/formatters';

const ScrollTable = ({ type, renderList }) => {
  const [splitList, setSplitList] = useState([]);

  /**
   * Build split list, i.e., the expense data grouped by year and month.
   */
  useEffect(() => {
    // TODO: should we disable this behavior when sortMethod is price- (or value-) based?
    const tempList = [];
    renderList.forEach((item) => {
      const month = getMonth(item.date);
      const year = getYear(item.date);
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
      {splitList?.length ? (
        splitList.map((monthExp, index) => (
          <TableComponent
            key={index}
            title={monthExp.month}
            subTitle={monthExp.year}
            list={monthExp.list}
            type={type}
          />
        ))
      ) : (
        <View style={styles.errorTextView}>
          <Text style={styles.errorText}>No {type.toLowerCase()}</Text>
        </View>
      )}
      <View style={{ height: 100 }} />
    </View>
  );
};

export default ScrollTable;

const styles = StyleSheet.create({
  scrollView: {
    paddingVertical: 10,
    minHeight: Dimensions.get('window').height - 200,
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
