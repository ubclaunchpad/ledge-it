import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Searchbar, Chip, Switch } from 'react-native-paper';

const TablePageHeader = ({ categories, isExpense, setIsExpense }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLookup, setSelectedLookup] = useState({});
  const [allButton, setAllButton] = useState(true);

  const onChangeSearch = (query) => setSearchQuery(query);
  const onToggleSwitch = () => setIsExpense(!isExpense);

  useEffect(() => {
    setAllButton(true);
    setSelectedLookup((s) => {
      const copyOfS = s;
      categories.forEach((category) => {
        copyOfS[category] = true;
      });
      return { ...copyOfS };
    });
  }, [categories]);

  const allButtonPressLogic = () => {
    if (allButton) {
      categories.forEach((category) => {
        selectedLookup[category] = false;
        setSelectedLookup({ ...selectedLookup });
      });
      setAllButton(false);
    } else {
      categories.forEach((category) => {
        selectedLookup[category] = true;
        setSelectedLookup({ ...selectedLookup });
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

  return (
    <>
      <Searchbar placeholder="Search" onChangeText={onChangeSearch} value={searchQuery} />
      <Switch
        value={isExpense}
        onValueChange={onToggleSwitch}
        color="blue"
        style={styles.switchStyles}
      />
      <View>
        <ScrollView horizontal={true}>
          <Chip icon="information" selected={allButton} onPress={allButtonPressLogic}>
            All
          </Chip>
          {categories.map((category) => (
            <Chip
              icon="information"
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
  switchStyles: {
    margin: 10,
  },
});

export default TablePageHeader;
