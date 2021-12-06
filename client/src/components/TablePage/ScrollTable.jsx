import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import TableComponent from './TableComponent';
import { getMonth, getYear } from '../../utils/formatters';

const ScrollTable = ({ type, renderList }) => {
  const [splitList, setSplitList] = useState([]);

  useEffect(() => {
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
      {splitList.map((monthExp, index) => (
        <TableComponent
          key={index}
          title={monthExp.month}
          subTitle={monthExp.year}
          list={monthExp.list}
          type={type}
        />
      ))}
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
});
