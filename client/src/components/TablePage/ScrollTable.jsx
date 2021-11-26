import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import TableComponent from './TableComponent';

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
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {splitList.map((monthExp, index) => (
          <TableComponent
            key={index}
            title={monthExp.month}
            subTitle={monthExp.year}
            mult={monthExp.list}
            type={type}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScrollTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: '#244fad',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingVertical: 10,
  },
});
