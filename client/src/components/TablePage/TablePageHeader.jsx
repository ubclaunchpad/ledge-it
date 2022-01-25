import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import SortMenu from './SortMenu';
import { theme } from '../../../theme';

const TablePageHeader = ({ categories, searchQuery, setSearchQuery, type, setType }) => {
  const [selectedLookup, setSelectedLookup] = useState({});
  const [allButton, setAllButton] = useState(true);

  const onChangeSearch = (query) => setSearchQuery(query);
  const onToggleSwitch = () => setType(type === 'Expenses' ? 'Income' : 'Expenses');

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
    setAllButton(categories.every((item) => selectedLookup[item]));
  };

  const emptyIcon = () => null;

  return (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{ shadowOpacity: 0.1 }}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => onToggleSwitch()}
          activeOpacity={0.8}>
          <Text style={styles.toggleButtonText}>{type}</Text>
          <FontAwesomeIcon icon={faChevronRight} color={theme.colors.white} size={24} />
        </TouchableOpacity>
        <SortMenu />
      </View>
      <View>
        <ScrollView horizontal={true} style={styles.chipContainer}>
          <Chip
            style={[
              styles.chip,
              { backgroundColor: allButton ? theme.colors.primary : theme.colors.primaryLight },
            ]}
            icon={emptyIcon}
            selected={allButton}
            onPress={allButtonPressLogic}>
            <Text style={styles.text}>All</Text>
          </Chip>
          {categories.map((category) => (
            <Chip
              style={[
                styles.chip,
                {
                  backgroundColor: selectedLookup[category]
                    ? theme.colors.primary
                    : theme.colors.primaryLight,
                },
              ]}
              icon={emptyIcon}
              key={category}
              selected={selectedLookup[category]}
              onPress={() => categoryButtonPressLogic(category)}>
              <Text style={styles.text}>{category}</Text>
            </Chip>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 4,
    borderBottomColor: theme.colors.primaryDark,
  },
  toggleButton: {
    backgroundColor: theme.colors.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 0 },
  },
  toggleButtonText: {
    paddingVertical: 10,
    marginRight: 10,
    color: theme.colors.white,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
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
    paddingRight: 5,
  },
  chipContainer: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  text: {
    fontWeight: 'bold',
    color: theme.colors.white,
  },
});

export default TablePageHeader;
