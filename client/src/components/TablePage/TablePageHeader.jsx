import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Searchbar, Chip, Switch } from 'react-native-paper';
import SortMenu from './SortMenu';

const TablePageHeader = ({ categories, isExpense, setIsExpense }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLookup, setSelectedLookup] = useState({});
  const [allButton, setAllButton] = useState(true);

  const onChangeSearch = (query) => setSearchQuery(query);
  const onToggleSwitch = () => setIsExpense(!isExpense);

  useEffect(() => {
    setAllButton(true);
    setSelectedLookup((sl) => {
      const copyOfSelectedLookup = sl;
      categories.forEach((category) => {
        copyOfSelectedLookup[category] = true;
      });
      return { ...copyOfSelectedLookup };
    });
  }, [categories]);

  const allButtonPressLogic = () => {
    if (allButton) {
      setSelectedLookup(() => {
        categories.forEach((category) => {
          selectedLookup[category] = false;
        });
        return { ...selectedLookup };
      });
      setAllButton(false);
    } else {
      setSelectedLookup(() => {
        categories.forEach((category) => {
          selectedLookup[category] = true;
        });
        return { ...selectedLookup };
      });
      setAllButton(true);
    }
  };

  const categoryButtonPressLogic = (category) => {
    setSelectedLookup((s) => {
      const copyOfS = s;
      copyOfS[category] = !copyOfS[category];
      return { ...copyOfS };
    });
    setAllButton(categories.every((category) => selectedLookup[category]));
  };

  const emptyIcon = () => null;

  return (
    <>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
      <View style={styles.container}>
        <Text>{isExpense ? 'Expense' : 'Income'}</Text>
        <Switch value={isExpense} onValueChange={onToggleSwitch} color="blue" style={styles.m10} />
        <SortMenu />
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.chipContainer}>
          <Chip
            style={styles.chip}
            icon={emptyIcon}
            selected={allButton}
            onPress={allButtonPressLogic}>
            All
          </Chip>
          {categories.map((category) => (
            <Chip
              style={styles.chip}
              icon={emptyIcon}
              key={category}
              selected={selectedLookup[category]}
              onPress={() => categoryButtonPressLogic(category)}>
              {category}
            </Chip>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  m10: {
    margin: 10,
  },
  container: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chip: {
    marginHorizontal: 5,
  },
  chipContainer: {
    paddingTop: 5,
    paddingBottom: 8,
  },
});

export default TablePageHeader;
